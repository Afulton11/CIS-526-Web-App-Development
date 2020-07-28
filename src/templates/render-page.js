const layoutTemplate = require("./_templates")["layout.html"];

/** @module renderPage
 * @param {String}  title The title of the page
 * @param {String}  body  The content to contain withing the <body> html node.
 * @param {String}  head  Extra css
 * @param {String}  scripts  Extra js
 */
const renderPage = (req, { title, body, head, scripts }) =>
  layoutTemplate({
    path: req.baseUrl,
    user: req.session ? req.session.user : undefined,
    title,
    body,
    head,
    scripts,
  });

module.exports = {
  renderPage,
};
