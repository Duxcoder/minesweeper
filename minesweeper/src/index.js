import './index.html';
import './style/style.scss';
import './components/popupModals/gameOver/style.scss';
import Manager from './components/app';

const manager = new Manager();
manager.startGame();
