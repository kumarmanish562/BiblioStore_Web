// React imports for hooks and component functionality
import React, { useEffect } from 'react'
// Import styled components and classes from the dummy styles file
import { styles } from '../../assets/dummystyles'
// Custom cart context hook for cart functionality
import { useCart } from '../../CartContext/CartContext'
// React Router Link component for navigation
import { Link } from 'react-router-dom'
// Icon components from Lucide React
import { BookOpen, Minus, Plus, ShoppingBag, Trash, ArrowRight } from 'lucide-react'

/**
 * CartP Component
 * Shopping cart page component that displays cart items, allows quantity management,
 * and provides checkout functionality with order summary
 */
const CartP = () => {
  // Get cart state and dispatch function from cart context
  const { cart, dispatch } = useCart();
  
  // Calculate total price of all items in cart
  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  /**
   * Effect to persist cart data to localStorage whenever cart changes
   * This ensures cart data survives page refreshes and browser sessions
   */
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  /**
   * Helper function to get image source from item
   * Handles both string URLs and imported image objects
   * @param {Object} item - Cart item object
   * @returns {string} Image source URL
   */
  const getImageSource = (item) => {
    if (typeof item.image === 'string') return item.image
    return item.image?.default
  }

  /**
   * Increment quantity of an item in cart
   * @param {Object} item - Cart item to increment
   */
  const inc = (item) => dispatch({ 
    type: "INCREMENT", 
    payload: { id: item.id, source: item.source } 
  })
  
  /**
   * Decrement quantity of an item in cart
   * @param {Object} item - Cart item to decrement
   */
  const dec = (item) => dispatch({ 
    type: "DECREMENT", 
    payload: { id: item.id, source: item.source } 
  })
  
  /**
   * Remove an item completely from cart
   * @param {Object} item - Cart item to remove
   */
  const remove = (item) => dispatch({ 
    type: "REMOVE_ITEM", 
    payload: { id: item.id, source: item.source } 
  });

  return (
    // Main container for the cart page
    <div className={styles.container}>
      {/* Wrapper for cart content */}
      <div className={styles.wrapper}>
        {/* Cart header with title and item count */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            <ShoppingBag className={styles.titleIcon} />
            Shopping Cart
          </h1>
          {/* Dynamic subtitle showing item count with proper pluralization */}
          <p className={styles.subtitle}>
            {cart.items.length} item{cart.items.length !== 1 && 's'} in your cart
          </p>
        </div>

        {/* Conditional rendering: empty cart state vs cart with items */}
        {cart.items.length === 0 ? (
          // Empty cart state
          <div className={styles.emptyCard}>
            {/* Empty cart icon */}
            <div className={styles.emptyIconWrapper}>
              <ShoppingBag className={styles.emptyIcon} />
            </div>
            {/* Empty cart messaging */}
            <h2 className={styles.emptyTitle}>Your cart feels lonely</h2>
            <p className={styles.emptyDescription}>
              Discover our collection of premium books for your reading journey.
            </p>
            {/* Call-to-action button to browse books */}
            <Link to='/books' className={styles.browseBtn}>
              <BookOpen className={styles.browseIcon} />
              Browse collection
            </Link>
          </div>
        ) : (
          // Cart with items - two-column layout
          <div className={styles.cartGrid}>
            {/* Left column - Cart items list */}
            <div className={styles.cartItems}>
              {/* Map through cart items to display each item */}
              {cart.items.map((item) => (
                <div
                  key={`${item.source}-${item.id}`}
                  className={styles.cartItemCard}
                >
                  {/* Cart item content wrapper */}
                  <div className={styles.cartItemContent}>
                    {/* Product image */}
                    <img
                      src={getImageSource(item)}
                      alt={item.title}
                      className={styles.cartItemImage}
                    />
                    
                    {/* Item details section */}
                    <div className='flex-1'>
                      {/* Top section with title, author, and remove button */}
                      <div className={styles.cartItemTop}>
                        <div>
                          {/* Book title */}
                          <h3 className={styles.cartTitle}>{item.title}</h3>
                          {/* Book author */}
                          <p className={styles.cartAuthor}>{item.author}</p>
                        </div>
                        {/* Remove item button */}
                        <button onClick={() => remove(item)} className={styles.removeBtn}>
                          <Trash className={styles.removeIcon} />
                        </button>
                      </div>
                      
                      {/* Bottom section with quantity controls and pricing */}
                      <div className={styles.quantityPriceWrapper}>
                        {/* Quantity controls and item total */}
                        <div className={styles.quantityControls}>
                          {/* Quantity adjustment buttons */}
                          <div className={styles.quantityBox}>
                            {/* Decrease quantity button */}
                            <button onClick={() => dec(item)} className={styles.qBtn}>
                              <Minus className={styles.qIcon} />
                            </button>
                            {/* Current quantity display */}
                            <span className={styles.quantityValue}>{item.quantity}</span>
                            {/* Increase quantity button */}
                            <button onClick={() => inc(item)} className={styles.qBtn}>
                              <Plus className={styles.qIcon} />
                            </button>
                          </div>
                          {/* Total price for this item (price × quantity) */}
                          <span className={styles.itemTotal}>
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        {/* Price per individual item */}
                        <span className={styles.pricePerItem}>
                          ₹{item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right column - Order summary card */}
            <div className={styles.summaryCard}>
              {/* Summary card title */}
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              
              {/* Price breakdown section */}
              <div className={styles.summaryBreakdown}>
                {/* Subtotal row */}
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>
                    SubTotal ({cart.items.length} items)
                  </span>
                  <span className={styles.summaryValue}>₹{total.toFixed(2)}</span>
                </div>
                
                {/* Shipping row */}
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Shipping</span>
                  <span className={styles.summaryShipping}>Free</span>
                </div>
                
                {/* Taxes row */}
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Taxes</span>
                  <span className={styles.summaryValue}>Calculated at Checkout</span>
                </div>
              </div>
              
              {/* Total section */}
              <div className={styles.summaryTotalSection}>
                <div className={styles.totalRow}>
                  <span className={styles.summaryLabel}>Total</span>
                  <span className={styles.totalAmount}>₹{total.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Checkout button */}
              <button className={styles.checkoutBtn}>
                Checkout
                <ArrowRight className={styles.checkoutIcon} />
              </button>
              
              {/* Continue shopping link */}
              <Link to='/books' className={styles.continueBtn}>
                <BookOpen className={styles.continueIcon} />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Export component for use in other parts of the application
export default CartP