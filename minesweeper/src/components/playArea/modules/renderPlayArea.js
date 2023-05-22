import Cell from './cell';

export default class RenderPlayArea {
  constructor(row, column, area) {
    this.container = document.body;
    this.area = area;
    this.row = row;
    this.column = column;
    this.$area = null;
    this.cells = null;
    this.$cells = null;
  }

  renderPlayArea() {
    const $container = this.container;
    const $area = document.createElement('section');
    document.documentElement.style.setProperty('--row', this.row);
    document.documentElement.style.setProperty('--column', this.column);
    $area.classList.add('play-area');
    $container.append($area);
    this.renderCells($area);
    this.$area = $area;
    return $area;
  }

  renderCells(container) {
    const $cells = [];
    const cells = this.area.map((rowArea, r) => rowArea.map((cell, c) => { // r - row; c - column
      const options = {
        open: false,
        dark: ((r % 2) && ((c + 1) % 2)) || (((r + 1) % 2) && ((c) % 2)),
        row: r,
        column: c,
        number: cell,
      };
      const cellClass = new Cell(options);
      const $cell = cellClass.createDomCell();
      $cells.push($cell);
      container.append($cell);
      return cellClass;
    }));
    this.$cells = $cells;
    this.cells = cells;
    return $cells;
  }
}
