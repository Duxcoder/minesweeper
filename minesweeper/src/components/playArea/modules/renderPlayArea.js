import bomb from '../../../assets/img/bomb.png';
import Cell from './cell';

export default class RenderPlayArea {
  constructor({ container, areaData }) {
    this.container = container;
    this.row = areaData.row;
    this.column = areaData.column;
  }

  renderPlayArea() {
    const $container = this.container;
    const $area = document.createElement('section');
    document.documentElement.style.setProperty('--row', this.row);
    document.documentElement.style.setProperty('--column', this.column);
    $area.classList.add('play-area');
    $container.append($area);
    this.renderCells($area);
    const img = new Image();
    img.src = bomb;
    const cellBomb = document.querySelector('.bomb');
    img.classList.add('cell-bomb');
    cellBomb.append(img);
  }

  updateRender() {
    console.log(this.container);
  }

  renderCells(container) {
    const $cells = [];
    for (let r = 0; r < this.row; r += 1) {
      for (let c = 0; c < this.column; c += 1) {
        const options = {
          open: false,
          dark: ((r % 2) && ((c + 1) % 2)) || (((r + 1) % 2) && ((c) % 2)),
          row: r + 1,
          column: c + 1,
        };
        const cell = new Cell(options);
        const $cell = cell.createDomCell();
        console.log(options.dark);
        $cells.push($cell);
        container.append($cell);
      }
    }
    this.$cells = $cells;
    return $cells;
  }
}
