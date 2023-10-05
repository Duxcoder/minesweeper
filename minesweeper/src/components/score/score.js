import './style.scss';

const addZero = (num) => {
  if (num > 999) return '999+';
  if (num < 10) return `00${num}`;
  if (num > 9 && num < 100) return `0${num}`;
  return num;
};
export default class Score {
  constructor({ clicks = 0, time = 0, bombs = 0, options, restart, popupInst }) {
    this.$scoreSection = null;
    this.$descriptionPanel = null;
    this.clicks = clicks;
    this.time = time;
    this.bombs = bombs;
    this.options = options;
    this.restart = restart;
    this.popupInst = popupInst;
  }

  updateScorePanel() {
    const content = `
        <li class="score-item click">
          <span class="icon icon-click"></span>
          <span class="score-text score-click">${addZero(this.clicks)}</span>
        </li>
        <li class="score-item time">
          <span class="icon icon-time"></span>
          <span class="score-text score-time">${addZero(this.time)}</span>
        </li>
        <li class="score-item bombs">
          <span class="icon icon-bombs"></span>
          <span class="score-text score-bombs">${addZero(this.bombs)}</span>
        </li>`;
    this.$scorePanel.innerHTML = content;
  }

  updateClick(clicks) {
    this.clicks = clicks;
  }

  updateTime(time) {
    this.time = time;
  }

  updateBombs(bombs) {
    this.bombs = bombs < 0 ? 0 : bombs;
  }

  getDescriptionPanel() {
    const $btnTable = document.createElement('button');
    $btnTable.classList.add('btn', 'btn-white', 'btn-rules');
    $btnTable.innerHTML = `
    <span class="icon-rules">
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 50 50" ><path d="M 7 2 L 7 48 L 43 48 L 43 14.59375 L 42.71875 14.28125 L 30.71875 2.28125 L 30.40625 2 Z M 9 4 L 29 4 L 29 16 L 41 16 L 41 46 L 9 46 Z M 31 5.4375 L 39.5625 14 L 31 14 Z M 15 22 L 15 24 L 35 24 L 35 22 Z M 15 28 L 15 30 L 31 30 L 31 28 Z M 15 34 L 15 36 L 35 36 L 35 34 Z"/></svg>
  </span>
  <span class="text-rules">TABLE</span>`;

    const $descriptionPanel = document.createElement('div');
    $descriptionPanel.classList.add('description-panel');
    const $btnRestart = document.createElement('button');
    $btnRestart.classList.add('btn', 'btn-transparent', 'btn-circle');
    $btnRestart.innerHTML = `
    <span class="icon-restart">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 14.155 14.155" style="enable-background:new 0 0 14.155 14.155;" xml:space="preserve" fill="currentColor" >
              <path d="M12.083,1.887c-0.795-0.794-1.73-1.359-2.727-1.697v2.135c0.48,0.239,0.935,0.55,1.334,0.95   c1.993,1.994,1.993,5.236,0,7.229c-1.993,1.99-5.233,1.99-7.229,0c-1.991-1.995-1.991-5.235,0-7.229   C3.466,3.269,3.482,3.259,3.489,3.25h0.002l1.181,1.179L4.665,0.685L0.923,0.68l1.176,1.176C2.092,1.868,2.081,1.88,2.072,1.887   c-2.763,2.762-2.763,7.243,0,10.005c2.767,2.765,7.245,2.765,10.011,0C14.844,9.13,14.847,4.649,12.083,1.887z"/>
            </svg>
        </span>`;
    $btnRestart.addEventListener('click', () => {
      const stopEvent = new CustomEvent('stopTimerEvent');
      document.dispatchEvent(stopEvent);
      this.restart();
    });
    const content = `
    <div class="name-block">
      <div class="name-label">playername:</div>
      <div class="name">
      ${localStorage.getItem('_username') ? localStorage.getItem('_username') : 'USER'}
      </div>
    </div>`;
    $btnTable.addEventListener('click', () => this.popupInst.runTable());
    $descriptionPanel.innerHTML = content;
    $descriptionPanel.append($btnTable, $btnRestart);
    this.$descriptionPanel = $descriptionPanel;
    return $descriptionPanel;
  }

  getScorePanel() {
    this.bombs = this.options.getOptions().bombs;
    const $scorePanel = document.createElement('ul');
    $scorePanel.classList.add('score-panel');
    const content = `
        <li class="score-item click">
          <span class="icon icon-click"></span>
          <span class="score-text score-click">${addZero(this.clicks)}</span>
        </li>
        <li class="score-item time">
          <span class="icon icon-time"></span>
          <span class="score-text score-time">${addZero(this.time)}</span>
        </li>
        <li class="score-item bombs">
          <span class="icon icon-bombs"></span>
          <span class="score-text score-bombs">${addZero(this.bombs)}</span>
        </li>`;
    $scorePanel.innerHTML = content;
    this.$scorePanel = $scorePanel;
    return $scorePanel;
  }

  renderScoreSection() {
    const $scoreSection = document.createElement('section');
    $scoreSection.classList.add('score-section');
    const $descr = this.getDescriptionPanel();
    const $score = this.getScorePanel();
    $scoreSection.prepend($descr);
    $scoreSection.append($score);
    document.body.append($scoreSection);
    this.$scoreSection = $scoreSection;
  }
}
