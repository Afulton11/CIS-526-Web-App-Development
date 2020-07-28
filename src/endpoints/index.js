const showStandards = require("./serve-standards");
const showHomepage = require("./serve-homepage");
const sessionEndpoints = require("./session");
const postsEndpoints = require("./posts");
const userEndpoints = require("./user");
const topicEndpoints = require("./topics");

module.exports = {
  showStandards,
  showHomepage,
  ...sessionEndpoints,
  ...postsEndpoints,
  ...userEndpoints,
  ...topicEndpoints,
};
