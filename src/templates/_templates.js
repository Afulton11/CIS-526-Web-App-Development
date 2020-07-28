const fs = require("fs");
const path = require("path");
const ejs = require("ejs");

/** @module templates
 * This module exports a map of template names to functions used to render Embedded JavaScript Templates found in the templates directory of the project.
 */
const templates = {};

const templateFiles = fs.readdirSync("templates");
templateFiles.forEach((file) => {
  const filepath = path.join("templates", file);
  const fileString = fs.readFileSync(filepath, { encoding: "utf8" });
  templates[path.basename(file, ".ejs")] = ejs.compile(fileString);
});

module.exports = templates;
