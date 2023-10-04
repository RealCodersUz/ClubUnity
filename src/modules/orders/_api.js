const express = require("express");
const isLoggedIn = require("../../shared/auth/isLoggedIn");

const {
  postOrder,
  getOrder,
  editOrder,
  deleteOrder,
  listOrders,
} = require("./_controllers");
const router = express.Router();

router.post("/orders", isLoggedIn, postOrder);
router.get("/orders/:id", isLoggedIn, getOrder);
router.get("/orders", isLoggedIn, listOrders);
router.patch("/orders/:id", isLoggedIn, editOrder);
router.delete("/orders/:id", isLoggedIn, deleteOrder);

module.exports = router;
