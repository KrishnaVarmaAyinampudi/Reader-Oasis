const express = require("express");
const router = express.Router();

const {bookUpload} = require("../multer");

const librarianController = require("../controllers/librarianControllers");

router.post("/addBook/:isbnNumber",bookUpload,librarianController.addBook );

module.exports = router;