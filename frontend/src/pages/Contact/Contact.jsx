import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ContactP from '../../components/ContactP/ContactP'

const Contact = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <Navbar />  
    <ContactP />
    <Footer />
    </>
    
  )
}

export default Contact