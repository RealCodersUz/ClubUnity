const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");

const {
  postRoom,
  getRoom,
  editRoom,
  listRooms,
  deleteRoom,
} = require("./_controllers");
const isSuper = require("../../shared/auth/isSuper");

const router = express.Router();

router.post("/room", isLoggedIn, isSuper, postRoom);
router.get("/room/:id", isLoggedIn, getRoom);
router.get("/room", isLoggedIn, isSuper, listRooms);
router.patch("/room/:id", isLoggedIn, isSuper, editRoom);
router.delete("/room/:id", isLoggedIn, isSuper, deleteRoom);

module.exports = router;
