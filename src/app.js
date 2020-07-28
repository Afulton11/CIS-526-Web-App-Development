const express = require("express");
const serveError = require("./serve-error");

const {
  showHomepage,
  showStandards,

  createUser,
  newUser,

  newSession,
  createSession,
  destroySession,

  createTopic,
  newTopic,
  showTopic,
  showTopicListing,

  createPost,
  newPost,
} = require("./endpoints");

const loadBody = require("./middleware/load-body");
const loadSession = require("./middleware/load-session");
const listDirectory = require("./middleware/list-directory");
const sessionOnly = require("./middleware/session-only");
// const authorsOnly = require("./middleware/authors-only");

/** @module app
 * The express application for our site
 */
var app = express();

app.use(loadSession);

app.get("/", showHomepage);
app.get("/index.html", showHomepage);
app.get("/standards", showStandards);
app.get("/standards.html", showStandards);

// app.get("/posts/new", authorsOnly, newPost);
// app.post("/posts", authorsOnly, loadBody, createPost);
// app.get("/posts/:id", showPost);

app.get("/signup", newUser);
app.post("/signup", loadBody, createUser);
app.get("/signin", newSession);
app.post("/signin", loadBody, createSession);
app.get("/signout", destroySession);

app.get("/forum", showTopicListing);
app.get("/forum/topics/new", sessionOnly, newTopic);
app.post("/forum/topics", sessionOnly, loadBody, createTopic);
app.get("/forum/topics/:topicId", showTopic);

app.get("/forums/topics/:topicId/posts/new", sessionOnly, newPost);
app.post("/forums/topics/:topicId", sessionOnly, loadBody, createPost);

app.use("/static", express.static("public"));
app.use("/static", listDirectory);

module.exports = app;
