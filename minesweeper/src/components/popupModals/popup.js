import PopupGameOver from './gameOver/popupGameOver';

export default class Popup {
  constructor() {
    this.gameOver = false;
    this.$modal = null;
    this.$container = null;
    this.popupGameOver = new PopupGameOver();
  }

  renderPopup($content = '') {
    const $body = document.body;
    const $modal = document.createElement('div');
    $modal.classList.add('modal');
    const $container = document.createElement('div');
    $container.classList.add('container');
    $container.innerHTML = $content;
    $modal.append($container);
    $body.prepend($modal);
    this.$modal = $modal;
    this.$container = $container;
    console.log(this.popupGameOver);
  }

  runGameOver(result) {
    const runGameOver = this.popupGameOver.render(result);
    this.renderPopup(runGameOver);
    this.$modal.classList.add('modal-show');
  }

  hidePopup() {
    this.$modal.classList.remove('modal-show');
  }
}
