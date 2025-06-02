import React, { useEffect } from 'react'
import { styles } from '../../assets/dummystyles'
import { useCart } from '../../CartContext/CartContext'
import { Link } from 'react-router-dom'
import { BookOpen ,  Minus, Plus, ShoppingBag, Trash , ArrowRight} from 'lucide-react'; 


const CartP = () => {
  const { cart, dispatch } = useCart();
  const total = cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);


  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }
    , [cart]);

  const getImageSource = (item) => {
    if (typeof item.image === 'string') return item.image
    return item.image?.default
  }

  // Increase and decrease and remove

  const inc = (item) => dispatch({ type: "INCREMENT", payload: { id: item.id, source: item.source } })
  const dec = (item) => dispatch({ type: "DECREMENT", payload: { id: item.id, source: item.source } })
  const remove = (item) => dispatch({ type: "REMOVE_ITEM", payload: { id: item.id, source: item.source } });


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <ShoppingBag className={styles.titleIcon} />
            Shopping Cart
          </h1>
          <p className={styles.subtitle}>
            {cart.items.length} item{cart.items.length !== 1 && 's'} in your cart
          </p>
        </div>

        {cart.items.length === 0 ? (
          <div className={styles.emptyCard}>
            <div className={styles.emptyIconWrapper}>
              <ShoppingBag className={styles.emptyIcon} />
            </div>
            <h2 className={styles.emptyTitle}>Your cart feels lonely</h2>
            <p className={styles.emptyDescription}>
              Discover our collection of premium books for your reading journey.
            </p>
            <Link to='/books' className={styles.browseBtn}>
              <BookOpen className={styles.browseIcon} />
              Browse collection
            </Link>
          </div>
        ) : (
          <div className={styles.cartGrid}>
            <div className={styles.cartItems}>
             {cart.items.map((item) => (
  <div
    key={`${item.source}-${item.id}`}
    className={styles.cartItemCard}
  >
                  <div className={styles.cartItemContent}>
                    <img
                      src={getImageSource(item)}
                      alt={item.title}
                      className={styles.cartItemImage}
                    />
                    <div className=' flex-1'>
                      <div className={styles.cartItemTop}>
                        <div>
                          <h3 className={styles.cartTitle}>{item.title}</h3>
                          <p className={styles.cartAuthor}>{item.author}</p>
                        </div>
                        <button  onClick={() => remove(item)} className={styles.removeBtn}>
                          <Trash className={styles.removeIcon} />
                        </button>
                      </div>
                      <div className={styles.quantityPriceWrapper}>
                        <div className={styles.quantityControls}>
                          <div className={styles.quantityBox}>
                            <button onClick={() => dec(item)} className={styles.qBtn}>
                              <Minus className={styles.qIcon} />
                            </button>
                            <span className={styles.quantityValue}>{item.quantity}</span>
                            <button onClick={() => inc(item)} className={styles.qBtn}>
                              <Plus className={styles.qIcon} />
                            </button>
                          </div>
                          <span className={styles.itemTotal}>
                          ₹{(item.price * item.quantity).toFixed(2)}
                          </span>

                        </div>
                        <span className={styles.pricePerItem}>
                          ₹{item.price.toFixed(2)} each
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.summaryCard}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              <div className={styles.summaryBreakdown}>
               <div className={styles.summaryRow}>
                 <span className={styles.summaryLabel}>SubTotal ({cart.items.length} items)</span>
                 <span className={styles.summaryValue}>₹{total.toFixed(2)}</span>
               </div>
               <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Shipping</span>
                  <span className={styles.summaryShipping}>Free</span>
               </div>
               <div className={styles.summaryRow}>
                 <span className={styles.summaryLabel}>Taxes</span>
                 <span className={styles.summaryValue}>Calculated at Checkout</span>
               </div>
            </div>
              <div className={styles.summaryTotalSection}>
               <div className={styles.totalRow}>
                <span className={styles.summaryLabel}>
                  Total
                </span>
                <span className={styles.totalAmount}>
                  ₹{total.toFixed(2)}
                </span>
               </div>
              </div>
              <button className={styles.checkoutBtn}>
                Checkout
                <ArrowRight className={styles.checkoutIcon}/>
              </button>
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

export default CartP