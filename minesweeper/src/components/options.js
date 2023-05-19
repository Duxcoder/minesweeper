const defOptionsArea = {
  rowCells: 5,
  columnCells: 5,
  countBombs: 5,
};
export default class Options {
  constructor() {
    this.username = null;
    this.theme = null;
    this.areaData = null;
  }

  setOptions({
    username, level, bombs, theme, sound,
  }) {
    if (username) localStorage.setItem('_username', username);
    if (level) localStorage.setItem('_level', level);
    if (bombs) localStorage.setItem('_bombs', bombs);
    if (theme) localStorage.setItem('_theme', theme);
    if (sound) localStorage.setItem('_sound', sound);
    this.changeOptions = true;
  }

  getOptions() {
    const localUser = localStorage.getItem('_username');
    const localLvl = localStorage.getItem('_level');
    const localBombs = localStorage.getItem('_bombs');
    const localTheme = localStorage.getItem('_theme');
    const localSound = localStorage.getItem('_sound');
    const options = {
      username: localUser || 'User',
      level: localLvl || 'easy',
      bombs: localBombs || 10,
      theme: localTheme || 'light',
      sound: localSound || 'on',
    };
    const row = () => {
      const { level } = options;
      let rows = 10;
      if (level === 'easy') rows = 10;
      if (level === 'medium') rows = 15;
      if (level === 'hard') rows = 25;
      return rows;
    };
    options.row = row();
    options.column = row();
    this.options = options;
    return options;
  }

  setAreaData({ rowCells, columnCells, countBombs } = defOptionsArea) {
    const { body } = document;
    const options = {
      container: body,
      data: {
        bombs: countBombs,
        row: rowCells,
        column: columnCells,
      },
    };
    this.areaData = options;
    return options;
  }

  getAreaData() {
    return this.areaData;
  }
}
