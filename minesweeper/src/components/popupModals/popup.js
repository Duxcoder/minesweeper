import popupGameOver from './gameOver/popupGameOver';

export default class Popup {
  constuctor() {
    this.gameOver = false;
    this.$modal = null;
    this.$container = null;
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
  }

  runGameOver() {
    this.renderPopup(popupGameOver());
    this.$modal.classList.add('modal-show');
  }

  hidePopup() {
    this.$modal.classList.remove('modal-show');
  }
}
