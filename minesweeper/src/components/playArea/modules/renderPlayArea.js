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

    const renderCell = (cell, column, row) => {
      const options = {
        open: false,
        dark: (row % 2 && (column + 1) % 2) || ((row + 1) % 2 && column % 2),
        number: cell,
        row,
        column,
      };
      const cellClass = new Cell(options);
      const $cell = cellClass.createDomCell();
      $cells.push($cell);
      container.append($cell);
      return cellClass;
    };

    const renderCellRow = (rowArea, row) => rowArea.map((cell, col) => renderCell(cell, col, row));

    const cells = this.area.map(renderCellRow);
    this.$cells = $cells;
    this.cells = cells;
    return $cells;
  }
}
