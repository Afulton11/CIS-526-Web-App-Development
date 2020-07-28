const { renderTopicPage } = require("../../templates");
const { topicRepository, postRepository } = require("../../database");
const serveError = require("../../serve-error");
const { endResponseWithHtml } = require("../../utils");

module.exports = function (req, res) {
  const topicId = parseInt(req.params.topicId, 10);

  const topic = topicRepository.getTopicById(topicId);

  if (!topic)
    return serveError(req, res, {
      statusCode: 404,
      statusMessage: "Topic not found.",
    });

  const posts = postRepository.getAllPostsForTopic(topicId);

  const html = renderTopicPage(req, {
    topic,
    topicPosts: posts,
  });

  return endResponseWithHtml(res, html);
};
