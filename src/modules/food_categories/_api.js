const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");

const {
  postCategory,
  getCategory,
  editCategory,
  deleteCategory,
  listCategorys,
} = require("./_controllers");
const isSuper = require("../../shared/auth/isSuper");
const upload = require("../../uploads");

const router = express.Router();

router.post(
  "/categories",
  upload.single("image"),
  isLoggedIn,
  isSuper,
  postCategory
);
router.get("/categories/:id", isLoggedIn, getCategory);
router.get("/categories", isLoggedIn, isSuper, listCategorys);
router.patch("/categories/:id", isLoggedIn, isSuper, editCategory);
router.delete("/categories/:id", isLoggedIn, isSuper, deleteCategory);

module.exports = router;
