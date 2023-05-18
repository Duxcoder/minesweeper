import PlayArea from './playArea/playArea';
import Options from './options';
import Popup from './popupModals/popup';
import header from './header/header';
import Score from './score/score';
import footer from './footer/footer';

export default class Manager {
  constructor() {
    this.options = new Options();
    this.popup = new Popup(this.restart.bind(this));
    this.score = new Score({ options: this.options, restart: this.restart.bind(this) });
    this.area = new PlayArea(this.popup, this.score);
  }

  startGame() {
    this.options.setAreaData();
    header();
    this.score.renderScoreSection();
    this.playArea();
    footer();
  }

  restart() {
    console.log('restart');
    document.body.innerHTML = '';
    document.body.style.overflow = '';
    this.options = new Options();
    console.log(this);
    this.popup = new Popup(this.restart.bind(this));
    this.score = new Score({ options: this.options, restart: this.restart.bind(this) });
    this.area = new PlayArea(this.popup, this.score);
    this.startGame();
  }

  playArea() {
    this.area.startPlayArea(this.options.areaData);
    // FUNCTIONALITY
  }
}
