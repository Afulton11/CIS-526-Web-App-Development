const db = require("../_database");
const { standards } = require("../_queries");

const getStandards = () => db.prepare(standards["get-all-standards"]).all();
const getStandardById = (id) =>
  db.prepare(standards["get-standard-by-id"]).get(id);
const getPaginatedStandards = ({limit = 15, offset = 0}) => 
  db.prepare(standards["get-paginated-standards"]).all(limit, offset);
const getTotalStandardsCount = () => db.prepare(standards["get-standards-count"]).get().totalCount; 

module.exports = {
  getStandards,
  getStandardById,
  getPaginatedStandards,
  getTotalStandardsCount
};
