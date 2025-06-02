// React import for component functionality
import React from 'react'
// Import styled components and classes from the dummy styles file
import { homeBooksStyles as styles } from '../../assets/dummystyles'
// Custom cart context hook for cart functionality
import { useCart } from '../../CartContext/CartContext';
// Data import for home page books
import { hbbooks } from '../../assets/dummydata';
// Icon components from Lucide React
import { ArrowRight, Minus, Plus, ShoppingCart, Star } from 'lucide-react';
// React Router Link component for navigation
import { Link } from 'react-router-dom';

/**
 * HomeBook Component
 * Displays a grid of featured books on the home page with cart functionality
 * Features star ratings, quantity controls, and add to cart functionality
 */
const HomeBook = () => {
  // Get cart state and dispatch function from cart context
  const { cart, dispatch } = useCart();
  
  /**
   * Check if a book is already in the cart
   * @param {string|number} id - Book ID to check
   * @returns {Object|undefined} Cart item if found, undefined otherwise
   */
  const inCart = (id) => cart?.items.find(item => item.id === id);

  /**
   * Add a book to the cart with initial quantity of 1
   * @param {Object} book - Book object to add to cart
   */
  const handleAdd = (book) => dispatch({ type: 'ADD_ITEM', payload: { ...book, quantity: 1 } });
  
  /**
   * Increment quantity of a book in cart
   * @param {string|number} id - Book ID to increment
   */
  const handleInc = (id) => dispatch({ type: 'INCREMENT', payload: { id } });
  
  /**
   * Decrement quantity of a book in cart
   * @param {string|number} id - Book ID to decrement
   */
  const handleDec = (id) => dispatch({ type: 'DECREMENT', payload: { id } });

  return (
    // Main section container
    <div className={styles.section}>
      {/* Content wrapper container */}
      <div className={styles.container}>
        {/* Card wrapper for the entire books section */}
        <div className={styles.card}>
          {/* Section header with title and decorative line */}
          <div className='text-center mb-12'>
            <h2 className={styles.heading}>
              Bookseller Favorites
            </h2>
            {/* Decorative underline */}
            <div className={styles.headingLine} />
          </div>

          {/* Books grid container */}
          <div className={styles.grid}>
            {/* Map through books data to render each book card */}
            {hbbooks.map((book) => {
              // Check if current book is already in cart
              const item = inCart(book.id)
              
              return (
                // Individual book card
                <div key={book.id} className={styles.bookCard}>
                  {/* Book image section with rating overlay */}
                  <div className={styles.imageWrapper}>
                    {/* Book cover image */}
                    <img src={book.image} alt={book.title} className={styles.image} />

                    {/* Star rating display */}
                    <div className={styles.rating}>
                      {/* Generate 5 stars based on book rating */}
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          className={`h-4 w-4 ${
                            i < book.rating 
                              ? 'text-[#43C6Ac] fill-[#43C6Ac]' 
                              : 'text-gray-300'
                          }`} 
                          key={i} 
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Book title */}
                  <h3 className={styles.title}>{book.title}</h3>
                  
                  {/* Book author with additional text */}
                  <p className={styles.author}>{book.author} best author in this week</p>
                  
                  {/* Book price display */}
                  <span className={styles.actualPrice}>₹{book.price}</span>

                  {/* Conditional rendering: quantity controls if in cart, add button if not */}
                  {item ? (
                    // Quantity control section when book is in cart
                    <div className={styles.qtyBox}>
                      {/* Decrease quantity button */}
                      <button onClick={() => handleDec(book.id)} className={styles.qtyBtn}>
                        <Minus className='h-5 w-5' />
                      </button>
                      
                      {/* Current quantity display */}
                      <span className='text-grey-700'>{item.quantity}</span>
                      
                      {/* Increase quantity button */}
                      <button onClick={() => handleInc(book.id)} className={styles.qtyBtn}>
                        <Plus className='h-5 w-5' />
                      </button>
                    </div>
                  ) : (
                    // Add to cart button when book is not in cart
                    <button className={styles.addBtn} onClick={() => handleAdd(book)}>
                      <ShoppingCart className='h-5 w-5' />
                      <span>Add to Cart</span>
                    </button>
                  )}
                </div>
              )
            })}
          </div>
          
          {/* View all books navigation section */}
          <div className={styles.viewBtnWrapper}>
            {/* Link to books page with arrow icon */}
            <Link to='/books' className={styles.viewBtn}>
              <span>View All Books</span>
              <ArrowRight className={styles.viewIcon} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Export component for use in other parts of the application
export default HomeBook