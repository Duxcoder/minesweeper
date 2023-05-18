import './style.scss';
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
    if (this.$modal) {
      this.$modal.innerHTML = '';
      this.$modal.append($content);
    } else {
      const $body = document.body;
      const $modal = document.createElement('div');
      $modal.classList.add('modal');
      $modal.append($content);
      this.$modal = $modal;
      $body.prepend(this.$modal);
    }
    const $close = document.createElement('span');
    $close.classList.add('close');
    $close.textContent = '✕';
    $close.onclick = this.hidePopup.bind(this);
    this.$modal.firstChild.prepend($close);
    this.$modal.addEventListener('click', (e) => {
      if (!e.target.closest('.container')) this.hidePopup();
    });
  }

  runGameOver(result) {
    const { body } = document;
    body.style.overflow = 'hidden';
    const runGameOver = this.popupGameOver.render(result, this.runOptions.bind(this));
    this.renderPopup(runGameOver);
    this.$modal.classList.add('modal-show');
  }

  runOptions(option = {
    runClose: this.hidePopup.bind(this),
  }) {
    const { body } = document;
    body.style.overflow = 'hidden';
    const popupOptions = this.popupOptions.render(option);
    this.renderPopup(popupOptions);
    this.$modal.classList.add('modal-show', 'option');
  }

  hidePopup() {
    const { body } = document;
    body.style.overflow = 'auto';
    this.$modal.innerHTML = '';
    this.$modal.classList.remove('modal-show', 'option');
  }
}
