const fs = require("fs");
const path = require("path");
const pathToMimeType = require("./path-to-mime-type");
const serveError = require("./serve-error");

/** @module serveFile
 * Provides a function for serving files in the public
 * directory matching the pathname in the req.url
 * If not found, serves a 404 status code.
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function serveFile(req, res) {
  const pathname = new URL(req.url, "http://localhost").pathname;
  const filePath = path.join("public", pathname);

  fs.readFile(filePath, function (err, body) {
    if (err)
      return serveError(req, res, {
        err,
        statusCode: 404,
        statusMessage: "Not Found",
      });

    res.setHeader("Content-Length", body.length);
    res.setHeader("Content-Type", pathToMimeType(filePath));
    res.end(body);
  });
}

module.exports = serveFile;
