import React from 'react';
import './bookCard.css'; // Make sure to create and import the corresponding CSS file

const BookCard = ({ title, author, publishedDate, imageUrl }) => {
    return (
        <div className="book-card">
            <div className="book-image">
            <img src={imageUrl} alt={title.toUpperCase()} />
            </div>
            <div className="book-info">
                <h3>{title}</h3>
                <p className="author">{author}</p>
            </div>
        </div>
    );
};

export default BookCard;
