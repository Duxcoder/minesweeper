import PopupGameOver from './gameOver/popupGameOver';

export default class Popup {
  constructor(restart) {
    this.gameOver = false;
    this.$modal = null;
    this.popupGameOver = new PopupGameOver(restart);
  }

  renderPopup($content = '') {
    const $body = document.body;
    const $modal = document.createElement('div');
    $modal.classList.add('modal');
    $modal.append($content);
    $body.prepend($modal);
    this.$modal = $modal;
    console.log(this.popupGameOver);
  }

  runGameOver(result) {
    const { body } = document;
    body.style.overflow = 'hidden';
    const runGameOver = this.popupGameOver.render(result);
    this.renderPopup(runGameOver);
    this.$modal.classList.add('modal-show');
  }

  hidePopup() {
    const { body } = document;
    body.style.overflow = 'auto';
    this.$modal.classList.remove('modal-show');
  }
}
