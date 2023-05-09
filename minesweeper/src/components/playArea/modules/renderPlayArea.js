import bomb from '../../../assets/img/bomb.png';

function renderPlayArea() {
  const { body } = document;
  const $area = document.createElement('div');
  $area.classList.add('area');
  body.append($area);
  const img = new Image();
  img.src = bomb;
  const cellBomb = document.querySelector('.bomb');
  img.classList.add('cell-bomb');
  cellBomb.append(img);
}

export default renderPlayArea;
