import PlayArea from './playArea/playArea';
import Options from './options';
// import RenderPlayArea from './playArea/modules/renderPlayArea';

export default class Manager {
  constructor() {
    this.area = new PlayArea();
    this.options = new Options();
  }

  startGame() {
    this.options.setAreaData();
    // this.renderHead();
    // this.renderDescriptionPanel()
    // this.renderScorePanel()
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
