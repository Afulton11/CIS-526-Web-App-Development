const db = require("../_database");
const { users } = require("../_queries");
const { didSqlRunSucceed } = require("../../utils");

const getUserByEmail = (email) =>
  email ? db.prepare(users["select-user-by-email"]).get(email) : undefined;
const getUserById = (userId) =>
  userId ? db.prepare(users["select-user-by-id"]).get(userId) : undefined;

const saveUser = ({
  first,
  last,
  organization = "",
  role,
  email,
  cryptedPassword,
}) => {
  const sqlResults = db
    .prepare(users["create-user"])
    .run(first, last, organization, role, email, cryptedPassword);

  return {
    didSave: didSqlRunSucceed(sqlResults),
    userId: sqlResults.lastInsertRowid,
  };
};

module.exports = {
  getUserByEmail,
  getUserById,
  saveUser,
};
