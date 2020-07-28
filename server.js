const fs = require("fs");
const http = require("http");
const https = require("https");
const app = require("./src/app");
require("./src/templates/_templates");
require("./src/database/_queries");

const port = 3000;

// app.listen(port, (_) => {
//   console.log(`Server is listening on port ${port}`);
// });

// https://flaviocopes.com/express-https-self-signed-certificate/
const credentials = {
  key: fs.readFileSync("keys/server.key"),
  cert: fs.readFileSync("keys/server.cert"),
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(port, (_) => {
  console.log(`Server is listening on port ${port}`);
});

httpsServer.listen(port + 1, (_) => {
  console.log(`Secure server is listening on port ${port + 1}`);
});
