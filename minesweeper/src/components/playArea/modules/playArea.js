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

  createBombs(areaArr, amountBombs, exception = false) {
    const area = areaArr;
    let count = 0;
    let randRow;
    let randColumn;
    while (count < amountBombs) {
      randRow = getRandomNum(0, area.length - 1);
      randColumn = getRandomNum(0, area[0].length - 1);
      if (!isExceptions(exception, randRow, randColumn)) {
        let cell = area[randRow][randColumn];
        if (cell !== 'bomb') {
          count += 1;
          cell = 'bomb';
        }
        area[randRow][randColumn] = cell;
      }
    }
    this.area = area;
    return area;
  }
}
