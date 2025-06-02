import React, { useEffect } from 'react'
import Navbar from  "../../components/Navbar/Navbar"
import Banner from '../../components/Banner/Banner'
import OurBestSellers from '../../components/OurBestSellers/OurBestSellers'
import HomeAbout from '../../components/HomeAbout/HomeAbout'
import Footer from '../../components/Footer/Footer'
import HomeBook from '../../components/HomeBook/HomeBook'

const Home = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
    <Navbar />
    <Banner />
    <OurBestSellers />
    <HomeBook/>
    <HomeAbout />
    <Footer />
    </>
  )
}

export default Home