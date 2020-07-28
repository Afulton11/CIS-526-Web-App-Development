const db = require("../_database");
const { posts } = require("../_queries");
const { didSqlRunSucceed } = require("../../utils");
const { post } = require("../../app");

const getAllPostsForTopic = (topicId) => {
  const topicPosts = db.prepare(posts["get-all-posts-for-topic"]).all(topicId);

  return topicPosts.map((post) => {
    return {
      ...post,
      created_at: new Date(post.created_at),
    };
  });
};

const savePost = ({ body, topicId, userId }) => {
  const sqlResult = db
    .prepare(posts["create-forum-post"])
    .run(body, topicId, userId);

  return {
    didSave: didSqlRunSucceed(sqlResult),
    postId: sqlResult.lastInsertRowid,
  };
};

module.exports = {
  getAllPostsForTopic,
  savePost,
};
