import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader'; // Import the Loader component
import Design from "./History.module.css";

const History = () => {
  const [historyBooks, setHistoryBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`http://localhost:3002/history/books-history/${userId}`);
        setHistoryBooks(res.data.booksHistory.items || []);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory();
  }, [userId]);

  return (
    <div className={Design.historyContainer}>
      <h2>History</h2>
      {loading ? (
        <Loader /> // Show loader component while loading
      ) : (
        <>
          {historyBooks.length === 0 && <p>Your history is empty</p>}
          <div className={Design.bookCard}>
            {historyBooks.map((book, index) => (
              <div key={index}>
                <div className={Design.historyDetails}>
                  
                  <div className={Design.relative}>
                  <img src={book.bookImage} alt={book.bookName} />
                  <div className={Design.absolute}>
                  
                  <h3 className={Design.bookName}> {book.bookName}</h3>
                 
                 </div>
                 </div>
<div className={Design.pTags}>
                  <p className={Design.Author}><span>Author :</span> {book.authorName}</p>
                  <p className={Design.isbn}><span>ISBN :</span> {book.isbnNumber}</p>
                </div>
              </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default History;
