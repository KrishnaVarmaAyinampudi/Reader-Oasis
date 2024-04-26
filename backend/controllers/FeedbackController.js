const BookModel = require("../models/books");

//function for feedback request and response
async function sendFeedback(req, res) {
    try {
        const { bookId, userId, feedback, rating } = req.body;

        // Check if all required fields are present
        if (!bookId || !userId || !feedback || !rating) {
            return res.status(200).json({ message: "bookId, userId, feedback, and rating are required fields" });
        }

        // Check if the book exists
        const existingBook = await BookModel.findById(bookId);
        if (!existingBook) {
            return res.status(200).json({ message: "Book not found" });
        }

        //Check if the user has already submitted feedback for this book
        const hasSubmittedFeedback = existingBook.feedbacksArray.some(entry => entry.userId.toString() === userId);
        if (hasSubmittedFeedback) {
            return res.status(200).json({ alreadySubmitted: "You have already submitted feedback for this book" });
        }

        // Add the feedback and rating to the book's feedbacksArray
        existingBook.feedbacksArray.push({ userId, feedback, rating });
        await existingBook.save();

        res.status(200).json({ fbSubmitted: "Feedback submitted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = {
    sendFeedback
};
