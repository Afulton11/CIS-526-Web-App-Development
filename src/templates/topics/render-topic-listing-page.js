const topicListingContainer = require("../_templates")["topic-listing.html"];
const { renderPage } = require("../render-page");

const renderTopicListingPage = (req, { topics } = {}) => {
  const pageHtml = renderPage(req, {
    title: "Forum Topics",
    body: topicListingContainer({
      topics,
    }),
  });

  return pageHtml;
};

module.exports = {
  renderTopicListingPage,
};
