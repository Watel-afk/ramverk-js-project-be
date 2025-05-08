const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  createItem,
  deleteItem,
  updateItem,
} = require("../controllers/items.controller");

router.post("/create-item", createItem);
router.delete("/:id/delete-item", deleteItem);
router.get("/get-items", getItems);
router.get("/:id/get-item", getItem);
router.post("/:id/update-item", updateItem);

module.exports = router;
