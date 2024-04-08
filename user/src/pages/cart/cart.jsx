import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../../Components/Loader/Loader'; // Import the Loader component
import "./Cart.css";
import PopUp from '../../Components/Popups/Popup';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const userId = localStorage.getItem("userId");
  
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [popUpText, setPopUpText] = useState("");

  async function fetchCartItems() {
    try { // Set loading to true before fetching data
      const res = await axios.get(`http://localhost:3002/cart/get-cart/${userId}`);
      setCartItems(res.data.items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false); // Set loading to false after data is fetched or error occurs
    }
  }

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const removeFromCart = async (bookId) => {
    try {
      setLoading(true); // Set loading to true when removing from cart
      const response = await axios.post('http://localhost:3002/cart/remove-from-cart', { userId, bookId });
      console.log(response.data);
      setPopUpText("Removed from the cart")
      setIsPopUpOpen(true)
      fetchCartItems();
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false); // Set loading to false after removing from cart
    }
  };
  
  const reserveBook = async (bookId, bookDetails) => {
    try {
      setLoading(true); // Set loading to true when reserving book
      
      // Call the endpoint to add the book to history
      const reserveResponse = await axios.post('http://localhost:3002/history/add-to-history', { 
        userId, 
        bookId,
        bookName: bookDetails.bookName,
        authorName: bookDetails.authorName,
        isbnNumber: bookDetails.isbnNumber,
        publishedDate: bookDetails.publishedDate,
        bookImage: bookDetails.bookImage,
        description: bookDetails.description
      });

      const removeResponse = await axios.delete(`http://localhost:3002/librarian/remove-book/${bookId}`);
      console.log(removeResponse.data);
       
      fetchCartItems();
      
      if(reserveResponse.data.alreadyReserved) {
        setPopUpText("This book is already reserved for you")
        setIsPopUpOpen(true);
        console.log(reserveResponse.data);
      } else {
        setPopUpText("This Book is reserved for you");
        setIsPopUpOpen(true);
        console.log(reserveResponse.data);
      }

    } catch (error) {
      console.error('Error reserving book:', error);
      alert("book reserved");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className='cart-container'>
      <div className='cart-img'></div>
      <h2>Shopping Cart</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className='cart-division'>
          <div className='cartitems-format-main cart-headings'>
            <h3>Book</h3>
            <h3>Name</h3>
            <h3>Author</h3>
            <h3>Remove</h3>
          </div>
          <hr className='cart-hr'/>
          {cartItems.map((item, index) => (
            <div key={index} >
              {item.bookId && ( 
                <div className="cartitems-format-main cart-items-format" >
                  <div className="relative">
                    {item.bookId.bookImage && ( 
                      <img src={item.bookId.bookImage} alt={item.bookId.bookName}/>
                    )}
                    <div className="absolute">
                      <button onClick={() => reserveBook(item.bookId._id, item.bookId)}>Reserve</button>
                    </div>
                  </div>
                  {item.bookId.bookName && ( 
                    <p>{item.bookId.bookName}</p>
                  )}
                  {item.bookId.authorName && ( 
                    <p>{item.bookId.authorName}</p>
                  )}
                  <button className="remove-button" onClick={() => removeFromCart(item.bookId._id)}>X</button>
                </div>
              )}
              <hr className='bottom-hr'/>
            </div>
          ))}
        </div>
      )}
      {cartItems.length === 0 && !loading && <p className='empty-cart'>Cart is empty</p>}
      <PopUp
        isOpen={isPopUpOpen}
        close={() => setIsPopUpOpen(false)}
        text={popUpText}
      />
    </div>
  );
}  

export default Cart;
