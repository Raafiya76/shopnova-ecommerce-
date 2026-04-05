const { authMiddleware, isAdmin } = require("./authMiddleware");

const auth = authMiddleware;
const adminOnly = isAdmin;

module.exports = {
  auth,
  adminOnly,
};
