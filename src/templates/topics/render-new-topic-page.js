const newTopicForm = require("../_templates")["new-topic.html"];
const { renderPage } = require("../render-page");

const renderNewTopicPage = (req, { errorMessage = undefined } = {}) => {
  const pageHtml = renderPage(req, {
    title: "New Topic",
    body: newTopicForm({
      errorMessage,
    }),
  });

  return pageHtml;
};

module.exports = {
  renderNewTopicPage,
};
