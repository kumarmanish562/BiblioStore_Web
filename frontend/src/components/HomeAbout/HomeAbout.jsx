// React import for component functionality
import React from 'react'
// Import styled components and classes from the dummy styles file
import { homeAboutStyles as s } from '../../assets/dummystyles'
// Import about section image asset
import HomeAboutImage from '../../assets/HomeAboutImage.png'
// Import data arrays for featured books and statistics
import { featuredBooks, hastats } from '../../assets/dummydata'
// React Router Link component for navigation
import {Link } from 'react-router-dom'
// Arrow icon from Lucide React for buttons and links
import { ArrowRight } from 'lucide-react'

/**
 * HomeAbout Component
 * Displays the about section on the home page with company information,
 * statistics, and featured books collection
 */
const HomeAbout = () => {
  return (
    // Main wrapper container for the about section
    <div className={s.wrapper}>
      {/* Background decorative blur effects */}
      <div className=' absolute inset-0 overflow-hidden'>
        {/* First decorative blur element */}
        <div className={s.bgBlur1}></div>
        {/* Second decorative blur element */}
        <div className={s.bgBlur2}></div>
      </div>
      
      {/* Main content container */}
      <div className={s.container}>
        {/* About section grid layout */}
        <div className={s.aboutGrid}>
          {/* Left side - Image section */}
          <div className={s.imageWrapper}>
            {/* Glow effect behind the image */}
            <div className={s.imageGlow}></div>
            {/* Image container */}
            <div className={s.imageContainer}>
              {/* About section main image */}
              <img src={HomeAboutImage} alt='about image' className={s.aboutImage} />
            </div>
          </div>
          
          {/* Right side - Text content and information */}
          <div className=' space-y-8'>
            {/* Section header */}
            <div>
              <h2 className={s.aboutHeader}> Our Literary Journey </h2>
              {/* Decorative underline */}
              <div className={s.underline}> </div>
            </div>
            
            {/* About description text */}
            <p className={s.aboutText}> 
              Welcome to our bookstore, where every page turned is a step into a new world. Our journey began with a simple love for stories and a desire to share that passion with others. <br/>
              From the moment we opened our doors, we have been dedicated to curating a collection of books that inspire, entertain, and educate. 
            </p>
            
            {/* Statistics grid displaying company metrics */}
            <div className={s.statGrid}>
              {/* Map through statistics data to display each stat */}
              {hastats.map((stat, index) => (
                <div key={index} className={s.statCard}>
                  {/* Icon wrapper for statistic */}
                  <div className={s.statIconWrap}>
                    {/* Dynamic icon component from stat data */}
                    <stat.icon  className={s.statIcon}/>
                  </div>
                  {/* Statistic value (number) */}
                  <h3 className={s.statValue}>{stat.value}</h3>
                  {/* Statistic label (description) */}
                  <p className={s.statLabel}> {stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* Call-to-action button linking to about page */}
            <Link to='/about' className={s.aboutButton}>
              <span>Learn More About Us</span>
              {/* Arrow icon for visual indication */}
              <ArrowRight className={s.arrowIcon} />
            </Link>
          </div>
        </div>
        
        {/* Featured Books Section */}
        {/* Section header for featured books */}
        <div className='mb-12 text-center'>
          <h2 className={s.sectionHeader}>Legendary Volumes</h2>
          {/* Decorative underline for section header */}
          <div className={s.headerUnderline}> </div>
          {/* Section description */}
          <p className={s.headerText}>
            Explore our collection of timeless classics and modern masterpieces that have shaped the literary world. 
          </p>
        </div>
        
        {/* Featured books grid layout */}
        <div className={s.bookGrid}>
          {/* Map through featured books data to display each book */}
          {featuredBooks.map((book, index) => (
            <div className={s.bookCardWrap} key={index}>
              {/* Glow effect behind each book card */}
              <div className={s.bookCardGlow}> </div>

              {/* Individual book card */}
              <div className={s.bookCard}>
                {/* Book cover image wrapper */}
                <div className={s.bookImageWrapper}>
                  {/* Book cover image */}
                  <img src={book.image} alt={book.title} className={s.bookImage} />
                </div>
                
                {/* Book information content */}
                <div className={s.bookContent}>
                  {/* Book title */}
                  <h3 className={s.bookTitle}>{book.title}</h3>
                  {/* Book author */}
                  <p className={s.bookAuthor}>{book.author}</p>
                  {/* Book description */}
                  <p className={s.bookDesc}>{book.description}</p>
                  
                  {/* Link to books page for more details */}
                  <Link to="/books" className={s.discoverLink}>
                    <span> Discover More</span>
                    {/* Small arrow icon for link indication */}
                    <ArrowRight className={s.arrowSmall} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Export component for use in other parts of the application
export default HomeAbout