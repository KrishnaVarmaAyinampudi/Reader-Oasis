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

async function getHistory(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const booksHistory = await History.findOne({ userId });

        if (!booksHistory) {
            return res.status(404).json({ message: "History not found" });
        }

        return res.json({ booksHistory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

async function getReserved(req, res) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ message: "userId is required" });
        }

        const booksReserved = await Reserved.findOne({ userId }).populate("items.bookId");

        if (!booksReserved) {
            return res.status(200).json({ message: "Reserved not found" });
        }

        return res.json({ booksReserved });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

async function getAllReserved(req, res) {
    try {
        const allReserved = await Reserved.find().populate("items.bookId").populate("userId", "-password");

        if (!allReserved) {
            return res.status(200).json({ noReservedFound: "Reserved not found" });
        }

        return res.json({ allReserved });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
}

async function deleteBookFromReserved(req, res) {
    try {
        const { userId, _id } = req.body;

        if(!userId || !_id)
        {
            return res.json("userId and _id are required")
        }

        const reserved = await Reserved.findOne({ userId });

        if (!reserved) {
            return res.status(200).json({ notFoundReservation: "Reservation not found for the user" });
        }

        reserved.items = reserved.items.filter(item => item._id.toString() !== _id);

        await reserved.save();

        return res.status(200).json({ deletedFromReserved: "Book removed from reservation successfully" });
    } 
    
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: error.message });
    }
}




module.exports = {
    addToHistory,
    getHistory
};
 

