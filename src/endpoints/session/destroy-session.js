const sessions = require("../../sessions");

const REGEX_SESSION_ID = /SID=([^;\s]+)/;

/** @function destroySession
 * This endpoint logs a user out of the website by
 * destroying thier session.
 * @param {http.IncomingRequest} req - The request object
 * @param {http.ServerResponse} res - the response object
 */
function destroySession(req, res) {
  const { cookie } = req.headers;
  const match = REGEX_SESSION_ID.exec(cookie);
  if (match) {
    const sid = match[1];
    sessions.remove(sid);
  }

  res.setHeader(
    "Set-Cookie",
    `SID=; Secure; HTTPOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
  res.statusCode = 302;
  res.setHeader("Location", "/");
  res.end();
}

module.exports = destroySession;
