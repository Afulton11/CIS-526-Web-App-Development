const sessions = require("../../sessions");
const { compareValueAgainstHash, endResponseWithHtml } = require("../../utils");
const { renderNewSessionPage } = require("../../templates");
const { userRepository } = require("../../database");
const serveError = require("../../serve-error");

const MSG_LOGIN_INVALID = "Username/Password not found. Please try again.";

/** @function createSession
 * A helper method invoked when session creation is
 * successful.  The request should have an object
 * as its body parameter with username and password set.
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function createSession(req, res) {
  const { email, password } = req.body;

  const user = userRepository.getUserByEmail(email);
  if (!user) failure(req, res, MSG_LOGIN_INVALID);

  compareValueAgainstHash(password, user.crypted_password)
    .then((isMatch) => {
      if (isMatch) return success(req, res, user);
      else return failure(req, res, MSG_LOGIN_INVALID);
    })
    .catch((err) => serveError(req, res, { err, statusCode: 500 }));
}

/** @function success
 * Helper function for creating the user session after
 * a successful login attempt.
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 * @param {object} user - the user who signed in
 */
function success(req, res, user) {
  const sid = sessions.create(user);

  res.setHeader("Set-Cookie", `SID=${sid}; Secure; HTTPOnly`);
  return res.redirect("/");
}

/** @function failure
 * A helper function for reporting issues logging a
 * user in.
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - the error message for the user
 */
function failure(req, res, errorMessage) {
  if (!errorMessage)
    errorMessage =
      "There was an error processing your request.  Please try again.";

  var html = renderNewSessionPage(req, {
    errorMessage,
  });

  return endResponseWithHtml(res, html);
}

module.exports = createSession;
