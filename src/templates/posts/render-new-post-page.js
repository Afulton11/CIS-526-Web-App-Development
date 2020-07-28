const newPostForm = require("../_templates")["new-post.html"];
const { renderPage } = require("../render-page");
const { topicRepository } = require("../../database");

const renderNewPostPage = (req, { errorMessage = undefined } = {}) => {
  const topicId = parseInt(req.params.topicId, 10);
  const topic = topicRepository.getTopicById(topicId);

  const pageHtml = renderPage(req, {
    title: "New Form",
    body: newPostForm({
      errorMessage,
      topic,
    }),
  });

  return pageHtml;
};

module.exports = {
  renderNewPostPage,
};
