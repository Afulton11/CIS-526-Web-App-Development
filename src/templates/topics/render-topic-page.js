const topicContainer = require("../_templates")["topic.html"];
const { renderPage } = require("../render-page");

const renderTopicPage = (req, { topic, topicPosts } = {}) => {
  const pageHtml = renderPage(req, {
    title: topic.subject,
    body: topicContainer({
      topic,
      topicPosts,
    }),
  });

  return pageHtml;
};

module.exports = {
  renderTopicPage,
};
