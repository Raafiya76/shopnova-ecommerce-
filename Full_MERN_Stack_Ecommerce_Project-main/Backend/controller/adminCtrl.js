const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { generateToken } = require("../config/jwtToken");

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password, adminSecret } = req.body;

  if (!name || !email || !password || !adminSecret) {
    res.status(400);
    throw new Error("All fields are required");
  }

  if (adminSecret !== process.env.ADMIN_SECRET) {
    res.status(403);
    throw new Error("Invalid admin secret");
  }

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const admin = await User.create({
    name,
    email,
    password,
    role: "admin",
  });

  res.status(201).json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id, admin.role),
  });
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });
  if (!admin) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  if (admin.role !== "admin") {
    res.status(403);
    throw new Error("Access denied");
  }

  if (!(await admin.isPasswordMatched(password))) {
    res.status(401);
    throw new Error("Invalid Credentials");
  }

  res.json({
    _id: admin._id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id, admin.role),
  });
});

const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user.id).select("-password");

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.json(admin);
});

const getAdminDashboard = asyncHandler(async (req, res) => {
  const admin = await User.findById(req.user.id).select("name email role");

  if (!admin) {
    res.status(404);
    throw new Error("Admin not found");
  }

  res.json({
    message: "Admin dashboard access granted",
    admin: {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    },
  });
});

module.exports = {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  getAdminDashboard,
};
