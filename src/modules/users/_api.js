const express = require("express");
const path = require("path");
const isLoggedIn = require("../../shared/auth/isLoggedIn");

const {
  postRegisterUser,
  postLoginUser,
  getMe,
  editUserMe,
  editUser,
  getUsers,
  showOneUser,
  deleteUser,
} = require("./_controllers");
const isAdmin = require("../../shared/auth/isSuper");
const { forgotPassword, resetPassword } = require("../users/resetPassword");

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/*", resetPassword);

console.log(__dirname);

router.get("/reset-password/*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

router.post("/users", isLoggedIn, isAdmin, postRegisterUser);
router.post("/users/login", postLoginUser);
router.get("/users/me", isLoggedIn, getMe);
router.get("/users", isLoggedIn, isAdmin, getUsers);
router.get("/users/:id", isLoggedIn, isAdmin, showOneUser);
router.patch("/users/me", isLoggedIn, editUserMe);
router.patch("/users/:id", isLoggedIn, isAdmin, editUser);

router.delete("/users/:id", isLoggedIn, isAdmin, deleteUser);

module.exports = router;
