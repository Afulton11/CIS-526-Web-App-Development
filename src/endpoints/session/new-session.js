const { renderNewSessionPage } = require("../../templates");
const { endResponseWithHtml } = require("../../utils");

module.exports = function (req, res) {
  const html = renderNewSessionPage(req);
  return endResponseWithHtml(res, html);
};
