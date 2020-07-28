const sessions = require("../sessions");

const REGEX_SESSION_ID = /SID=([^;\s]+)/;

/** @function loadSession
 * Loads the session (if it exists) and attaches
 * it to req.session
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function loadSession(req, res, next) {
  const { cookie } = req.headers;
  const match = REGEX_SESSION_ID.exec(cookie);

  if (!match) {
    // No cookie to load, empty session.
    req.session = {};
    return next();
  }

  const sid = match[1];
  const session = sessions.get(sid);

  req.session = session;
  next();
}

module.exports = loadSession;
