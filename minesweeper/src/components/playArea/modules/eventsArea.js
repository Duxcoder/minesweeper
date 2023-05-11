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
  }

  firstClickOnArea($area, renderAreaClass, createBombs) {
    this.$area = $area;
    const handler = (e) => {
      renderAreaClass.$cells.forEach(($cell, i) => {
        if (e.target === $cell) {
          const { cells } = renderAreaClass;
          const indexRow = Math.floor(i / cells.length);
          const indexColumn = Math.floor((i % cells[0].length));
          renderAreaClass.cells[indexRow][indexColumn].updateCell();
          createBombs();
          $area.removeEventListener('click', handler);
        }
      });
    };
    $area.addEventListener('click', handler);
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
