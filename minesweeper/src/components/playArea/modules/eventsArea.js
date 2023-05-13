function getRandomNum(from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
}

// function getRandomNum(from, to) {
//   const rand = from + Math.random() * (to + 1 - from);
//   return Math.floor(rand);
// }
// const isExceptions = (exception, randRow, randColumn) => {
//   if (!exception) return false;
//   return exception.some((cellException) => {
//     const [cellRowException, cellColumnException] = cellException;
//     return (cellRowException - 1 === randRow && cellColumnException - 1 === randColumn);
//   });
// };
export default class EventsArea {
  constructor() {
    this.$area = null;
    this.cells = null;
    this.firstClickCellPosition = null;
  }

  firstClickOnArea($area, renderAreaClass, callback) {
    this.$area = $area;
    const handler = (e) => {
      renderAreaClass.$cells.forEach(($cell, i) => {
        if (e.target === $cell) {
          const { cells } = renderAreaClass;
          this.cells = cells;
          const indexRow = Math.floor(i / cells.length);
          const indexColumn = Math.floor((i % cells[0].length));
          const cell = renderAreaClass.cells[indexRow][indexColumn];
          this.firstClickCellPosition = [indexRow, indexColumn];
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
    const { cells } = renderAreaClass;
    const totalArrayCells = cells.reduce((arr, row) => [...arr, ...row], []);
    console.log(totalArrayCells);
    const bombs = totalArrayCells.filter((cell) => cell.bomb);
    const handler = (e) => {
      totalArrayCells.forEach((cell) => {
        const cellElem = cell;
        const { $cell } = cell;
        if (e.target === $cell) {
          cellElem.open = true;
          cellElem.updateCell();
          if (cellElem.bomb) {
            bombs.forEach((bomb) => {
              const second = getRandomNum(1, 10);
              if (cellElem !== bomb) {
                setTimeout(() => {
                  const bombElem = bomb;
                  bombElem.open = true;
                  bombElem.updateCell();
                }, second * 100);
              }
            });
          }
        }
      });
    };
    $area.addEventListener('click', handler);
    this.$area = $area;
  }
  // createBombs(areaCells, countBombs, exception = false) {
  //   const area = areaCells;
  //   let count = 0;
  //   let randRow;
  //   let randColumn;
  //   while (count < countBombs) {
  //     randRow = getRandomNum(0, area.length - 1);
  //     randColumn = getRandomNum(0, area[0].length - 1);
  //     if (!isExceptions(exception, randRow, randColumn)) {
  //       const cell = area[randRow][randColumn];
  //       if (!cell.bomb) {
  //         count += 1;
  //         cell.bomb = true;
  //       }
  //     }
  //   }
  //   this.area = area;
  //   return area;
  // }

  // plusOneAroundBomb(cells, bombsArr) {
  //   const newCells = cells;
  //   newCells.plusOne = function plusOne(row, column) {
  //     const cell = this[row][column];
  //     const isBomb = bombsArr.find(bombCell => {
  //       const [bombRow, bombColumn] = bombCell;
  //       return (bombRow === row && bombColumn === column)
  //     })
  //     if (isBomb) return
  //     return this[row][column] += 1;
  //   }
  //   bombsArr.forEach(bombCell => {
  //     const [bombRow, bombColumn] = bombCell;
  //     newCells.plusOne(bombRow - 1, bombColumn - 1);
  //     newCells.plusOne(bombRow - 1, bombColumn);
  //     newCells.plusOne(bombRow - 1, bombColumn + 1);
  //     newCells.plusOne(bombRow, bombColumn - 1);
  //     newCells.plusOne(bombRow, bombColumn + 1);
  //     newCells.plusOne(bombRow + 1, bombColumn - 1);
  //     newCells.plusOne(bombRow + 1, bombColumn);
  //     newCells.plusOne(bombRow + 1, bombColumn + 1);

  //   })
  //   return newCells;
  // }
}
