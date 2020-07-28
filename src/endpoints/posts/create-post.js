const { endResponseWithHtml } = require("../../utils");
const { renderNewPostPage } = require("../../templates");
const { topicRepository, postRepository } = require("../../database");
const serveError = require("../../serve-error");

function createPost(req, res) {
  const topicId = parseInt(req.params.topicId, 10);
  const { body } = req.body;
  const { user } = req.session;
  const errorMessages = [];

  if (!topicId) errorMessages.push("A topic must be selected.");
  if (!body || body.length < 32)
    errorMessages.push("Body must contain atleast 32 characters.");

  const topic = topicRepository.getTopicById(topicId);
  if (!topic)
    errorMessages.push("The selected topic does not exist. Please try again.");

  if (errorMessages.length == 0) {
    const { didSave, postId } = postRepository.savePost({
      body,
      topicId,
      userId: user.id,
    });

    if (didSave) return success(req, res, topicId);
    else {
      errorMessages.push(
        "Something went wrong attempting to save the post! Please try again."
      );
    }
  }

  return failure(req, res, errorMessages.join("\n"));
}

function success(req, res, topicId) {
  return res.redirect(`/forum/topics/${topicId}`);
}

function failure(req, res, errorMessage) {
  if (!errorMessage)
    errorMessage =
      "There was an error processing your request.  Please try again.";

  var html = renderNewPostPage(req, {
    errorMessage,
  });

  return endResponseWithHtml(res, html);
}

module.exports = createPost;
