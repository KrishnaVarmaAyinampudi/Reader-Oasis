const History = require("../models/HistoryModel");



async function addToHistory(req, res) {
    try {
        const { userId, bookId, bookName, authorName, isbnNumber, 
            publishedDate, bookImage, description } = req.body;

        if (!userId || !bookId) {
            return res.status(400).json({ message: "userId and bookId are required" });
        }

        let booksHistory = await History.findOne({ userId });

        if (!booksHistory) {
            booksHistory = new History({
                userId,
                items: [{ bookId, bookName, authorName, isbnNumber, 
                    publishedDate, bookImage, description }]
            });
        } 
        
        else {
            // Check if the bookId already exists in the history
            const existingBookIndex = booksHistory.items.findIndex(item => item.bookId.toString() === bookId);
            if (existingBookIndex !== -1) {
                return res.status(200).json({ alreadyReserved: "Book already added to history" });
            }

            booksHistory.items.push({ bookId, bookName, authorName, isbnNumber, 
                publishedDate, bookImage, description });
        }

        await booksHistory.save();
        return res.json({ booksHistory, reserved: "This book is reserved for you" });
    } 
    
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

