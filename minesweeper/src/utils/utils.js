export function nodeCreator(node, classNames = [], content = '') {
  const $node = document.createElement(node);
  $node.classList.add(...classNames);
  if (content) $node.innerHTML = content;
  return $node;
}

export function getRandomNum(from, to) {
  const rand = from + Math.random() * (to + 1 - from);
  return Math.floor(rand);
}
