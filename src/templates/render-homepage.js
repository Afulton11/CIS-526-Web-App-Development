const homepage = require("./_templates")["homepage.html"];
const { renderPage } = require("./render-page");

const renderHomepage = (req) =>
  renderPage(req, {
    title: "Kansas Computer Science Standards",
    body: homepage(),
  });

module.exports = {
  renderHomepage,
};
