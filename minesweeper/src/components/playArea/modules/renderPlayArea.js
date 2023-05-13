import Cell from './cell';

export default class RenderPlayArea {
  constructor({ container, data }, area) {
    this.container = container;
    this.area = area;
    this.row = data.row;
    this.column = data.column;
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

  updateRender() {
    console.log(this.container);
  }

  renderCells(container) {
    const $cells = [];
    const cells = this.area.map((rowArea, r) => rowArea.map((cell, c) => { // r - row; c - column
      const options = {
        open: false,
        dark: ((r % 2) && ((c + 1) % 2)) || (((r + 1) % 2) && ((c) % 2)),
        row: r + 1,
        column: c + 1,
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
    console.log(cells);
    return $cells;
  }
}
