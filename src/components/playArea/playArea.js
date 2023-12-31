import EventsArea from './modules/eventsArea';
import RenderPlayArea from './modules/renderPlayArea';
import { getRandomNum } from '../../utils/utils';

const isExceptions = (exception, randRow, randColumn) => {
  if (!exception) return false;
  return exception.some((cellException) => {
    const [cellRowException, cellColumnException] = cellException;
    return cellRowException === randRow && cellColumnException === randColumn;
  });
};

export default class PlayArea {
  constructor(popup, score, options) {
    this.popup = popup;
    this.score = score;
    this.area = [];
    this.$renderArea = null;
    this.renderAreaClass = null;
    this.events = new EventsArea(popup, score, options);
  }

  startPlayArea(options) {
    const { row, column } = options.getOptions();
    this.createArea(row, column);
    this.renderAreaClass = new RenderPlayArea(row, column, this.area);
    const $area = this.renderAreaClass.renderPlayArea();
    this.startEvents($area, options);
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
    this.events.firstClickOnArea($area, this.renderAreaClass, (exceptions) => {
      const bombs = this.createBombs(
        this.renderAreaClass.cells,
        options.getOptions().bombs,
        exceptions,
      );
      this.plusOneAroundBomb(this.renderAreaClass.cells, bombs);
      this.events.clickTracking($area, this.renderAreaClass);
    });
  }

  createBombs(areaCells, countBombs, exception = false) {
    const area = areaCells;
    const cellsBombs = [];
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
          cellsBombs.push([randRow, randColumn]);
        }
      }
    }
    this.area = area;
    return cellsBombs;
  }

  plusOneAroundBomb(cells, bombsArr) {
    const newCells = cells;
    newCells.plusOne = function plusOne(row, column) {
      const isBomb = bombsArr.find((bombCell) => {
        const [bombRow, bombColumn] = bombCell;
        return bombRow === row && bombColumn === column;
      });
      if (isBomb) return;
      if (this[row] && this[row][column]) {
        this[row][column].number += 1;
        this[row][column].updateCell();
      }
    };
    bombsArr.forEach((bombCell) => {
      const [bombRow, bombColumn] = bombCell;
      newCells.plusOne(bombRow - 1, bombColumn - 1);
      newCells.plusOne(bombRow - 1, bombColumn);
      newCells.plusOne(bombRow - 1, bombColumn + 1);
      newCells.plusOne(bombRow, bombColumn - 1);
      newCells.plusOne(bombRow, bombColumn + 1);
      newCells.plusOne(bombRow + 1, bombColumn - 1);
      newCells.plusOne(bombRow + 1, bombColumn);
      newCells.plusOne(bombRow + 1, bombColumn + 1);
    });
    this.area = newCells;
    return newCells;
  }
}
