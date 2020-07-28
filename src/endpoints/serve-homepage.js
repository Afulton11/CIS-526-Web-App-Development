const { renderHomepage } = require("../templates");
const { endResponseWithHtml } = require("../utils");

function serveHomepage(req, res) {
  const html = renderHomepage(req);
  return endResponseWithHtml(res, html);
}

module.exports = serveHomepage;
