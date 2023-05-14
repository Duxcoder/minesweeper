import bombImg from '../../../assets/img/bomb.png';
import boom from '../../../assets/audio/boom.mp3';

const defOptions = {
  flag: null,
  bomb: null,
  explosion: false,
  open: false,
  dark: false,
  number: 0,
  row: null,
  column: null,
};
const colorsNumbers = ['#46616F', '#59A834', '#34B4BC', '#A934BC', '#6D17DA', '#BC3434', '#E48B21', '#000000'];

export default class Cell {
  constructor({
    flag, bomb, explosion, open, dark, number, row, column,
  } = defOptions) {
    this.flag = flag;
    this.bomb = bomb;
    this.explosion = explosion;
    this.open = open;
    this.dark = dark;
    this.number = number;
    this.row = row;
    this.column = column;
    this.$cell = null;
    this.handlers = null;
  }

  updateCell() {
    if (this.open) {
      this.$cell.classList.remove('close');
      this.$cell.classList.add('open');
    }
    if (this.number && this.open) { // && this.open
      this.$cell.style.color = this.findColor();
      this.$cell.textContent = this.number;
    }
    if (this.bomb && this.open && !this.explosion) {
      this.explosion = true;
      this.explosionBomb();
    }
    if (this.flag) {
      this.$cell.classList.add('flag');
      this.$cell.removeEventListener('click', this.handlers.click);
    }
    if (this.$cell.classList.contains('flag') && !this.flag) {
      this.$cell.classList.remove('flag');
      this.$cell.addEventListener('click', this.handlers.click);
    }
  }

  explosionBomb() {
    this.$cell.classList.add('bomb');
    const img = new Image();
    img.src = bombImg;
    img.classList.add('cell-bomb');
    this.$cell.append(img);
    const audio = new Audio(boom, { type: 'audio/mpeg' });
    audio.play();
  }

  createDomCell() {
    const $div = document.createElement('div');
    $div.classList.add('cell');
    $div.classList.add(this.flag ? 'flag' : null);
    $div.classList.add(this.bomb && !this.open ? 'bomb' : null);
    $div.classList.add(!this.open ? 'close' : 'open');
    $div.classList.add(this.dark ? 'dark' : 'light');
    if (this.number && !this.open) {
      $div.style.color = this.findColor();
      $div.textContent = this.number;
    }
    this.$cell = $div;
    return $div;
  }

  findColor() {
    let col = '';
    colorsNumbers.forEach((color, num) => {
      if (num + 1 === this.number) {
        col = color;
      }
    });
    return col;
  }

  setHandlers(handlers) {
    this.handlers = handlers;
  }
}
