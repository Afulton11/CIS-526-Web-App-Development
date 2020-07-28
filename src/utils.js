const { hashSync, compareSync } = require("bcrypt");
const serverError = require("./serve-error");

// https://ui.dev/validate-email-address-javascript/
const emailIsValid = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const hash = async (data, rounds = 10) => hashSync(data, rounds);
const compareValueAgainstHash = async (data, encryptedData) =>
  compareSync(data, encryptedData);

const didSqlRunSucceed = (sqlResults, expectedChanges = 1) =>
  sqlResults.changes === expectedChanges;

const endResponseWithHtml = (res, html, status = 200) => {
  res.status(status);
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
};

module.exports = {
  emailIsValid,
  hash,
  compareValueAgainstHash,
  didSqlRunSucceed,
  endResponseWithHtml,
};
