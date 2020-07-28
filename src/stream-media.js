const fs = require("fs");
const path = require("path");
const pathToMimeType = require("./path-to-mime-type");
const serveError = require("./serve-error");

const STATUS_PARTIAL_CONTENT = 206;

const getStreamRange = (req, fileStats) => {
  const rangeMatch = /bytes=(\d+)-(\d*)/.exec(req.headers.range);

  const start = parseInt(rangeMatch[1], 10);
  const end = rangeMatch[2] ? parseInt(rangeMatch[2], 10) : fileStats.size - 1;

  return {
    start,
    end,
  };
};
/** @function streamMedia
 * Serves a portion of the requested video file.
 * The video file is embodied in the request url and
 * the range of bytes to serve is contained in the
 * request http range header.  See
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Range
 * for details.
 * @param {http.incomingRequest} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function streamMedia(req, res) {
  // Determine the path to the file
  const pathname = new URL(req.url, "http://localhost").pathname;
  const filePath = path.join("public", pathname);
  const mimeType = pathToMimeType(filePath);

  fs.stat(filePath, (err, stats) => {
    if (err) return serveError(req, res, { err });

    const range = getStreamRange(req, stats);

    res.setHeader("Content-Length", range.end - range.start + 1);
    res.setHeader("Content-Type", mimeType);
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader(
      "Content-Range",
      `bytes ${range.start}-${range.end}/${stats.size}`
    );
    res.statusCode = STATUS_PARTIAL_CONTENT;

    const stream = fs
      .createReadStream(filePath, range)
      .on("open", (_) => stream.pipe(res))
      .on("error", (err) => res.end(err));
  });
}

module.exports = streamMedia;
