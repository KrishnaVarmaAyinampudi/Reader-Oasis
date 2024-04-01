import React,{useEffect,useState} from 'react';
import { useParams, Link } from 'react-router-dom';

import { IoNotifications } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import "./Home.css"
import BookCard from '../../Components/BookCard/BookCard';
import axios from 'axios';


const Home = () => {

    const { userName } = useParams();

    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try{
                const res = await axios.get("http://localhost:3002/librarian/fetchAllBooks");
                setBooks(res.data);
                console.log(res.data)
            }catch(error){
                console.log(error);
            }
        }
        fetchBooks();
    }, []);
    


    return (
        <div className='layout'>
        <div className='bg-img'>
            
        </div>
            <div className="content">
                <div className="home-header">
                
                <h3> Lists of Books</h3>
                    
                
                        
                        <div className='header-user' >
                        
                        <FaRegUser 
                                size={20}
                            />
                            <p>{userName}</p>
                        </div>
                    
                </div>

                
  
                <div className="book-cards-container">
                    {books.map((book) => (
                        <div className='book-cards'>
                        <BookCard
                        id={book._id}
                            key={book.id}
                            title={book.bookName}
                            author={book.authorName}
                            imageUrl={book.bookImage}
                        />
                        
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
