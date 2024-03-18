const express = require("express");
const router = express.Router();

const { createLibrarianAccount } = require("../controllers/authControllers");

router.post("/create-librarain-account", createLibrarianAccount);

router.post("/librarian-login",librarianLogin)


module.exports = router;