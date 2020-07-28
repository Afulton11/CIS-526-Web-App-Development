const serveError = require("../serve-error");
const newTopic = require("../endpoints/topics/new-topic");

function sessionOnly(req, res, next) {
  // if not user logged in redirect to login page
  const { user } = req.session;
  if (!user) return res.redirect("/signin");

  return next();
}

module.exports = sessionOnly;
