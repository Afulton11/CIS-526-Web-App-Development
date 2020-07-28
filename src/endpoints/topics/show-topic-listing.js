const { renderTopicListingPage } = require("../../templates");
const { topicRepository } = require("../../database");
const { endResponseWithHtml } = require("../../utils");

module.exports = function (req, res) {
  const topics = topicRepository.getAllTopics();

  const html = renderTopicListingPage(req, {
    topics,
  });

  return endResponseWithHtml(res, html);
};
