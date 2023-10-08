import './style.scss';
import PopupGameOver from './gameOver/popupGameOver';
import PopupOptions from './options/popupOptions';
import PopupTable from './table/popupTable';

export default class Popup {
  constructor(restart, optionsInst) {
    this.gameOver = false;
    this.$modal = null;
    this.popupGameOver = new PopupGameOver(restart);
    this.popupOptions = new PopupOptions(restart);
    this.popupTable = new PopupTable();
    this.result = null;
    this.options = optionsInst;
  }

  renderPopup($content = '', onClose = false) {
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
    this.toggleClose(onClose);
  }

  toggleClose(set = true) {
    if (set) {
      const $close = document.createElement('span');
      $close.classList.add('close');
      $close.textContent = '✕';
      this.$modal.firstChild.prepend($close);
      $close.onclick = this.hidePopup.bind(this);
      this.$modal.onclick = (e) => {
        if (!e.target.closest('.container')) this.hidePopup();
      };
    } else {
      this.$modal.onclick = '';
      this.$modal.firstChild.onclick = '';
    }
  }

  runGameOver(result) {
    this.result = result;
    this.gameOver = true;
    const { body } = document;
    body.style.overflow = 'hidden';
    const runGameOver = this.popupGameOver.render(result, this.runOptions.bind(this));
    this.renderPopup(runGameOver);
    this.$modal.classList.add('modal-show');
  }

  runOptions(
    option = {
      options: this.options,
      username: localStorage.getItem('_username'),
      clearPopup: this.hidePopup.bind(this),
      runClose: this.result ? this.runGameOver.bind(this, this.result) : this.hidePopup.bind(this),
    },
  ) {
    const { body } = document;
    body.style.overflow = 'hidden';
    const popupOptions = this.popupOptions.render(option);
    const permissionClose = !this.gameOver;
    this.renderPopup(popupOptions, permissionClose);
    this.$modal.classList.add('modal-show', 'option');
  }

  runTable() {
    const { body } = document;
    body.style.overflow = 'hidden';
    const popupTable = this.popupTable.render();
    const permissionClose = !this.gameOver;
    this.renderPopup(popupTable, permissionClose);
    this.$modal.classList.add('modal-show', 'table');
  }

  hidePopup() {
    const { body } = document;
    body.style.overflow = 'auto';
    this.$modal.innerHTML = '';
    this.$modal.classList.remove('modal-show', 'option', 'table');
    this.popupOptions.cancelAccept(this.options);
  }
}
