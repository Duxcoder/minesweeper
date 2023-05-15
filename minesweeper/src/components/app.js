import PlayArea from './playArea/playArea';
import Options from './options';
import Popup from './popupModals/popup';
import header from './header/header';
import Score from './score/score';
// import RenderPlayArea from './playArea/modules/renderPlayArea';

export default class Manager {
  constructor() {
    this.popup = new Popup();
    this.area = new PlayArea(this.popup);
    this.options = new Options();
    this.score = new Score();
  }

  startGame() {
    this.options.setAreaData();
    header();
    this.score.renderScoreSection();
    this.playArea();
    // this.renderFooter()
  }

  // renderHead() {
  //   console.log('render');
  // }

  // renderDescriptionPanel() {

  // }

  // renderScorePanel() {

  // }

  playArea() {
    this.area.startPlayArea(this.options.areaData);
    // FUNCTIONALITY
  }

  // renderFooter() {

  // }

  // generationPlayArea() {
  //   return {
  //     bombs: [],
  //     numbers: [
  //       {
  //         name: '1',
  //         color: '#46616F',
  //         positions: [
  //           [0, 2], [0, 3], [5, 4],
  //         ],
  //       },
  //       {
  //         name: '2',
  //         color: '#59A834',
  //         positions: [
  //           [1, 2], [5, 3], [7, 1],
  //         ],
  //       },
  //     ],
  //   };
  // }
}

// const app = new Manager();
// Manager.renderHead();
