const { renderNewTopicPage } = require("../../templates");
const { endResponseWithHtml } = require("../../utils");

module.exports = (req, res) => {
  const html = renderNewTopicPage(req);
  return endResponseWithHtml(res, html);
};
