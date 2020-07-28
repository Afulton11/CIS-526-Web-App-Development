module.exports = {
  ...require("./render-page"),
  ...require("./render-homepage"),
  ...require("./standards/render-standard"),
  ...require("./standards/render-standards-page"),
  ...require("./api/render-standards-api"),
  ...require("./user/new-user-page"),
  ...require("./session/new-session-page"),
  ...require("./topics/render-new-topic-page"),
  ...require("./topics/render-topic-page"),
  ...require("./topics/render-topic-listing-page"),
  ...require("./posts/render-new-post-page"),
};
