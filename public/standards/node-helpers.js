const getShowMoreNode = (node) => node.querySelector(".more-href");
const getHidableNodes = (node) => node.querySelectorAll(".hidable-on-mobile");

const createDiv = (_) => document.createElement("div");

function appendChildren(node, children) {
  children.forEach((child) => node.appendChild(child));
}
