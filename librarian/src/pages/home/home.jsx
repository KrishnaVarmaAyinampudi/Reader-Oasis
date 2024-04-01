import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/searchbar/searchbar';

import { IoNotifications } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

import './home.css'; 

import BookCard from '../../components/bookCard/bookCard';
import axios from '../../axios/axios';



const Home = () => {

    const { userName } = useParams();

    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState(''); 

    useEffect(() => {
        const fetchBooks = async () => {
            try{
                const res = await axios.get("/librarian/fetchAllBooks");
                setBooks(res.data);
                console.log(res.data)
            }catch(error){
                console.log(error);
            }
        }
        fetchBooks();
    }, []);
    const handleSearchChange = (searchValue) => {
        setSearchTerm(searchValue);
    };


    return (
        <div className='layout'>
            <div className="addbook-content">
                <div className="home-header">
                    <SearchBar onSearch={handleSearchChange} books = {books} />
                    <div className="home-header-right">
                        <IoNotifications 
                            size={20}
                        />
                        <div className='header-user' >
                            <FaRegUser 
                                size={20}
                            />
                            <p>{userName}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Recently Added</h3>
                </div>
                <div className="book-cards-container">
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
                            title={book.bookName}
                            author={book.authorName}
                            imageUrl={book.bookImage}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
