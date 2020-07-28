const templates = require("../_templates");
const templateStandard = templates["standard.html"];

/** @module renderStandardsApi
 * @param {Array} standards - the standards to render in the api response.
 * @param {Number} totalCount - the total count of all the standard rows in the database
 */  
const renderStandardsApi = ({standards, isEnd = false}) => {
  const standardsHtml = standards.map(templateStandard);
  
  return JSON.stringify({
    standards: standardsHtml,
    isEnd,
  });
}

module.exports = {
  renderStandardsApi
};
