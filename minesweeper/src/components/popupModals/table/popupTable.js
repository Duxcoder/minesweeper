import './style.scss';

function createDomElement(tag = 'div', classNames = [], content = '') {
  const $content = document.createElement(tag);
  $content.classList.add(...classNames);
  $content.textContent = content;
  return $content;
}

export default class PopupTable {
  constructor(restart) {
    this.restart = restart;
  }

  contentSound(options) {
    const $content = createDomElement('div', ['content', 'content-sound']);
    const $soundOff = createDomElement('span', ['sound-mode'], 'off');
    const $label = createDomElement('label', ['switch']);
    const $checkbox = createDomElement('input', ['input']);
    $checkbox.type = 'checkbox';
    $checkbox.checked = options.getOptions().sound === 'on';
    const $slider = createDomElement('span', ['round', 'slider']);
    const $soundOn = createDomElement('span', ['sound-mode'], 'on');
    $content.append($soundOff, $label, $soundOn);
    $label.append($checkbox, $slider);
    $checkbox.oninput = () => {
      this.isSetOptions.sound = $checkbox.checked ? 'on' : 'off';
    };
    return $content;
  }

  render() {
    const $container = document.createElement('div');
    $container.classList.add('container');
    const $tableList = document.createElement('ul');
    $tableList.classList.add('table-list');
    const $title = '<h2 class="title">Game History</h2>';
    $container.innerHTML += $title;
    $container.append($tableList);
    const users = localStorage.getItem('_table') ? JSON.parse(localStorage.getItem('_table')) : '';
    const $divNumberTitle = createDomElement('div', ['item-title', 'table-item', 'table-num']);
    $divNumberTitle.textContent = '№';
    const $divNameTitle = createDomElement('div', ['item-title', 'table-item', 'table-name']);
    $divNameTitle.textContent = 'Name:';
    const $divLevelTitle = createDomElement('div', ['item-title', 'table-item', 'table-lvl']);
    $divLevelTitle.textContent = 'Levels:';
    const $divClicksTitle = createDomElement('div', ['item-title', 'table-item', 'table-clicks']);
    $divClicksTitle.textContent = 'Click:';
    const $divBombsTitle = createDomElement('div', ['item-title', 'table-item', 'table-bombs']);
    $divBombsTitle.textContent = 'Bombs:';
    $tableList.append(
      $divNumberTitle,
      $divNameTitle,
      $divLevelTitle,
      $divClicksTitle,
      $divBombsTitle,
    );
    if (users === '') {
      $tableList.append('no winners');
    } else {
      users
        .sort((a, b) => b[0] - a[0])
        .forEach((item, i) => {
          if (i < 10) {
            const $divNumber = createDomElement('div', ['table-item', 'table-num']);
            $divNumber.textContent = i + 1;
            const $divName = createDomElement('div', ['table-item', 'table-name']);
            // eslint-disable-next-line prefer-destructuring
            $divName.textContent = item[1];
            const $divLevel = createDomElement('div', ['table-item', 'table-lvl']);
            // eslint-disable-next-line prefer-destructuring
            $divLevel.textContent = item[2];
            const $divClicks = createDomElement('div', ['table-item', 'table-clicks']);
            // eslint-disable-next-line prefer-destructuring
            $divClicks.textContent = item[3];
            const $divBombs = createDomElement('div', ['table-item', 'table-bombs']);
            // eslint-disable-next-line prefer-destructuring
            $divBombs.textContent = item[4];
            $tableList.append($divNumber, $divName, $divLevel, $divClicks, $divBombs);
          }
        });
    }
    this.$container = $container;
    return $container;
  }
}
