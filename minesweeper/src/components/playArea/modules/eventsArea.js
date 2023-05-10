// function createArea(row, column) {
//   const area = [];
//   for (let r = 0; r < row; r += 1) {
//     area[r] = [];
//     for (let c = 0; c < column; c += 1) {
//       area[r].push(0);
//     }
//   }
//   return area;
// }

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

// function createBombs(areaArr, amountBombs, exception = false) {
//   const area = areaArr;
//   let count = 0;
//   let randRow;
//   let randColumn;
//   while (count < amountBombs) {
//     randRow = getRandomNum(0, area.length - 1);
//     randColumn = getRandomNum(0, area[0].length - 1);
//     if (!isExceptions(exception, randRow, randColumn)) {
//       let cell = area[randRow][randColumn];
//       if (cell !== 'bomb') {
//         count += 1;
//         cell = 'bomb';
//       }
//       area[randRow][randColumn] = cell;
//     }
//   }
//   return area;
// }

// console.log(createBombs(createArea(10, 10), 10, [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [2, 3], [3, 1], [3, 2], [3, 3]]))
