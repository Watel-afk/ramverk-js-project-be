const express = require("express");
const router = express.Router();
const { authorizeSession } = require("../manager/authorization.manager.js");
const {
  changePassword,
  createUser,
  getUsers,
  getUser,
} = require("../controllers/users.controller");

router.post("/change-password", authorizeSession, changePassword);
router.post("/create-user", createUser);
router.get("/get-users", authorizeSession, getUsers);
router.get("/:id/get-user", authorizeSession, getUser);

module.exports = router;
