const url = require("url");
const serveError = require("../serve-error");
const { standardRepository } = require("../database");
const { renderStandardsApi } = require("../templates");
const { endResponseWithHtml } = require("../utils");

const STANDARDS_API_ROUTES = ["/api/standards"];

const invalidRequestObject = {
  statusCode: 400,
  statusMessage: "Missing required parameter: offset",
};

const serveInvalidRequest = (req, res) =>
  serveError(req, res, invalidRequestObject);

const isEndOfStandards = ({ totalCount, limit, offset }) =>
  totalCount - offset - limit <= 0;

function serveStandardsApi(req, res) {
  const queryObject = url.parse(req.url, true).query;

  const { limit, offset } = queryObject;

  const standards = standardRepository.getPaginatedStandards({ limit, offset });
  const totalCount = standardRepository.getTotalStandardsCount();
  const json = renderStandardsApi({
    standards,
    isEnd: isEndOfStandards({ totalCount, limit, offset }),
  });

  endResponseWithHtml(res, json);
}

module.exports = {
  serveStandardsApi,
  STANDARDS_API_ROUTES,
};
