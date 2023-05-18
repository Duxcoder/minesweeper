import './style.scss';

function createDomElement(tag = 'div', classNames = [], content = '') {
  const $content = document.createElement(tag);
  $content.classList.add(...classNames);
  $content.textContent = content;
  return $content;
}

function createOptionItem(name, $content) {
  const $item = document.createElement('li');
  $item.classList.add('option-item');
  const $nameItem = document.createElement('span');
  $nameItem.classList.add('option-name');
  $nameItem.textContent = name;
  $item.prepend($nameItem);
  $item.append($content);
  return $item;
}

function contentName() {
  const $content = createDomElement('div', ['content', 'content-name']);
  const $input = document.createElement('input');
  $input.classList.add('input-name');
  $input.type = 'text';
  $input.name = 'name';
  $input.id = '0';
  $content.append($input);
  return $content;
}

function contentLevel() {
  const $content = createDomElement('div', ['content', 'content-level']);
  const $ul = createDomElement('ul', ['level-list']);
  const levels = ['easy', 'medium', 'hard'];
  for (let i = 1; i < 4; i += 1) {
    const $lvlItem = createDomElement('li', ['level-item']);
    const $lvlInput = createDomElement('input', ['level-input']);
    $lvlInput.type = 'radio';
    $lvlInput.name = 'level';
    $lvlInput.id = i;
    const $lvlLabel = createDomElement('label', ['level-label']);
    $lvlLabel.htmlFor = i;
    if (i === 1) $lvlInput.checked = true;
    $lvlLabel.textContent = levels[i - 1];
    $lvlItem.append($lvlInput, $lvlLabel);
    $ul.append($lvlItem);
  }
  $content.append($ul);
  return $content;
}

function contentBombs() {
  const $content = createDomElement('div', ['content', 'content-bombs']);
  const $bombsMin = createDomElement('span', ['bombs-num'], '10');
  const $bombsMax = createDomElement('span', ['bombs-num'], '99');
  const $range = createDomElement('div', ['bomb-range']);
  const $count = createDomElement('span', ['bomb-count'], '10');
  const $input = createDomElement('input', ['input-bombs']);
  $input.type = 'range';
  $input.value = 10;
  $input.min = 10;
  $input.max = 99;
  $content.append($bombsMin, $range, $bombsMax);
  $range.append($count, $input);
  return $content;
}

function contentTheme() {
  const $content = createDomElement('div', ['content', 'content-theme']);
  const $themeDark = createDomElement('span', ['theme-mode'], 'dark');
  const $label = createDomElement('label', ['switch']);
  const $checkbox = createDomElement('input', ['input']);
  $checkbox.type = 'checkbox';
  const $slider = createDomElement('span', ['round', 'slider', 'dark']);
  const $themeLight = createDomElement('span', ['theme-mode'], 'light');
  $content.append($themeDark, $label, $themeLight);
  $label.append($checkbox, $slider);
  return $content;
}

function contentSound() {
  const $content = createDomElement('div', ['content', 'content-sound']);
  const $soundOff = createDomElement('span', ['sound-mode'], 'off');
  const $label = createDomElement('label', ['switch']);
  const $checkbox = createDomElement('input', ['input']);
  $checkbox.type = 'checkbox';
  const $slider = createDomElement('span', ['round', 'slider']);
  const $soundOn = createDomElement('span', ['sound-mode'], 'on');
  $content.append($soundOff, $label, $soundOn);
  $label.append($checkbox, $slider);
  return $content;
}
export default class PopupOptions {
  constructor(restart) {
    this.restart = restart;
  }

  render() {
    const $container = document.createElement('div');
    $container.classList.add('container');
    const $optionList = document.createElement('ul');
    $optionList.classList.add('option-list');
    const $title = '<h2 class="title">OPTIONS</h2>';
    $container.innerHTML += $title;
    $container.append($optionList);
    $optionList.append(createOptionItem('Username:', contentName()));
    $optionList.append(createOptionItem('Level:', contentLevel()));
    $optionList.append(createOptionItem('Bombs:', contentBombs()));
    $optionList.append(createOptionItem('Theme:', contentTheme()));
    $optionList.append(createOptionItem('Sound:', contentSound()));
    const $btns = createDomElement('div', ['btns']);
    const $accept = createDomElement('button', ['btn-options', 'accept'], 'Accept');
    const $cancel = createDomElement('button', ['btn-options', 'cancel'], 'Cancel');
    $btns.append($accept, $cancel);
    $container.append($btns);
    this.$container = $container;
    return $container;
  }
}
