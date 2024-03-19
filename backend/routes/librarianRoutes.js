const express = require("express");
const router = express.Router();

const {bookUpload} = require("../multer");

const librarianController = require("../controllers/librarianControllers");

router.post("/addBook/:isbnNumber",bookUpload,librarianController.addBook );
router.get("/fetchAllBooks",librarianController.fetchAllBooks );
router.get("/getBookSuggestions/:searchQuery",librarianController.getBookSuggestions );
module.exports = router;