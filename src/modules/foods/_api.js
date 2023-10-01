const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");

const {
  postFood,
  getFood,
  editFood,
  deleteFood,
  listFoods,
} = require("./_controllers");
const isSuper = require("../../shared/auth/isSuper");
const upload = require("../../uploads");
const router = express.Router();

router.post("/foods", isLoggedIn, isSuper, upload.single("image"), postFood);
router.get("/foods/:id", isLoggedIn, getFood);
router.get("/foods", isLoggedIn, isSuper, listFoods);
router.patch("/foods/:id", isLoggedIn, isSuper, editFood);
router.delete("/foods/:id", isLoggedIn, isSuper, deleteFood);

module.exports = router;
