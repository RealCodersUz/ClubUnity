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
const router = express.Router();

router.post("/orders", isLoggedIn, isSuper, postFood);
router.get("/orders/:id", isLoggedIn, getFood);
router.get("/orders", isLoggedIn, isSuper, listFoods);
router.patch("/orders/:id", isLoggedIn, isSuper, editFood);
router.delete("/orders/:id", isLoggedIn, isSuper, deleteFood);

module.exports = router;
