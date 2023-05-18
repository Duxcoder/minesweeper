import PopupGameOver from './gameOver/popupGameOver';
import PopupOptions from './options/popupOptions';

export default class Popup {
  constructor(restart) {
    this.gameOver = false;
    this.$modal = null;
    this.popupGameOver = new PopupGameOver(restart);
    this.popupOptions = new PopupOptions();
  }

  renderPopup($content = '') {
    const $body = document.body;
    const $modal = document.createElement('div');
    // test remove option
    $modal.classList.add('modal', 'option');
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
    /// test
    const popupOpt = this.popupOptions.render();
    this.renderPopup(popupOpt);
    /// test
    this.$modal.classList.add('modal-show');
  }

  hidePopup() {
    const { body } = document;
    body.style.overflow = 'auto';
    this.$modal.classList.remove('modal-show');
  }
}
