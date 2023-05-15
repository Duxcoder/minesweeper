import './style.scss';

function header() {
  const $body = document.body;
  const $header = document.createElement('header');
  $header.classList.add('header');
  $header.innerHTML = `
  <h1 class="logo">
  <span class='orange'>M</span>INESWEEPER
</h1>
  `;
  $body.prepend($header);
  return $header;
}

export default header;
