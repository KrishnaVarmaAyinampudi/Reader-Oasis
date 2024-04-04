import './App.css';
import {  Routes, Route, Navigate } from 'react-router-dom';
import Login from "./pages/login/login"
import Signup from "./pages/signup/signup"
import Home from "./pages/home/home.jsx"
import AddBooks from './pages/addBooks/addBooks.jsx'

import SidebarLayout from './layout/sidebarLayout.jsx';

function App() {
  return (
    <>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Navigate replace to="/login" />} />
        
        {/* SidebarLayout and its child routes */}
        <Route path="/app/:userName" element={<SidebarLayout />}>
          <Route index element={<Home />} />
          <Route path="add-books" element={<AddBooks />} />
        </Route>
    </Routes>
    </>
  );
}

export default App;
