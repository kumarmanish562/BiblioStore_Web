import React from 'react'
import Navbar from  "../../components/Navbar/Navbar"
import Banner from '../../components/Banner/Banner'
import OurBestSellers from '../../components/OurBestSellers/OurBestSellers'
import HomeAbout from '../../components/HomeAbout/HomeAbout'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <>
    <Navbar />
    <Banner />
    <OurBestSellers />
    <HomeAbout />
    <Footer />
    </>
  )
}

export default Home