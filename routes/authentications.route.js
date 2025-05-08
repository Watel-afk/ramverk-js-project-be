const express = require("express");
const router = express.Router();
const { login, logout } = require("../controllers/authentication.controller");
const { authorizeSession } = require("../manager/authorization.manager.js");

router.post("/login", login);
router.post("/logout", authorizeSession, logout);

module.exports = router;
