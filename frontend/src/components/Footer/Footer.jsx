// React import for component functionality
import React from 'react'
// Import styled components and classes from the dummy styles file
import { footerStyles as styles } from '../../assets/dummystyles'
// React Router Link component for navigation
import { Link } from 'react-router-dom'
// Logo image asset
import logo from '../../assets//logoicon.png'
// Data imports for quick links and social media links
import { quickLinks, socialLinks } from '../../assets/dummydata'
// Icon components from Lucide React
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'

/**
 * Footer Component
 * Site-wide footer with company information, quick links, newsletter signup, and contact details
 * Features social media links, copyright information, and organized content sections
 */
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Main footer content grid */}
        <div className={styles.grid}>
          {/* Company logo and branding section */}
          <div className={styles.logoBlock}>
            {/* Logo and company name link */}
            <Link to='/' className={styles.logoLink}>
              <img src={logo} alt="Logo" className={styles.logoImg} />
              <h1 className={styles.logoText}>BIBLIOSTORE</h1>
            </Link>
            {/* Company description */}
            <p className={styles.aboutText}>
              BiblioStore is your go-to platform for discovering and sharing books. Whether you're looking for the latest bestseller or a hidden gem, we've got you covered.
            </p>
            {/* Social media links */}
            <div className={styles.socialWrap}>
              {socialLinks.map(({ Icon, url }, i) => (
                <a href={url} key={i} target='_blank' rel="noopener noreferrer" className={styles.socialButton}>
                  {Icon && <Icon className={styles.socialIcon} />}
                </a>
                
              ))}
            </div>
          </div>
          
          {/* Quick navigation links section */}
          <div className={styles.quickLinksBlock}>
            <h3 className={styles.quickLinksTitle}>Quick Links</h3>
            <ul className={styles.quickLinksList}>
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.url} className={styles.quickLinkItem}>
                    <span className={styles.quickLinkDot}></span>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter subscription section */}
          <div className={styles.newsletterBlock}>
            <h3 className={styles.newsletterTitle}>Stay Updated</h3>
            <p className={styles.newsletterText}>
              Subscribe to our newsletter for the latest updates and exclusive offers.
            </p>
            {/* Newsletter signup form */}
            <form className={styles.formWrap}>
              <input 
                type='email' 
                placeholder='Enter your email' 
                className={styles.input} 
                required 
              />
              <button type='submit' className={styles.button}>
                <ArrowRight className='h-4 w-4'/>
              </button>
            </form>
          </div>

          {/* Contact information section */}
          <div className={styles.contactBlock}>
            <h3 className={styles.contactTitle}>Contact Us</h3>
            <div className={styles.contactList}>
              {/* Physical address */}
              <div className={styles.contactItem}>
                <MapPin className={styles.contactIcon} />
                <span>123 Book St, Bhilai, Chhattisgarh</span>
              </div>
              {/* Phone number */}
              <div className={styles.contactRow}>
                <Phone className={styles.contactIconInline} />
                <span>+91 12345 67890</span>
              </div>
              {/* Email address */}
              <div className={styles.contactRow}>
                <Mail className={styles.contactIconInline} />
                <span>info@bibliostore.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright and attribution section */}
        <div className={styles.copyrightWrap}>
          {/* Copyright notice with dynamic year */}
          <p className={styles.copyrightText}>
            &copy; {new Date().getFullYear()} BiblioStore. All rights reserved.
          </p>
          
          {/* Attribution and branding link */}
          <div className="flex flex-col items-center space-y-1">
            <a 
              href="https://www.bibliostore.com/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-gray-500 hover:text-purple-600 transition-colors duration-200"
            >
              Powered By
            </a>
            <span className="text-purple-600 font-semibold text-sm">
              BIBLIOSTORE
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Export component for use in other parts of the application
export default Footer