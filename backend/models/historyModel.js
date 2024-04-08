const mongoose = require("mongoose")


const HistorySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", 
        required: true
    },
    items: [{
        bookId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Books",
            required: true
        },
        bookName: {
            type: String,
            required: true
        },
        authorName: {
            type: String,
            required: true
        },
        isbnNumber: {
            type: String,
            required: true
        },
        publishedDate: {
            type: String
        },
        bookImage: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true })

module.exports = mongoose.model("Histories", HistorySchema)