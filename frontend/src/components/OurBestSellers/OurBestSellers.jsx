import React, { useRef } from 'react'
import { ourBestSellersStyles as styles } from '../../assets/dummystyles'
import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { bgColors, obsbooks } from '../../assets/dummydata'
import { useCart } from '../../CartContext/CartContext'



const OurBestSellers = () => {

  const scrollRef =useRef(null);
  const {cart, dispatch} = useCart();

  const inCart = (id)  => cart?.items.some(item=> item.id === id);

  const scrollLeft = () =>  scrollRef.current.scrollBy({
    left: -400,
    behavior: 'smooth'
  });
  const scrollRight = () => scrollRef.current.scrollBy({
    left: 400,
    behavior: 'smooth'
  });
  return (
  <section className={styles.section}>
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerWrapper}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>
            <span className={styles.gradientText}>
              Curated Excellence
            </span>
          </h1>
          <p className={styles.subtitle}> Top rated by Our Readers</p>
        </div>

        {/* right btns for moving left to right  */}

        <div className={styles.navWrapper}>
         <div  className={styles.navLine}/>
         <div className={styles.navButtons}>
          <button onClick ={scrollLeft} className={styles.navBtn}>
          <ChevronLeft className={styles.navIcon} size={20} />
          </button>
          <button onClick ={scrollRight} className={styles.navBtn}>
          <ChevronRight className={styles.navIcon} size={20} />
          </button>
          </div>
        </div>
      </div>

      {/* Books Sections */}
      <div className={styles.scrollContainer} ref={scrollRef}>
        {obsbooks.map((book, index) => (
          <div className={styles.card(bgColors[index % bgColors.length])} key={book.id}>
            <div className={styles.cardInner}>
              <div className='space-y-3 md:space-y-4'>
                <div className={styles.stars}>
                  {[...Array(5)].map((_, i) => (
                    <Star className= ' h-4 w-4 md:h-5 md:w-5 text-amber-400 fill-amber-400' key={i} />
                  ))}
                </div>
                    <div className={styles.bookInfo}>
                      <h2 className={styles.bookTitle}>{book.title}</h2>
                      <p className={styles.bookAuthor}>{book.author}</p>
                    </div>
                    <p className={styles.bookDesc}>
                      Jane Austen's timeless classic, "Pride and Prejudice," explores the themes of love, class, and social expectations in early 19th-century England. 
                    </p>
              </div>

              {/* Add controls like buttons for adding to cart or viewing details */}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
  )
}

export default OurBestSellers