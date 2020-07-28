/** site.js
 * You should add your JavaScript code to this file.
 * See the assignment description in Guide for what
 * your code needs to accomplish.
 */


// loaded after 'load' event. See bottom of file.
const load = (_) => {
  setupOnMoreClick();
};

const setupOnMoreClick = () => {
  const standardNodes = document.querySelectorAll(".standard-container");

  standardNodes.forEach((node) => {
    const showMoreNode = getShowMoreNode(node);
    const hidableNodes = getHidableNodes(node);

    const createToggleNodesListener = (hiddenNodes) => () => {
      hiddenNodes.forEach((hiddenNode) =>
        hiddenNode.classList.toggle("hidable-on-mobile")
      );

      if (showMoreNode.textContent === "more...") {
        showMoreNode.textContent = "less...";
      } else {
        showMoreNode.textContent = "more...";
      }
    };

    showMoreNode.onclick = createToggleNodesListener(hidableNodes);
  });
};

window.addEventListener('load', _ => {
  load();
});

