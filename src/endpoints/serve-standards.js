const { standardRepository } = require("../database");
const { renderStandards } = require("../templates");
const { endResponseWithHtml } = require("../utils");

/** @function serveStandards
 * Serves the Standards page
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function serveStandards(req, res) {
  const standards = standardRepository.getStandards();
  const html = renderStandards(req, { standards });

  return endResponseWithHtml(res, html);
}

module.exports = serveStandards;
