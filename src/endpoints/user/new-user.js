const { renderNewUserPage } = require("../../templates");
const { endResponseWithHtml } = require("../../utils");

module.exports = (req, res) => {
  const html = renderNewUserPage(req);
  return endResponseWithHtml(res, html);
};
