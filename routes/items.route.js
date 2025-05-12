const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../utils/utils");

const {
  getItems,
  getItem,
  getMyItems,
  createItem,
} = require("../controllers/items.controller");

router.post("/create-item", asyncWrapper(createItem));
router.get("/get-items", asyncWrapper(getItems));
router.get("/get-my-items", asyncWrapper(getMyItems));
router.get("/:id/get-item", asyncWrapper(getItem));

module.exports = router;
