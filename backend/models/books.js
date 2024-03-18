const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    authorName: {
        type: String,
        required: true,
        index: true
    },
    isbnNumber: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    bookImage: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    feedback:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback"
        }
    ]
},{ timestamps: true })

module.exports = mongoose.model("Books", bookSchema);