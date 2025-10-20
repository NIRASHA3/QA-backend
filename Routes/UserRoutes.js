const express = require("express");

const { loginUser } = require("../Controllers/LoginController");
const {registerAdder } = require("../Controllers/AdminAddController");
const {getAllAdders } = require("../Controllers/AdminDisplayController");
const authenticateToken = require('../Auth/auth');

const router = express.Router();


router.post("/login", loginUser);
router.post("/add", registerAdder);

router.get("/admin-display", getAllAdders);

module.exports = router;

