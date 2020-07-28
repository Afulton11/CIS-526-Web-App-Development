const signUpContainer = require("../_templates")["signup.html"];
const { renderPage } = require("../render-page");

const renderNewUserPage = (req, { errorMessage = undefined } = {}) => {
  const pageHtml = renderPage(req, {
    title: "Sign Up",
    body: signUpContainer({
      errorMessage,
    }),
  });

  return pageHtml;
};

module.exports = {
  renderNewUserPage,
};
