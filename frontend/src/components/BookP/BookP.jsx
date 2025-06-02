// React imports for hooks and component functionality
import React, { useState } from 'react';
// Icon components from Lucide React
import { ShoppingBag, Plus, Minus, Star, Search } from "lucide-react"
// React Router hook for accessing URL location
import { useLocation } from "react-router-dom"
// Import styled components and classes from the dummy styles file
import { booksPageStyles as styles } from '../../assets/dummystyles';
// Custom cart context hook for cart functionality
import { useCart } from '../../CartContext/CartContext';

// Import book cover images
import BP1 from "../../assets/Book1.png";
import BP2 from "../../assets/Book2.png";
import BP3 from "../../assets/Book3.png";
import BP4 from "../../assets/Book4.png";
import BP5 from "../../assets/Book5.png";
import BP6 from "../../assets/Book6.png";
import BP7 from "../../assets/Book7.png";
import BP8 from "../../assets/Book8.png";
import BP9 from "../../assets/BP9.png";
import BP10 from "../../assets/BP10.png";
import BP11 from "../../assets/BP11.png";
import BP12 from "../../assets/BP12.png";
import BP13 from "../../assets/BP13.png";
import BP14 from "../../assets/BP14.png";
import BP15 from "../../assets/BP15.png";
import BP16 from "../../assets/BP16.png";

/**
 * BookP Component
 * Main books catalog page with search, filter, sort, and cart functionality
 * Features comprehensive book browsing experience with dynamic filtering and cart management
 */
const BookP = () => {
  // Get cart state and dispatch function from cart context
  const { cart, dispatch } = useCart();
  // Get current location for URL parameter handling
  const location = useLocation();

  // Extract search parameter from URL query string
  const queryParams = new URLSearchParams(location.search);
  const searchFromUrl = queryParams.get("search") || "";

  // State for search functionality
  const [searchTerm, setSearchTerm] = useState(searchFromUrl);
  // State for sorting books
  const [sortBy, setSortBy] = useState("title");
  // State for filtering books by category
  const [filterCategory, setFilterCategory] = useState("all");

  /**
   * Books data array containing all available books
   * Each book has: id, image, title, author, price, rating, category, description
   */
  const books = [
    { id: 1, image: BP1, title: "The Silent Echo", author: "Sarah Mitchell", price: 205, rating: 4.5, category: "Mystery", description: "A haunting tale of secrets and revelations that echo through time." },
    { id: 2, image: BP2, title: "Digital Fortress", author: "James Cooper", price: 190, rating: 4.2, category: "Thriller", description: "In the age of digital warfare, no secret is safe from discovery." },
    { id: 3, image: BP3, title: "The Last Orbit", author: "Emily Zhang", price: 202, rating: 4.7, category: "Sci-Fi", description: "Humanity's final journey among the stars holds unexpected truths." },
    { id: 4, image: BP4, title: "Beyond the Stars", author: "Michael Chen", price: 209, rating: 4.3, category: "Sci-Fi", description: "An epic space odyssey that challenges our understanding of existence." },
    { id: 5, image: BP5, title: "Mystic River", author: "Dennis Lehane", price: 180, rating: 4.8, category: "Drama", description: "A powerful story of friendship, trauma, and the price of secrets." },
    { id: 6, image: BP6, title: "The Alchemist", author: "Paulo Coelho", price: 160, rating: 4.9, category: "Philosophy", description: "A mystical journey of self-discovery and the pursuit of dreams." },
    { id: 7, image: BP7, title: "Atomic Habits", author: "James Clear", price: 203, rating: 4.6, category: "Self-Help", description: "Transform your life through the power of tiny, consistent changes." },
    { id: 8, image: BP8, title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 219, rating: 4.4, category: "Psychology", description: "Explore the two systems that drive the way we think and make decisions." },
    { id: 9, title: "The Design Of Books", author: "Debbie Bern", price: 379, description: "A Gothic tale of science gone wrong and its consequences...", image: BP9 },
    { id: 10, title: "The Crossing", author: "Jason Mott", price: 425, description: "A psychological exploration of guilt and redemption...", image: BP10 },
    { id: 11, title: "The Phoenix Of Destiny", author: "Geronimo Stilton", price: 499, description: "A fantasy adventure through Middle-earth...", image: BP11 },
    { id: 12, title: "The Author", author: "Raj Siddhi", price: 399, description: "A dystopian vision of a scientifically engineered society...", image: BP12 },
    { id: 13, title: "The Doctor", author: "Oscar Patton", price: 549, description: "An epic journey through Hell, Purgatory, and Paradise...", image: BP13 },
    { id: 14, title: "Darkness Gathers", author: "Emma Elliot", price: 325, description: "A turbulent story of passion and revenge on the Yorkshire moors...", image: BP14 },
    { id: 15, title: "Gitanjali", author: "RabindraNath Tagore", price: 449, description: "The epic poem about the Trojan War and Achilles' rage...", image: BP15 },
    { id: 16, title: "The Unwilling", author: "John Hart", price: 399, description: "The adventures of a nobleman who imagines himself a knight...", image: BP16 }
  ]

  /**
   * Check if a book is already in the cart
   * @param {number} id - Book ID to check
   * @returns {boolean} True if book is in cart, false otherwise
   */
  const isInCart = (id) => cart?.items?.some(item => item.id === id && item.source === "booksPage")
  
  /**
   * Get quantity of a specific book in cart
   * @param {number} id - Book ID to check quantity for
   * @returns {number} Quantity of book in cart, 0 if not in cart
   */
  const getCartQuantity = (id) => cart?.items?.find(item => item.id === id && item.source === "booksPage")?.quantity || 0

  /**
   * Add a book to cart with initial quantity of 1
   * @param {Object} book - Book object to add to cart
   */
  const handleAddToCart = (book) => dispatch({ 
    type: "ADD_ITEM", 
    payload: { ...book, quantity: 1, source: "booksPage" } 
  })
  
  /**
   * Increment quantity of a book in cart
   * @param {number} id - Book ID to increment
   */
  const handleIncrement = (id) => dispatch({ 
    type: "INCREMENT", 
    payload: { id, source: "booksPage" } 
  })
  
  /**
   * Decrement quantity of a book in cart
   * @param {number} id - Book ID to decrement
   */
  const handleDecrement = (id) => dispatch({ 
    type: "DECREMENT", 
    payload: { id, source: "booksPage" } 
  })

  /**
   * Filter books based on category and search term
   * Searches through title and author fields
   */
  const filteredBooks = books.filter(book => {
    // Check if book matches selected category
    const matchCategory = filterCategory === "all" || book.category === filterCategory;
    // Convert search term to lowercase for case-insensitive search
    const lowerSearchTerm = searchTerm.toLowerCase();
    // Check if book title or author contains search term
    const matchSearch = searchTerm === "" || 
      book.title.toLowerCase().includes(lowerSearchTerm) || 
      book.author.toLowerCase().includes(lowerSearchTerm);
    return matchCategory && matchSearch;
  });

  /**
   * Sort filtered books based on selected sort criteria
   * Available sorts: title (alphabetical), price (low/high), rating (highest first)
   */
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low": 
        return a.price - b.price;
      case "price-high": 
        return b.price - a.price;
      case "rating": 
        return b.rating - a.rating;
      default: 
        // Sort alphabetically by title
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base', numeric: true });
    }
  });

  /**
   * Extract unique categories from books data for filter dropdown
   * Includes 'all' option plus all unique categories
   */
  const categories = ['all', ...new Set(books.map(book => book.category).filter(Boolean))];

  return (
    // Main container for the books page
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        {/* Page header with title and subtitle */}
        <div className={styles.headerWrapper}>
          <h1 className={styles.headerTitle}>Literary universe</h1>
          <p className={styles.headerSubtitle}>
            Explore our collection of books, from timeless classics to contemporary masterpieces
          </p>
        </div>
        
        {/* Search and filter controls section */}
        <div className={styles.searchWrapper}>
          {/* Search input with icon */}
          <div className={styles.searchInputWrapper}>
            <div className={styles.searchIconWrapper}>
              <Search className='h-5 w-5 md:h-6 md:w-6 text-gray-500 group-focus-within:text-[#43C66AC]' />
            </div>
            <input 
              type="text" 
              placeholder='Search by title or author...'
              className={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)} 
            />
          </div>

          {/* Filter and sort controls row */}
          <div className={styles.filterRow}>
            <div className={styles.selectGroup}>
              {/* Category filter dropdown */}
              <select 
                value={filterCategory} 
                onChange={(e) => setFilterCategory(e.target.value)} 
                className={styles.selectBox}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Genres" : category}
                  </option>
                ))}
              </select>
              
              {/* Sort options dropdown */}
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)} 
                className={styles.selectBox}
              >
                <option value="title">Sort by Title</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Top Rating</option>
              </select>
            </div>

            {/* Results count display */}
            <div className={styles.resultText}>
              showing {sortedBooks.length} results
            </div>
          </div>
        </div>

        {/* Books grid displaying filtered and sorted books */}
        <div className={styles.booksGrid}>
          {sortedBooks.map((book) => {
            // Check cart status for current book
            const inCart = isInCart(book.id);
            const qty = getCartQuantity(book.id);

            return (
              // Individual book card
              <div key={book.id} className={styles.bookCard}>
                {/* Book cover image */}
                <div className={styles.imageWrapper}>
                  <img src={book.image} alt={book.title} className={styles.imageStyle} />
                </div>
                
                {/* Book title */}
                <h3 className={styles.title}>{book.title}</h3>
                
                {/* Book author */}
                <p className={styles.author}>by {book.author}</p>

                {/* Star rating display */}
                <div className={styles.ratingWrapper}>
                  {/* Render filled stars based on rating */}
                  {[...Array(Number.isFinite(book.rating) ? Math.floor(book.rating) : 0)].map((_, index) => (
                    <Star key={index} className='w-4 h-4 fill-yellow-500 stroke-yellow-200' />
                  ))}
                  {/* Display numeric rating */}
                  <span>({Number.isFinite(book.rating) ? book.rating.toFixed(1) : 'N/A'})</span>
                </div>
                
                {/* Book description */}
                <p className={styles.description}>{book.description}</p>

                {/* Price and cart controls section */}
                <div className={styles.priceCartWrapper}>
                  {/* Book price */}
                  <span className={styles.price}>₹{book.price.toFixed(2)}</span>
                  
                  {/* Cart interaction buttons */}
                  <div className={styles.cartButtons}>
                    {!inCart ? (
                      // Add to cart button when book not in cart
                      <button onClick={() => handleAddToCart(book)}>
                        <ShoppingBag className='h-6 w-6 text-gray-700' />
                      </button>
                    ) : (
                      // Quantity controls when book is in cart
                      <div className='flex items-center gap-1'>
                        {/* Decrease quantity button */}
                        <button onClick={() => handleDecrement(book.id)}>
                          <Minus className='h-4 w-4 text-gray-700' />
                        </button>
                        {/* Current quantity display */}
                        <span>{qty}</span>
                        {/* Increase quantity button */}
                        <button onClick={() => handleIncrement(book.id)}>
                          <Plus className='h-4 w-4 text-gray-700' />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

// Export component for use in other parts of the application
export default BookP;