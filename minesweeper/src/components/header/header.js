import './style.scss';
import nodeCreator from '../../utils/utils';

function header() {
  const $body = document.body;
  const headerContent = `
  <h1 class="logo">
  <span class='orange'>M</span>INESWEEPER
</h1>
  `;
  const $header = nodeCreator('header', ['header'], headerContent);
  $body.prepend($header);
  return $header;
}

export default header;
