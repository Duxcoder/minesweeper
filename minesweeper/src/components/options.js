export default class Options {
  constructor() {
    this.username = null;
    this.theme = null;
    this.areaData = null;
  }

  setAreaData(rowCells = 5, columnCells = 5, countBombs = 4) {
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
