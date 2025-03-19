const express = require("express");
const router = express.Router();
const {
  getFishes,
  getFish,
  createFish,
  deleteFish,
  updateFish,
} = require("../controllers/fishes.controller");

router.post("/create-fish", createFish);
router.delete("/:id/delete-fish", deleteFish);
router.get("/get-fishes", getFishes);
router.get("/:id/get-fish", getFish);
router.post("/:id/update-fish", updateFish);

module.exports = router;
