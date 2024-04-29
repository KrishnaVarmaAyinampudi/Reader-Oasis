import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import BrowserRouter

import Login from './pages/login/login';
import SignUp from './pages/SignUp/SignUp';
import Home from './pages/Home/Home';
import SideBarLayout from './Layout/SideBarLayout/SideBarLayout';
import Cart from './pages/Cart/Cart';
import SingleBook from './pages/SingleBook/SingleBook';
import ReservedBooks from './pages/ReservedBooks/ReservedBooks';
import SubmittedBooks from './pages/SubmittedBooks/SubmittedBooks';
import AddPublication from './pages/AddPublication/AddPublication';




function App() {
  return (
    <Router> 
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        
        {/* SidebarLayout and its child routes */}
        <Route path="/app/:userName" element={<SideBarLayout />}>
          <Route index element={<Home />} />
          
          <Route path="book/:id" element={<SingleBook/>} />
          <Route path='books-cart' element={<Cart/>} />
          <Route path='reserved-history' element={<ReservedBooks/>} />
          <Route path='submitted-history' element={<SubmittedBooks/>} />
          <Route path='publication' element={<AddPublication/>} />
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
