const express = require("express");
const router = express.Router();
const { authorizeSession } = require("../manager/authorization.manager.js");
const {
  addBalance,
  changePassword,
  createUser,
  getUsers,
  getCurrentUserEndpoint,
} = require("../controllers/users.controller");
const { asyncWrapper } = require("../utils/utils");

router.post("/add-balance", authorizeSession, asyncWrapper(addBalance));
router.post("/change-password", authorizeSession, asyncWrapper(changePassword));
router.post("/create-user", asyncWrapper(createUser));
router.get("/get-users", authorizeSession, asyncWrapper(getUsers));
router.get(
  "/get-current-user",
  authorizeSession,
  asyncWrapper(getCurrentUserEndpoint)
);

module.exports = router;
