export default class Options {
  constructor() {
    this.username = null;
    this.theme = null;
    this.areaData = null;
  }

  setAreaData(rowCells = 20, columnCells = 20, countBombs = 30) {
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
}
