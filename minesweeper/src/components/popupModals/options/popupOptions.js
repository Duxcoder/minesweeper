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

// function contentName(options) {
//   const $content = createDomElement('div', ['content', 'content-name']);
//   const $input = document.createElement('input');
//   $input.classList.add('input-name');
//   $input.type = 'text';
//   $input.name = 'name';
//   $input.id = '0';
//   $input.value = options.getOptions().username;
//   $input.onclick = function handlerClick() {
//     this.value = '';
//   };
//   $input.onchange = function handlerChange() {
//     options.setOptions({ name: this.value });
//   };
//   $content.append($input);
//   return $content;
// }

// function contentLevel(options) {
//   const $content = createDomElement('div', ['content', 'content-level']);
//   const $ul = createDomElement('ul', ['level-list']);
//   const levels = ['easy', 'medium', 'hard'];
//   for (let i = 1; i < 4; i += 1) {
//     const $lvlItem = createDomElement('li', ['level-item']);
//     const $lvlInput = createDomElement('input', ['level-input']);
//     $lvlInput.type = 'radio';
//     $lvlInput.name = 'level';
//     $lvlInput.id = i;
//     const $lvlLabel = createDomElement('label', ['level-label']);
//     $lvlLabel.htmlFor = i;
//     if (i === 1) $lvlInput.checked = true;
//     $lvlLabel.textContent = levels[i - 1];
//     $lvlItem.append($lvlInput, $lvlLabel);
//     $ul.append($lvlItem);
//     $lvlInput.onchange = function handle(e) {
//       const index = e.target.id - 1;
//       options.setOptions({ lvl: levels[index] });
//     };
//   }
//   $content.append($ul);
//   return $content;
// }

// function contentBombs() {
//   const $content = createDomElement('div', ['content', 'content-bombs']);
//   const $bombsMin = createDomElement('span', ['bombs-num'], '10');
//   const $bombsMax = createDomElement('span', ['bombs-num'], '99');
//   const $range = createDomElement('div', ['bomb-range']);
//   const $count = createDomElement('span', ['bomb-count'], '10');
//   const $input = createDomElement('input', ['input-bombs']);
//   $input.type = 'range';
//   $input.value = 10;
//   $input.min = 10;
//   $input.max = 99;
//   $input.oninput = function showSliderValue() {
//     $count.innerHTML = this.value;
//     const position = (this.value / this.max);
//     $count.style.left = `${(position * 7) - 1.07}rem`;
//   };
//   $content.append($bombsMin, $range, $bombsMax);
//   $range.append($count, $input);
//   return $content;
// }

// function contentTheme() {
//   const $content = createDomElement('div', ['content', 'content-theme']);
//   const $themeDark = createDomElement('span', ['theme-mode'], 'dark');
//   const $label = createDomElement('label', ['switch']);
//   const $checkbox = createDomElement('input', ['input']);
//   $checkbox.type = 'checkbox';
//   const $slider = createDomElement('span', ['round', 'slider', 'dark']);
//   const $themeLight = createDomElement('span', ['theme-mode'], 'light');
//   $content.append($themeDark, $label, $themeLight);
//   $label.append($checkbox, $slider);
//   return $content;
// }

// function contentSound() {
//   const $content = createDomElement('div', ['content', 'content-sound']);
//   const $soundOff = createDomElement('span', ['sound-mode'], 'off');
//   const $label = createDomElement('label', ['switch']);
//   const $checkbox = createDomElement('input', ['input']);
//   $checkbox.type = 'checkbox';
//   const $slider = createDomElement('span', ['round', 'slider']);
//   const $soundOn = createDomElement('span', ['sound-mode'], 'on');
//   $content.append($soundOff, $label, $soundOn);
//   $label.append($checkbox, $slider);
//   return $content;
// }

const isSetOptionsDef = {
  username: false,
  level: false,
  bombs: false,
  theme: false,
  sound: false,
};
export default class PopupOptions {
  constructor(restart) {
    this.restart = restart;
    this.isSetOptions = isSetOptionsDef;
  }

  acceptOptions(options) {
    const setOptions = Object.entries(this.isSetOptions);
    setOptions.forEach((item) => {
      const prop = item[0];
      if (item[1]) options.setOptions({ [prop]: item[1] });
    });
    this.options = isSetOptionsDef;
  }

  cancelAccept(options) {
    const setOptions = Object.entries(this.isSetOptions);
    setOptions.forEach((item) => {
      const prop = item[0];
      this.isSetOptions[prop] = options.getOptions().prop;
    });
    this.options = isSetOptionsDef;
  }

  contentName(options) {
    const $content = createDomElement('div', ['content', 'content-name']);
    const $input = document.createElement('input');
    $input.classList.add('input-name');
    $input.type = 'text';
    $input.name = 'name';
    $input.id = '0';
    $input.value = options.getOptions().username;
    $input.onclick = function handlerClick() {
      this.value = '';
    };
    $input.onchange = (e) => {
      this.isSetOptions.username = e.target.value;
    };
    $content.append($input);
    return $content;
  }

  contentLevel(options) {
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
      if (options.getOptions().level === levels[i - 1]) $lvlInput.checked = true;
      $lvlLabel.textContent = levels[i - 1];
      $lvlItem.append($lvlInput, $lvlLabel);
      $ul.append($lvlItem);
      $lvlInput.onchange = (e) => {
        const index = e.target.id - 1;
        this.isSetOptions.level = levels[index];
      };
    }
    $content.append($ul);
    return $content;
  }

  contentBombs(options) {
    const $content = createDomElement('div', ['content', 'content-bombs']);
    const $bombsMin = createDomElement('span', ['bombs-num'], '10');
    const $bombsMax = createDomElement('span', ['bombs-num'], '99');
    const $range = createDomElement('div', ['bomb-range']);
    const $count = createDomElement('span', ['bomb-count'], options.getOptions().bombs);
    const $input = createDomElement('input', ['input-bombs']);
    $input.type = 'range';
    $input.value = 10;
    $input.min = 10;
    $input.max = 99;
    const setPosition = (value = $input.value) => {
      $input.value = value;
      const position = (value / $input.max);
      $count.style.left = `${(position * 7) - 1.07}rem`;
    };
    setPosition(options.getOptions().bombs);
    $input.oninput = () => {
      $count.innerHTML = $input.value;
      setPosition();
      this.isSetOptions.bombs = $input.value;
    };
    $content.append($bombsMin, $range, $bombsMax);
    $range.append($count, $input);
    return $content;
  }

  contentTheme(options) {
    const $content = createDomElement('div', ['content', 'content-theme']);
    const $themeDark = createDomElement('span', ['theme-mode'], 'dark');
    const $label = createDomElement('label', ['switch']);
    const $checkbox = createDomElement('input', ['input']);
    $checkbox.type = 'checkbox';
    $checkbox.checked = options.getOptions().theme === 'light';
    const $slider = createDomElement('span', ['round', 'slider', 'dark']);
    const $themeLight = createDomElement('span', ['theme-mode'], 'light');
    $content.append($themeDark, $label, $themeLight);
    $label.append($checkbox, $slider);
    $checkbox.oninput = () => {
      this.isSetOptions.theme = $checkbox.checked ? 'light' : 'dark';
    };
    return $content;
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

  render(option) {
    const {
      runClose, clearPopup, options,
    } = option;
    const $container = document.createElement('div');
    $container.classList.add('container');
    const $optionList = document.createElement('ul');
    $optionList.classList.add('option-list');
    const $title = '<h2 class="title">OPTIONS</h2>';
    $container.innerHTML += $title;
    $container.append($optionList);
    $optionList.append(createOptionItem('Username:', this.contentName(options)));
    $optionList.append(createOptionItem('Level:', this.contentLevel(options)));
    $optionList.append(createOptionItem('Bombs:', this.contentBombs(options)));
    $optionList.append(createOptionItem('Theme:', this.contentTheme(options)));
    $optionList.append(createOptionItem('Sound:', this.contentSound(options)));
    const $btns = createDomElement('div', ['btns']);
    const $accept = createDomElement('button', ['btn-options', 'accept'], 'Accept');
    const $cancel = createDomElement('button', ['btn-options', 'cancel'], 'Cancel');
    $accept.onclick = () => {
      this.acceptOptions(options);
      clearPopup();
      runClose();
      this.restart();
    };
    $cancel.onclick = () => {
      this.cancelAccept(options);
      clearPopup();
      runClose();
    };
    $btns.append($accept, $cancel);
    $container.append($btns);
    this.$container = $container;
    return $container;
  }
}
