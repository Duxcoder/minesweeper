function getRandomNum(from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
}

function cascadeOfExplosions(bombs, clickCell) {
  bombs.forEach((bomb) => {
    const second = getRandomNum(1, 10);
    if (clickCell !== bomb) {
      setTimeout(() => {
        const bombElem = bomb;
        bombElem.open = true;
        bombElem.updateCell();
      }, second * 100);
    }
  });
}
export default class EventsArea {
  constructor(popup, score) {
    this.popup = popup;
    this.score = score;
    this.$area = null;
    this.cells = null;
    this.firstClickCellPosition = null;
    this.time = null;
    this.timer = null;
    this.bombs = null;
  }

  startTimer() {
    this.time = 0;
    const timer = setInterval(() => {
      this.time += 1;
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
    const handler = (e) => {
      renderAreaClass.$cells.forEach(($cell, i) => {
        if (e.target === $cell) {
          const { cells } = renderAreaClass;
          this.cells = cells;
          const indexRow = Math.floor(i / cells.length);
          const indexColumn = Math.floor((i % cells[0].length));
          const cell = renderAreaClass.cells[indexRow][indexColumn];
          this.firstClickCellPosition = [indexRow, indexColumn];
          this.timer = this.startTimer();
          cell.open = true;
          cell.updateCell();
          callback([this.firstClickCellPosition]);
          this.openCellsAround(renderAreaClass);
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
        if (renderAreaClass.cells[correctRow] && renderAreaClass.cells[correctRow][correctColumn]
          && !renderAreaClass.cells[correctRow][correctColumn].open) {
          const aroundCell = renderAreaClass.cells[correctRow][correctColumn];
          if (!aroundCell.bomb && !renderAreaClass.cells[row][column].number) {
            aroundCell.open = true;
            aroundCell.updateCell();
            this.openCellsAround(renderAreaClass, [correctRow, correctColumn]);
          }
        }
      }
    }
  }

  clickTracking($area, renderAreaClass) {
    let clicks = 0;
    const { cells } = renderAreaClass;
    const totalArrayCells = cells.reduce((arr, row) => [...arr, ...row], []);
    const bombs = totalArrayCells.filter((cell) => cell.bomb);
    const handler = (e, cell) => {
      const { target } = e;
      const cellElem = cell;
      const { $cell } = cell;
      if (target === $cell) {
        if (!cellElem.open) {
          clicks += 1;
          this.score.updateClick(clicks);
          this.score.updateScorePanel();
        }
        cellElem.open = true;
        cellElem.updateCell();
        const isContainsEmptyCells = totalArrayCells.some((item) => !item.open && !item.bomb);
        if (!isContainsEmptyCells) {
          this.stopTimer();
          this.popup.runGameOver('win');
        }
        if (cellElem.bomb) {
          cascadeOfExplosions(bombs, cellElem);
          this.stopTimer();
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
      const { $cell } = cell;
      if (target === $cell) {
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
