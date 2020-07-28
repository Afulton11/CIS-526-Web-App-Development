

function serveError(req, res, {err, statusCode = 501, statusMessage}) {
  if (err) console.error(err);
  res.statusCode = statusCode;
  res.statusMessage = statusMessage;
  res.end();
}

module.exports = serveError;