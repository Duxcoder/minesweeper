const defOptions = {
  flag: null,
  bomb: null,
  open: false,
  dark: false,
  number: null,
  row: null,
  column: null,
};
const colorsNumbers = ['#46616F', '#59A834', '#34B4BC', '#A934BC', '#6D17DA', '#BC3434', '#E48B21', '#000000'];

export default class Cell {
  constructor({
    flag, bomb, open, dark, number, row, column,
  } = defOptions) {
    this.flag = flag;
    this.bomb = bomb;
    this.open = open;
    this.dark = dark;
    this.number = number;
    this.row = row;
    this.column = column;
    this.$cell = null;
  }

  updateCell() {
    if (this.$cell.classList.contains('close')) {
      this.$cell.classList.remove('close');
      this.$cell.classList.add('open');
    }
  }

  createDomCell() {
    const $div = document.createElement('div');
    $div.classList.add('cell');
    $div.classList.add(this.flag ? 'flag' : null);
    $div.classList.add(this.bomb && this.open ? 'bomb' : null);
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
}
