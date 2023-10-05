export default function nodeCreator(node, classNames = [], content = '') {
  const $node = document.createElement(node);
  $node.classList.add(...classNames);
  if (content) $node.innerHTML = content;
  return $node;
}
