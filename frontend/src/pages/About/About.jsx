import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import AboutP from '../../components/AboutP/AboutP'

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
    <Navbar/>
    <AboutP/>
    <Footer/>
    </>
  )
}

export default About