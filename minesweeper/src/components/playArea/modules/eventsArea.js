import winAudio from '../../../assets/audio/win.wav';
import loseAudio from '../../../assets/audio/lose.mp3';
import { getRandomNum, playAudio } from '../../../utils/utils';

function cascadeOfExplosions(bombs, clickCell) {
  const remainingBombs = bombs.filter((bomb) => clickCell !== bomb);
  remainingBombs.forEach((bomb) =>
    setTimeout(() => bomb.showBomb(false), getRandomNum(1, 10) * 100),
  );
}

export default class EventsArea {
  constructor(popup, score, options) {
    this.popup = popup;
    this.score = score;
    this.$area = null;
    this.cells = null;
    this.firstClickCellPosition = null;
    this.time = null;
    this.timer = null;
    this.bombs = null;
    this.clicks = 0;
    this.options = options;
  }

  startTimer() {
    this.time = 0;
    const timer = setInterval(() => {
      this.time += 1;
      localStorage.setItem('_time', this.time);
      this.score.updateTime(this.time);
      this.score.updateScorePanel();
    }, 1000);
    return timer;
  }

  stopTimer() {
    clearInterval(this.timer);
  }

  firstClickOnArea($area, renderAreaClass, callback) {
    this.$area = $area;
    this.bombs = this.score.bombs;
    document.addEventListener('stopTimerEvent', () => {
      this.stopTimer();
    });
    ///
    const handler = (e) => {
      renderAreaClass.$cells.forEach(($cell, i) => {
        if (e.target === $cell) {
          const { cells } = renderAreaClass;
          this.cells = cells;
          const indexRow = Math.floor(i / cells.length);
          const indexColumn = Math.floor(i % cells[0].length);
          const cell = renderAreaClass.cells[indexRow][indexColumn];
          this.firstClickCellPosition = [indexRow, indexColumn];
          this.timer = this.startTimer();
          this.clicks += 1;
          this.score.updateClick(this.clicks);
          this.score.updateScorePanel();
          cell.openCell();
          callback([this.firstClickCellPosition]);
          this.openCellsAround(renderAreaClass);

          if (localStorage.getItem('_bombs')) {
            if (+localStorage.getItem('_bombs') === 99) {
              this.stopTimer();
              playAudio(winAudio);
              localStorage.setItem('_clicks', this.clicks);
              const date = new Date();
              const user = [
                +date,
                localStorage.getItem('_username') ? localStorage.getItem('_username') : 'user',
                localStorage.getItem('_level') ? localStorage.getItem('_level') : 'easy',
                this.clicks,
                localStorage.getItem('_bombs') ? localStorage.getItem('_bombs') : '10',
              ];
              let table = [];
              if (localStorage.getItem('_table')) {
                table = JSON.parse(localStorage.getItem('_table'));
              }
              table.push(user);
              localStorage.setItem('_table', JSON.stringify(table));
              this.popup.runGameOver('win');
            }
          }

          $area.removeEventListener('click', handler);
        }
      });
    };
    $area.addEventListener('click', handler);
  }

  openCellsAround(renderAreaClass, cellPositions = this.firstClickCellPosition) {
    const correctivePositionRowColumn = [
      [-1, -1],
      [-1, 0],
      [-1, +1],
      [0, -1],
      [0, +1],
      [+1, -1],
      [+1, 0],
      [+1, +1],
    ];
    const [row, column] = cellPositions;
    if (!renderAreaClass.cells[row][column].number) {
      for (let i = 0; i < correctivePositionRowColumn.length; i += 1) {
        const [correctiveRow, correctiveColumn] = correctivePositionRowColumn[i];
        const correctRow = correctiveRow + row;
        const correctColumn = correctiveColumn + column;
        if (
          renderAreaClass.cells[correctRow] &&
          renderAreaClass.cells[correctRow][correctColumn] &&
          !renderAreaClass.cells[correctRow][correctColumn].open
        ) {
          const aroundCell = renderAreaClass.cells[correctRow][correctColumn];
          if (!aroundCell.bomb && !renderAreaClass.cells[row][column].number) {
            aroundCell.openCell(false);
            this.openCellsAround(renderAreaClass, [correctRow, correctColumn]);
          }
        }
      }
    }
  }

  clickTracking($area, renderAreaClass) {
    const { cells } = renderAreaClass;
    const totalArrayCells = cells.reduce((arr, row) => [...arr, ...row], []);
    const bombs = totalArrayCells.filter((cell) => cell.bomb);
    const handler = (e, cell) => {
      const { target } = e;
      const cellElem = cell;
      const { $cell } = cell;
      if (target === $cell) {
        if (!cellElem.open) {
          this.clicks += 1;
          this.score.updateClick(this.clicks);
          this.score.updateScorePanel();
        }
        cellElem.openCell();
        const isContainsEmptyCells = totalArrayCells.some((item) => !item.open && !item.bomb);
        if (!isContainsEmptyCells) {
          this.stopTimer();
          playAudio(winAudio);
          localStorage.setItem('_clicks', this.clicks);
          const date = new Date();
          const user = [
            +date,
            localStorage.getItem('_username') ? localStorage.getItem('_username') : 'user',
            localStorage.getItem('_level') ? localStorage.getItem('_level') : 'easy',
            this.clicks,
            localStorage.getItem('_bombs') ? localStorage.getItem('_bombs') : '10',
          ];
          let table = [];
          if (localStorage.getItem('_table')) {
            table = JSON.parse(localStorage.getItem('_table'));
          }
          table.push(user);
          localStorage.setItem('_table', JSON.stringify(table));
          this.popup.runGameOver('win');
        }
        if (cellElem.bomb) {
          cellElem.explosionBomb();
          cascadeOfExplosions(bombs, cellElem);
          this.stopTimer();
          playAudio(loseAudio);
          localStorage.setItem('_clicks', this.clicks);
          this.popup.runGameOver('lose');
        }
        if (!cellElem.number && !cellElem.bomb) {
          this.openCellsAround(renderAreaClass, [cellElem.row, cellElem.column]);
        }
      }
    };
    const setFlag = (e, cell) => {
      e.preventDefault();
      const { target } = e;
      const cellElem = cell;
      const { $cell, open } = cell;
      if (target === $cell && !open) {
        cellElem.flag = !cellElem.flag;
        cellElem.updateCell();
        this.bombs += cellElem.flag ? -1 : 1;
        this.score.updateBombs(this.bombs);
        this.score.updateScorePanel();
      }
    };
    totalArrayCells.forEach((cell) => {
      const cellElem = cell;
      const handlerWrapper = (e) => {
        handler(e, cell);
      };
      const setFlagWrapper = (e) => {
        setFlag(e, cell);
      };
      const handlers = {
        click: handlerWrapper,
        contextmenu: setFlagWrapper,
      };
      cellElem.setHandlers(handlers);
      cell.$cell.addEventListener('click', handlerWrapper);
      cell.$cell.addEventListener('contextmenu', setFlagWrapper);
    });
    this.$area = $area;
  }
}
