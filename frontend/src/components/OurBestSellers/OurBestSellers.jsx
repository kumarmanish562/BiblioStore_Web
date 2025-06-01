// React imports for hooks and component functionality
import React, { useRef, useState } from 'react'
// Custom styling object for our best sellers section
import { ourBestSellersStyles as styles } from '../../assets/dummystyles'
// React Router components for navigation (currently unused but imported)
import { NavLink } from 'react-router-dom'
// Icon components from Lucide React
import { Minus, Plus, ShoppingCart, Star, MoreHorizontal } from 'lucide-react'
// Data imports for background colors and books
import { bgColors, obsbooks } from '../../assets/dummydata'
// Custom cart context hook for cart functionality
import { useCart } from '../../CartContext/CartContext'

/**
 * OurBestSellers Component
 * Displays a horizontal scrollable list of best-selling books
 * Features cart integration, quantity controls, dot navigation, and cursor-based scrolling
 */
const OurBestSellers = () => {
  // Reference to the scrollable container for programmatic scrolling
  const scrollRef = useRef(null);
  // State to track current visible book index for dot navigation
  const [currentIndex, setCurrentIndex] = useState(0);
  // State to track if user is currently dragging/scrolling
  const [isDragging, setIsDragging] = useState(false);
  // State to store initial mouse position for drag calculation
  const [startX, setStartX] = useState(0);
  // State to store initial scroll position for drag calculation
  const [scrollLeft, setScrollLeft] = useState(0);
  
  // Get cart state and dispatch function from cart context
  const { cart, dispatch } = useCart();

  /**
   * Check if a book is already in the cart
   * @param {string|number} id - Book ID to check
   * @returns {boolean} True if book is in cart
   */
  const inCart = (id) => cart?.items.some(item => item.id === id);
  
  /**
   * Get quantity of a specific book in cart
   * @param {string|number} id - Book ID to check
   * @returns {number} Quantity of book in cart (0 if not in cart)
   */
  const getQty = (id) => cart?.items.find(item => item.id === id)?.quantity || 0;

  /**
   * Add a book to the cart with quantity 1
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

  /**
   * Scroll to a specific book by index
   * @param {number} index - Index of book to scroll to
   */
  const scrollToBook = (index) => {
    const container = scrollRef.current;
    if (container) {
      // Calculate scroll position (assuming each card is approximately 400px wide)
      const scrollPosition = index * 400;
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setCurrentIndex(index);
    }
  };

  /**
   * Handle scroll event to update current index based on scroll position
   */
  const handleScroll = () => {
    const container = scrollRef.current;
    if (container && !isDragging) {
      // Calculate current index based on scroll position
      const newIndex = Math.round(container.scrollLeft / 400);
      setCurrentIndex(Math.min(newIndex, obsbooks.length - 1));
    }
  };

  /**
   * Handle mouse down event to start drag scrolling
   * @param {MouseEvent} e - Mouse event
   */
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    // Change cursor to grabbing
    scrollRef.current.style.cursor = 'grabbing';
  };

  /**
   * Handle mouse leave event to stop drag scrolling
   */
  const handleMouseLeave = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  /**
   * Handle mouse up event to stop drag scrolling
   */
  const handleMouseUp = () => {
    setIsDragging(false);
    if (scrollRef.current) {
      scrollRef.current.style.cursor = 'grab';
    }
  };

  /**
   * Handle mouse move event for drag scrolling
   * @param {MouseEvent} e - Mouse event
   */
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply by 2 for faster scrolling
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header Section */}
        <div className={styles.headerWrapper}>
          <div className={styles.headerText}>
            {/* Main title with gradient text effect */}
            <h1 className={styles.title}>
              <span className={styles.gradientText}>
                Curated Excellence
              </span>
            </h1>
            {/* Subtitle describing the section */}
            <p className={styles.subtitle}> Top rated by Our Readers</p>
          </div>

          {/* Navigation dots for scrolling through books */}
          <div className={styles.navWrapper}>
            <div className={styles.navLine} />
            <div className={styles.navButtons}>
              {/* Three dots navigation */}
              <div className="flex items-center space-x-2">
                {[0, 1, 2].map((dotIndex) => (
                  <button
                    key={dotIndex}
                    onClick={() => scrollToBook(dotIndex)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentIndex === dotIndex 
                        ? 'bg-amber-500 w-6' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Scroll to book ${dotIndex + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Books Section - Horizontal scrollable container with cursor-based scrolling */}
        <div 
          className={`${styles.scrollContainer} cursor-grab select-none`}
          ref={scrollRef}
          onScroll={handleScroll}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {obsbooks.map((book, index) => (
            <div className={styles.card(bgColors[index % bgColors.length])} key={book.id}>
              <div className={styles.cardInner}>
                {/* Left side - Book information and controls */}
                <div className='space-y-3 md:space-y-4'>
                  {/* Star rating display (always 5 stars) */}
                  <div className={styles.stars}>
                    {[...Array(5)].map((_, i) => (
                      <Star className=' h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-amber-400' key={i} />
                    ))}
                  </div>
                  
                  {/* Book title and author information */}
                  <div className={styles.bookInfo}>
                    <h2 className={styles.bookTitle}>{book.title}</h2>
                    <p className={styles.bookAuthor}>{book.author}</p>
                  </div>
                  
                  {/* Book description (static text for all books) */}
                  <p className={styles.bookDesc}>
                    Jane Austen's timeless classic, "Pride and Prejudice," explores the themes of love, class, and social expectations in early 19th-century England.
                  </p>
                </div>

                {/* Cart controls section */}
                <div className={styles.cartControls}>
                  <div className={styles.priceQtyWrapper}>
                    {/* Book price display */}
                    <span className={styles.price}>₹{book.price.toFixed(2)}</span>

                    {/* Conditional rendering: quantity controls if in cart, add button if not */}
                    {inCart(book.id) ? (
                      // Quantity control buttons when book is in cart
                      <div className={styles.qtyWrapper}>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent drag scrolling when clicking buttons
                            handleDec(book.id);
                          }} 
                          className={styles.qtyBtn}
                        >
                          <Minus size={18} />
                        </button>
                        <span className={styles.qtyText}>{getQty(book.id)}</span>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent drag scrolling when clicking buttons
                            handleInc(book.id);
                          }} 
                          className={styles.qtyBtn}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    ) : (
                      // Add to cart button when book is not in cart
                      <button 
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent drag scrolling when clicking buttons
                          handleAdd(book);
                        }} 
                        className={styles.addButton}
                      >
                        <ShoppingCart className=' h-4 w-4 md:h-5 md:w-5' />
                        <span className='ml-2'>Add to Collection</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right side - Book cover image (perfectly centered both horizontally and vertically) */}
              <div className="flex items-center justify-center h-full w-full absolute top-0 right-0 bottom-0">
                <div className="flex items-center justify-center p-4">
                  <img 
                    src={book.image} 
                    alt={book.title} 
                    className={`${styles.bookImage} pointer-events-none object-contain max-w-full max-h-full`} // Prevent image from interfering with drag and ensure it fits properly
                    draggable={false} // Prevent default image drag behavior
                    style={{
                      margin: 'auto',
                      display: 'block'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Export component for use in other parts of the application
export default OurBestSellers