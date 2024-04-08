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

const fetchAllBooks = async (req, res) => {
    try {
        const books = await BookModel.find({}).sort({ publishedDate: -1 });
        console.log(books);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getBookSuggestions = async (req, res) => {
    try {
        console.log(req.query);
        const { searchQuery } = req.params;
        const books = await BookModel.find({
            $or: [
                { bookName: { $regex: searchQuery, $options: "i" } },
                { authorName: { $regex: searchQuery, $options: "i" } },
                // Add more fields to search here if needed
            ]
        }).select("bookName");
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await BookModel.findById(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addBook,
    fetchAllBooks,
    getBookSuggestions
}

