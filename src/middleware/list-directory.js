const fs = require("fs");
const path = require("path");
const serveFile = require("../serve-file");
const serveError = require("../serve-error");
const { endResponseWithHtml } = require("../utils");

const createListingHeader = (name) => `<h2>Directory Listing for ${name}</h2>`;
const createLink = ({ url, text }) => `<a href="/static${url}">${text}</a>`;

const createListingPage = ({ pathHeader, listing, parentListing }) =>
  `
  <!doctype html>
  <html>
    <head>
      <title>Directory Listing</title>
    </head>
    <body>
      ${pathHeader}
      <div style="display: flex; flex-direction: column; padding: 2rem 0">
        ${listing}
      </div>
      ${parentListing}
    </body>
  </html>
`;

const buildListingPage = ({ pathHeader, pathname, entries }) => {
  const listing = entries
    .map((dirent) => {
      const url = path.posix.join(pathname, dirent);
      return createLink({ url, text: dirent });
    })
    .join("\n");

  const parentListing =
    pathname === "/"
      ? ""
      : createLink({ url: path.dirname(pathname), text: "Parent directory" });

  return createListingPage({
    pathHeader,
    listing,
    parentListing,
  });
};

/** @module listDirectory
 * Provides a function for serving a directory listing
 * for the directory matching the pathname in the req.url
 * If not found, serves a 404 status code.
 * @param {http.incomingMessage} req - the request object
 * @param {http.serverResponse} res - the response object
 */
function listDirectory(req, res, next) {
  const pathname = new URL(req.url, "http://localhost").pathname;
  const directoryPath = path.join("public", pathname);

  const pathHeader = createListingHeader(pathname);

  fs.readdir(directoryPath, (err, entries) => {
    if (err) return serveError(req, res, { statusCode: 404 });

    const listingPage = buildListingPage({
      pathHeader,
      pathname,
      entries,
    });

    return endResponseWithHtml(res, listingPage);
  });
}

module.exports = listDirectory;
