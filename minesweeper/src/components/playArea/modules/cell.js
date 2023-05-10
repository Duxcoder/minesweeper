const defOptions = {
  flag: null,
  bomb: null,
  open: false,
  dark: false,
  number: null,
  row: null,
  column: null,
  defColor: '#000',
};
const colorsNumbers = ['#46616F', '#59A834', '#34B4BC', '#A934BC', '#6D17DA', '#BC3434', '#E48B21', '#000000'];

export default class Cell {
  constructor({
    flag, bomb, open, dark, number, row, column, defColor,
  } = defOptions) {
    this.flag = flag;
    this.bomb = bomb;
    this.open = open;
    this.dark = dark;
    this.number = number;
    this.row = row;
    this.column = column;
    this.defColor = defColor;
    this.$cell = null;
  }

  createDomCell() {
    const $div = document.createElement('div');
    $div.classList.add('cell');
    $div.classList.add(this.flag ? 'flag' : '1');
    $div.classList.add(this.bomb ? 'bomb' : '2');
    $div.classList.add(!this.open ? 'close' : '3');
    $div.classList.add(this.dark ? 'dark' : 'light');
    $div.style.color = this.number ? this.findColor() : this.defColor;
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

// export default class Cell {
//   constructor({
//     flag = null,
//     bomb = null,
//     open = false,
//     dark = false,
//     number = null,
//   }) {
//     this.flag = flag;
//     this.bomb = bomb;
//     this.open = open;
//     this.dark = dark;
//     this.number = number;
//   }
// }
