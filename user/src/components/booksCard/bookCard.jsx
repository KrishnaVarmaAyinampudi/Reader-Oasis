import React from 'react';
import "./BookCard.css"
import { Link, useParams } from 'react-router-dom';




const BookCard = ({ title, author, imageUrl, id }) => {

    const { userName } = useParams();

    return (
        <div className="book-card">

            <div className="book-image">
            <Link className='link' to={`/app/${userName}/book/${id}`}>
            <img src={imageUrl} alt={title.toUpperCase()} />
            </Link>
<div className='book-title'>
            <h3 >{title}</h3>
            <p><span>Author :</span> {author}</p>

</div>
            </div>

            <div className="book-info">
            </div>
        </div>
    );
};

export default BookCard;
