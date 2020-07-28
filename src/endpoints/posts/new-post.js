const { renderNewPostPage } = require("../../templates");
const { endResponseWithHtml } = require("../../utils");
const { topicRepository } = require("../../database");
const serveError = require("../../serve-error");

module.exports = (req, res) => {
  const topicId = parseInt(req.params.topicId, 10);
  const topic = topicRepository.getTopicById(topicId);

  if (!topic)
    return serveError(req, res, {
      statusCode: 404,
      statusMessage: "Topic doesn't exist.",
    });

  const html = renderNewPostPage(req);
  return endResponseWithHtml(res, html);
};
