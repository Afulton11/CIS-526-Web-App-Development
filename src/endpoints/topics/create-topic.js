const { endResponseWithHtml } = require("../../utils");
const { renderNewTopicPage } = require("../../templates");
const { topicRepository } = require("../../database");
const serveError = require("../../serve-error");

const formatMsgTopicExists = (topic) => `The topic ${topic} already exists.`;
const formatSaveError = (topic) =>
  `Something went wrong attempting to save ${topic} as a topic!`;

function createTopic(req, res) {
  const { subject } = req.body;
  const { user } = req.session;
  const errorMessages = [];

  if (!subject || subject.length < 3)
    errorMessages.push("Subject must contain atleast 3 characters.");
  if (subject.length > 32)
    errorMessages.push("Subject can be at most 32 characters.");

  const topic = topicRepository.getTopicBySubject(subject);
  if (topic) errorMessages.push(formatMsgTopicExists(subject));

  if (errorMessages.length == 0) {
    const { didSave, topicId } = topicRepository.saveTopic({
      subject,
      userId: user.id,
    });

    if (didSave) return success(req, res, topicId);
    else errorMessages.push(formatSaveError(subject));
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

  var html = renderNewTopicPage(req, {
    errorMessage,
  });

  return endResponseWithHtml(res, html);
}

module.exports = createTopic;
