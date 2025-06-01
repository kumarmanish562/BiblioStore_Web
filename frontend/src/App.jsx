import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import About from './pages/About/About';
import Book from './pages/Book/Book';
import Contact from './pages/Contact/Contact';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path='/about' element={<About />} />
      <Route path="/book" element={<Book />} />
      <Route path="/contact" element={<Contact />} />

      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default App;