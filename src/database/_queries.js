const fs = require("fs");
const path = require("path");

const QUERIES_DIR = "queries";
const QUERY_EXT = ".sql";

let queries = {};

const readDirectory = (dir) =>
  fs.readdirSync(dir, {
    encoding: "utf-8",
    withFileTypes: true,
  });

const readFile = (filepath) =>
  fs.readFileSync(filepath, {
    encoding: "utf-8",
  });

function writeFilepathToObject(obj, filepathString, ignoreDirs = []) {
  const filepath = path.parse(filepathString);
  const directoryList = filepath.dir
    .split(path.sep)
    .filter((dir) => !ignoreDirs.includes(dir));

  directoryList.forEach((directory, index) => {
    if (obj[directory] === undefined) obj[directory] = {};
    if (index == directoryList.length - 1)
      obj[directory][filepath.name] = readFile(filepathString);

    obj = obj[directory];
  });
}

function recursivelyMapQueryDirectoryToObject(folderPath) {
  const entries = readDirectory(folderPath);

  entries.forEach((entry) => {
    const entryPath = path.join(folderPath, entry.name);
    const entryExt = path.extname(entry.name);

    if (entry.isDirectory()) recursivelyMapQueryDirectoryToObject(entryPath);
    else if (entry.isFile && entryExt == QUERY_EXT) {
      const queryFile = fs.readFileSync(entryPath, { encoding: "utf-8" });
      if (queryFile) {
        writeFilepathToObject(queries, entryPath, [QUERIES_DIR]);
      }
    }
  });
}

recursivelyMapQueryDirectoryToObject(QUERIES_DIR);

module.exports = queries;
