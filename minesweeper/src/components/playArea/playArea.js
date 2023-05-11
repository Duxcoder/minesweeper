import EventsArea from './modules/eventsArea';
import RenderPlayArea from './modules/renderPlayArea';

function getRandomNum(from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
}
const isExceptions = (exception, randRow, randColumn) => {
  if (!exception) return false;
  return exception.some((cellException) => {
    const [cellRowException, cellColumnException] = cellException;
    return (cellRowException - 1 === randRow && cellColumnException - 1 === randColumn);
  });
};

export default class PlayArea {
  constructor() {
    this.area = [];
    this.$renderArea = null;
    this.events = new EventsArea();
    this.options = null;
  }

  startPlayArea(optionsForRender) {
    const { row, column } = optionsForRender.data;
    this.options = optionsForRender;
    this.createArea(row, column);
    this.renderAreaClass = new RenderPlayArea(optionsForRender, this.area);
    const $area = this.renderAreaClass.renderPlayArea();
    this.startEvents($area, optionsForRender.data);
  }

  createArea(row, column) {
    const area = [];
    for (let r = 0; r < row; r += 1) {
      area[r] = [];
      for (let c = 0; c < column; c += 1) {
        area[r].push(0);
      }
    }
    this.area = area;
    return area;
  }

  startEvents($area, options) {
    this.events.firstClickOnArea($area, this.renderAreaClass, () => {
      this.createBombs(this.renderAreaClass.cells, options.bombs);
      // this.plusOneAroundBomb(this.renderAreaClass.cells);
    });
  }

  createBombs(areaCells, countBombs, exception = false) {
    const area = areaCells;
    let count = 0;
    let randRow;
    let randColumn;
    while (count < countBombs) {
      randRow = getRandomNum(0, area.length - 1);
      randColumn = getRandomNum(0, area[0].length - 1);
      if (!isExceptions(exception, randRow, randColumn)) {
        const cell = area[randRow][randColumn];
        if (!cell.bomb) {
          count += 1;
          cell.bomb = true;
        }
      }
    }
    this.area = area;
    return area;
  }

  // plusOneAroundBomb(cells, bombsArr) {
  //   const newCells = cells;
  //   newCells.plusOne = function plusOne(row, column) {
  //     const cell = this[row][column];
  //     const isBomb = bombsArr.find((bombCell) => {
  //       const [bombRow, bombColumn] = bombCell;
  //       return (bombRow === row && bombColumn === column);
  //     });
  //     if (isBomb) return;
  //     return this[row][column] += 1;
  //   };
  //   bombsArr.forEach((bombCell) => {
  //     const [bombRow, bombColumn] = bombCell;
  //     newCells.plusOne(bombRow - 1, bombColumn - 1);
  //     newCells.plusOne(bombRow - 1, bombColumn);
  //     newCells.plusOne(bombRow - 1, bombColumn + 1);
  //     newCells.plusOne(bombRow, bombColumn - 1);
  //     newCells.plusOne(bombRow, bombColumn + 1);
  //     newCells.plusOne(bombRow + 1, bombColumn - 1);
  //     newCells.plusOne(bombRow + 1, bombColumn);
  //     newCells.plusOne(bombRow + 1, bombColumn + 1);
  //   });
  //   return newCells;
  // }
}
