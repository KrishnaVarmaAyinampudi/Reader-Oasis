const BookModel = require("../models/books");
const S3 = require("../s3");
const addBook = async (req, res) => {
    try {
        const response = await S3.uploadFile(process.env.AWS_BUCKET_NAME,req.files.bookImage[0]) ; 
        const { bookName, authorName, isbnNumber, publishedDate,description } = req.body;
        const book = new BookModel({
            bookName,
            authorName,
            isbnNumber,
            publishedDate,
            bookImage: response.Location,
            description
        });
        await book.save();
        res.status(201).json({ message: "Book added successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}



module.exports = {
    addBook,
    fetchAllBooks,
}

