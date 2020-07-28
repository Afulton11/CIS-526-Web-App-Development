const db = require("../_database");
const { topics } = require("../_queries");
const { didSqlRunSucceed } = require("../../utils");

const getAllTopics = () => db.prepare(topics["get-all-forum-topics"]).all();

const getTopicBySubject = (topic) =>
  db.prepare(topics["get-forum-topic-by-subject"]).get(topic);

const getTopicById = (topicId) =>
  db.prepare(topics["get-forum-topic-by-id"]).get(topicId);

const saveTopic = ({ subject, userId }) => {
  const sqlResults = db
    .prepare(topics["create-forum-topic"])
    .run(subject, userId);

  return {
    didSave: didSqlRunSucceed(sqlResults),
    topicId: sqlResults.lastInsertRowid,
  };
};

module.exports = {
  getAllTopics,
  getTopicBySubject,
  getTopicById,
  saveTopic,
};
