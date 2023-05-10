import PlayArea from './playArea/modules/playArea';
import RenderPlayArea from './playArea/modules/renderPlayArea';

export default class Manager {
  constructor(username, theme) {
    this.username = username;
    this.theme = theme;
    this.areaData = new PlayArea();
  }

  startGame() {
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
    const { body } = document;
    const options = {
      container: body,
      areaData: {
        row: 10,
        column: 10,
      },
    };
    this.$renderArea = new RenderPlayArea(options);
    this.$renderArea.renderPlayArea();
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
