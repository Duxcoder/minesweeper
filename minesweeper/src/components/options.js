export default class Options {
  constructor() {
    this.username = null;
    this.theme = null;
    this.areaData = null;
  }

  setAreaData(rowCells = 10, columnCells = 10, countBombs = 99) {
    const { body } = document;
    const options = {
      container: body,
      data: {
        bombs: countBombs,
        row: rowCells,
        column: columnCells,
      },
    };
    this.areaData = options;
    return options;
  }

  getAreaData() {
    return this.areaData;
  }
}
