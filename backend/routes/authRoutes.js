const express = require("express");
const router = express.Router();

const { createLibrarianAccount } = require("../controllers/authControllers");

router.post("/create-librarain-account", createLibrarianAccount);


module.exports = router;