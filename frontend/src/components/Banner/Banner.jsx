// React imports for hooks and component functionality
import React, { useEffect, useState } from 'react'
// Import styled components and classes from the dummy styles file
import {
  container,
  formContainer,
  geometricOverlay,
  glassBox,
  headerText,
  imageSection,
  imageStyle,
  imageWrapper,
  inputField,
  inputWrapper,
  overlayEffect,
  paragraphText,
  scrollText,
  scrollTextSection,
  searchButton,
  statBox,
  statLabel,
  statNumber,
  statsContainer,
  subHeader
} from '../../assets/dummystyles'

// React Router hook for programmatic navigation
import { useNavigate } from 'react-router-dom';
// Search icon from Lucide React icon library
import { Search } from 'lucide-react';
// Array of words for the rotating text animation
import { words } from '../../assets/dummydata';
// Banner image asset
import img from '../../assets/banner1.png';

/**
 * Banner Component
 * Hero section with search functionality, statistics display, and decorative elements
 * Features a glass morphism design with animated background elements
 */
const Banner = () => {
  // State to manage the search input value
  const [searchQuery, setSearchQuery] = useState('');
  // State to track current word index for rotation animation
  const [currentWord, setCurrentWord] = useState(0);

  // Hook for programmatic navigation to search results
  const navigate = useNavigate();

  // Effect to rotate through words array every 2 seconds
  useEffect(() => {
    // Set up interval to cycle through words
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000); // Change word every 2 seconds
    
    // Cleanup function to clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array - runs once on mount

  /**
   * Handle search form submission
   * Navigates to books page with search query parameter
   * @param {Event} e - Form submission event
   */
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent default form submission
    if (searchQuery.trim()) {
      // Navigate to books page with encoded search query
      navigate(`/books?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    // Main container with styling from imported styles
    <div className={container}>
      {/* Glass morphism container */}
      <div className={glassBox}>
        {/* Geometric overlay with decorative background elements */}
        <div className={geometricOverlay}>
          {/* Decorative blurred shapes for visual appeal */}
          {/* Top-right decorative blur effect */}
          <div className="absolute -top-10 -right-10 md:-top-20 md:-right-20 w-48 h-48 md:w-96 md:h-96 bg-[#F8FFAE]/10 rounded-full blur-xl md:blur-3xl" />
          {/* Bottom-left decorative blur effect */}
          <div className="absolute -bottom-20 -left-10 md:-bottom-40 md:-left-20 w-40 h-40 md:w-80 md:h-80 bg-[#43C6AC]/10 rounded-full blur-xl md:blur-3xl" />
        </div>

        {/* Main content grid - 2 columns on large screens */}
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left column - Text content and functionality */}
          <div className="space-y-6 md:space-y-8">
            {/* Header section with title and description */}
            <div className="space-y-4 md:space-y-6">
              {/* Main heading with gradient text effect and rotating word */}
              <h1 className={headerText}>
                {/* "MindFul" with gradient color effect */}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2B5876] to-[#43C6AC]">
                  MindFul
                </span>
                <br />
                <span className={subHeader}>
                  {/* Use the rotating word here */}
                  {words[currentWord]} Experiences
                </span>
              </h1>
              {/* Platform description paragraph */}
              <p className={paragraphText}>
                Discover a world of knowledge with MindFul, your go-to platform for reading and sharing insightful articles. Whether you're looking to expand your horizons or share your own thoughts, MindFul is here to enhance your reading journey.
              </p>
            </div>

            {/* Search functionality form */}
            <form onSubmit={handleSearch} className="space-y-6 md:space-y-8">
              <div className={formContainer}>
                {/* Search input wrapper with background styling */}
                <div className={inputWrapper}>
                  {/* Semi-transparent background overlay */}
                  <div className="absolute inset-0 bg-white/90 md:rounded-xl shadow-sm" />
                  {/* Input field container with search icon */}
                  <div className="relative flex items-center">
                    {/* Search icon with dynamic color on focus */}
                    <Search className="ml-4 md:ml-5 w-5 h-5 md:w-6 md:h-6 text-gray-600 group-focus-within:text-[#2B5876]" />
                    {/* Search input field */}
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search Author, Article, or Concept..."
                      className={inputField}
                    />
                  </div>
                </div>
                {/* Search submit button */}
                <button type="submit" className={searchButton}>
                  <Search className="w-4 h-4 md:w-5 md:h-5" />
                  {/* Screen reader only text for accessibility */}
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </form>

            {/* Statistics section displaying platform metrics */}
            <div className={statsContainer}>
              {/* Map through statistics array to display each stat */}
              {[
                { number: '1000+', label: 'Articles' },
                { number: '500+', label: 'Authors' },
                { number: '200+', label: 'Topics' },
              ].map((stat, i) => (
                // Individual statistic box
                <div className={statBox} key={i}>
                  {/* Large number display */}
                  <div className={statNumber}>{stat.number}</div>
                  {/* Descriptive label */}
                  <div className={statLabel}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Image section */}
          <div className={imageSection}>
            <div className={imageWrapper}>
              {/* Banner image */}
              <img src={img} alt="Image Banner" className={imageStyle} />
              {/* Overlay effect for image styling */}
              <div className={overlayEffect} />
            </div>
          </div>
        </div>

        {/* Footer section with scrolling text */}
        <div className={scrollTextSection}>
          <div className={scrollText}>
            {/* Static scrolling text with bullet separators */}
            Curated Collection • Award-Winning Authors • Critical Analysis • Cultural Perspective • Trending Topics
          </div>
        </div>
      </div>
    </div>
  );
}

// Export component for use in other parts of the application
export default Banner;