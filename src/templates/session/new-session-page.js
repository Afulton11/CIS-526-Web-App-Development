const signInContainer = require("../_templates")["signin.html"];
const { renderPage } = require("../render-page");

const renderNewSessionPage = (
  req,
  { errorMessage = "", path = "/signin" } = {}
) => {
  const pageHtml = renderPage(req, {
    title: "Sign In",
    body: signInContainer({
      errorMessage,
    }),
  });

  return pageHtml;
};

module.exports = {
  renderNewSessionPage,
};
