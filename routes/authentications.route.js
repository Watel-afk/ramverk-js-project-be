const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authentication.controller");
const { authorizeSession } = require("../manager/authorization.manager.js");
const { asyncWrapper } = require("../utils/utils");

router.post("/login", asyncWrapper(login));
router.post("/logout", authorizeSession, asyncWrapper(logout));

module.exports = router;
