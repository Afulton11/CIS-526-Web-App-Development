const { renderNewUserPage } = require("../../templates");
const { userRepository } = require("../../database");
const serveError = require("../../serve-error");
const { hash, emailIsValid, endResponseWithHtml } = require("../../utils");
const sessions = require("../../sessions");

/** @function createUser
 * An endpoint for creating a new user.  The request
 * should have an object as its body parameter with
 * first, last, role, email, password, and passwordConfirmation set.
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function createUser(req, res) {
  const {
    first,
    last,
    email,
    role,
    organization,
    password,
    passwordConfirmation,
  } = req.body;

  const errorMessages = [];

  if (!first) errorMessages.push("Your first name is required.");
  if (!last) errorMessages.push("Your last name is required.");
  if (!email) errorMessages.push("An email address is required.");
  if (!role) errorMessages.push("Please select a role.");
  if (!emailIsValid(email))
    errorMessages.push("Please enter a valid email address.");
  if (!password) errorMessages.push("Please enter a password.");
  if (!passwordConfirmation)
    errorMessages.push("Please confirm your password.");
  if (password !== passwordConfirmation)
    errorMessages.push("Your password and password confirmation must match.");

  const existingUser = userRepository.getUserByEmail(email);
  if (existingUser)
    errorMessages.push(`The email "${email}" is already in use.`);

  if (errorMessages.length > 0)
    return failure(req, res, errorMessages.join("\n"));

  return hash(password)
    .then((cryptedPassword) => {
      const { didSave, userId } = userRepository.saveUser({
        first,
        last,
        email,
        role,
        organization,
        cryptedPassword,
      });

      if (didSave) return success(req, res, userId);
      return failure(req, res, "An error occurred. Please try again.");
    })
    .catch((err) => serveError(req, res, { err, statusCode: 500 }));
}

/** @function success
 * A helper method invoked when user creation is successful.
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 * @param {integer} userId - the id of the user in the database
 */
function success(req, res, userId) {
  const user = userRepository.getUserById(userId);

  sessions.create(user);

  // Set session cookie
  res.setHeader("Set-Cookie", `SID=${sid}; Secure; HTTPOnly`);
  // Redirect to home page
  res.redirect("/");
}

/** @function failure
 * A helper method invoked when user creation fails.
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 * @param {string} errorMessage - a message to display to the user
 */
function failure(req, res, errorMessage) {
  if (!errorMessage)
    errorMessage =
      "There was an error processing your request. Please try again.";

  const signupHtml = renderNewUserPage(req, {
    errorMessage,
  });

  return endResponseWithHtml(res, signupHtml);
}

module.exports = createUser;
