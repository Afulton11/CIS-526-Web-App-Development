const standardsTemplate = require("../_templates")["standards.html"];
const { renderPage } = require("../render-page");
const { renderStandard } = require("./render-standard");

const STANDARD_TITLE = "Kansas Computer Science Standards";

const STANDARD_CSS = `<link href="static/standard.css" rel="stylesheet">
  <link href="static/standard-mobile.css" rel="stylesheet">`;

const STANDARD_SCRIPTS = `    <script src="static/standards/node-helpers.js" async></script>
        <script src="static/standards/standard.js"></script>`;

/** @module renderPage
 * @param {Array}  standards  the list of all standards to render
 */
const renderStandardsPage = (req, { standards }) => {
  const standardViews = standards.map(renderStandard).join("\n");
  const standardsBody = standardsTemplate({
    renderedStandards: standardViews,
  });

  return renderPage(req, {
    title: STANDARD_TITLE,
    body: standardsBody,
    head: STANDARD_CSS,
    scripts: STANDARD_SCRIPTS,
  });
};

module.exports = {
  renderStandards: renderStandardsPage,
};
