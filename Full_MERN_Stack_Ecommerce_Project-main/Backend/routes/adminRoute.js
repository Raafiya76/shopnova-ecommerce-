const express = require("express");
const {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAdminDashboard,
} = require("../controller/adminCtrl");
const { auth, adminOnly } = require("../middlewares/auth");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/profile", auth, adminOnly, getAdminProfile);
router.get("/dashboard", auth, adminOnly, getAdminDashboard);

module.exports = router;
