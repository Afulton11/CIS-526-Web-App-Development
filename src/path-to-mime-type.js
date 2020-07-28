const path = require('path');

/** @function pathToMimeType 
 * Converts the supplied file path string to 
 * the corresponding MIME-TYPE 
 * @param {string} path - the file path
 * @returns {string} the corresponding MIME-TYPE
 */
function pathToMimeType(filePath) {
  // Get the extension
  const extension = path.extname(filePath);
  
  // Return the MIME type
  switch(extension) {
    case ".html": 
      return "text/html";
    case ".css":
      return "text/css";
    case ".js":
      return "text/javascript";
    case ".json":
      return "application/json";
    case ".avi":
      return "video/x-msvideo";
    case ".flv":
      return "video/x-flv";
    case ".mov":
      return "video/quicktime";
    case ".mp4":
      return "video/mp4";
    case ".mpeg":
      return "video/mpeg";
    case ".ogv":
      return "video/ogg";
    default:
      return "application/octet-stream";
  }
}

module.exports = pathToMimeType;