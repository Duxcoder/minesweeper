export default class Manager {
  constructor(username, theme) {
    this.username = username;
    this.theme = theme;
  }

  static renderHead() {
    console.log('render');
  }

  static renderDescriptionPanel() {

  }

  static renderScorePanel() {

  }

  static renderPlayArea() {

  }

  static renderFooter() {

  }

  static generationPlayArea() {
    return {
      bombs: [],
      numbers: [
        {
          name: '1',
          color: '#46616F',
          positions: [
            [0, 2], [0, 3], [5, 4],
          ],
        },
        {
          name: '2',
          color: '#59A834',
          positions: [
            [1, 2], [5, 3], [7, 1],
          ],
        },
      ],
    };
  }
}

// const app = new Manager();
// Manager.renderHead();
