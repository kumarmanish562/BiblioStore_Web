// React imports for hooks and functionality
import React, { useEffect, useState } from 'react';
// Custom styling object for navbar components
import { navbarStyles } from '../../assets/dummystyles';
// React Router components for navigation
import { Link, useLocation } from 'react-router-dom';
// Logo image asset
import logo from '../../assets/logoicon.png'
// Navigation items configuration data
import { navItems } from '../../assets/dummydata'
// Shopping cart icon from React Icons
import { FaOpencart } from 'react-icons/fa';
// Menu, User, and Close icons from Lucide React
import { Menu, User, X } from 'lucide-react';
// Custom cart context hook for cart functionality
import { useCart } from '../../CartContext/CartContext';

/**
 * Navbar Component
 * Responsive navigation bar with desktop and mobile layouts
 * Features: scroll-based styling, cart integration, mobile menu toggle
 */
const Navbar = () => {
  // State to track if user has scrolled from top of page
  const [scrolled, setScrolled] = useState(false);
  // State to control mobile menu visibility
  const [isOpen, setIsOpen] = useState(false)
  // Hook to get current route location for active state highlighting
  const location = useLocation()

  // Get cart data from context
  const { cart } = useCart()

  // Calculate total quantity of items in cart for badge display
  const totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0)

  // Effect to handle scroll detection for navbar style changes
  useEffect(() => {
    // Function to update scrolled state based on scroll position
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    // Add scroll event listener on component mount
    window.addEventListener('scroll', handleScroll);
    // Cleanup function to remove event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array - runs only once

  return (
    // Main navigation container with dynamic styling based on scroll state
    <nav className={navbarStyles.nav(scrolled)}>
      <div className={navbarStyles.container}>
        <div className='flex items-center justify-between'>
          {/* Logo Section - Company branding and home link */}
          <Link to='/' className={navbarStyles.logoContainer}>
            <div className='relative group'>
              {/* Background gradient effect for logo hover */}
              <div className={navbarStyles.logoGradient} />
              <div className='relative flex items-center'>
                {/* Company logo image */}
                <img src={logo} alt="Logo" className={navbarStyles.logoImage} />
                <div className=' ml-2'>
                  {/* Company name heading */}
                  <h1 className={navbarStyles.logoText}>BIBLIOSTORE</h1>
                  {/* Decorative underline element */}
                  <div className={navbarStyles.logoUnderline} />
                </div>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation Menu - Hidden on mobile screens */}
          <div className={navbarStyles.desktopNavWrapper}>
            {/* Map through navigation items from dummy data */}
            {navItems.map((item) => {
              // Check if current route matches this navigation item
              const isActive = location.pathname === item.path
              return (
                // Navigation link with active state styling
                <Link key={item.name} to={item.path} className={navbarStyles.navLink}>
                  <div className=' relative z-10 flex items-center'>
                    <div className=' relative'>
                      {/* Background wrapper for navigation icon */}
                      <div className={navbarStyles.navIconWrapper(item.color)} />
                      {/* Dynamic icon component from navigation item */}
                      <item.icon className={navbarStyles.navIcon(isActive)} />
                    </div>
                    {/* Navigation item text with conditional styling */}
                    <span className={navbarStyles.navText(isActive, item.color)}>
                      {item.name}
                    </span>
                    {/* Active state underline indicator */}
                    {isActive && <span className={navbarStyles.navUnderline(item.color)} />}
                  </div>
                </Link>
              )
            })}
          </div>
          
          {/* Right Side Action Icons - Cart and User Login */}
          <div className={navbarStyles.rightIconsWrapper}>
            {/* Shopping Cart Link with Item Count Badge */}
            <Link to='/cart' className={navbarStyles.cartWrapper}>
              {/* Gradient background effect for cart button */}
              <div className={navbarStyles.cartGradient} />
              <div className=' relative'>
                {/* Shopping cart icon */}
                <FaOpencart className={navbarStyles.cartIcon} />
                {/* Conditional badge showing total items in cart */}
                {totalQuantity > 0 && (
                  <span className={navbarStyles.cartBadge}>
                    {totalQuantity}
                  </span>
                )}
              </div>
            </Link>
            
            {/* User Login/Profile Link */}
            <Link to='/login' className={navbarStyles.loginWrapper}>
              {/* Gradient background effect for login button */}
              <div className={navbarStyles.loginGradient} />
              <div className=' relative'>
                {/* User profile icon */}
                <User className={navbarStyles.loginIcon} />
              </div>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button - Only visible on mobile devices */}
          <div className=' md:hidden flex items-center'>
            {/* Button to toggle mobile menu open/closed */}
            <button onClick={() => setIsOpen(!isOpen)} className={navbarStyles.menuBtn}>
              {/* Gradient background for menu button */}
              <div className={navbarStyles.menuGradient} />
              <div className=' relative'>
                {/* Conditional icon - X when open, hamburger when closed */}
                {isOpen ? <X className={navbarStyles.menuIcon} /> : <Menu className={navbarStyles.menuIcon} />}
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu - Conditionally rendered when menu is open */}
      {isOpen && (
        <div className={navbarStyles.mobileMenu}>
          <div className={navbarStyles.mobileContainer}>
            <div className="flex flex-col space-y-1">
              {/* Mobile navigation items - vertical layout */}
              {navItems.map((item) => {
                // Check active state for mobile nav items
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    // Close mobile menu when navigation item is clicked
                    onClick={() => setIsOpen(false)}
                    className={navbarStyles.mobileNavItem(isActive, item.color)}
                  >
                    {/* Icon for mobile navigation item */}
                    <item.icon className={navbarStyles.mobileNavIcon(isActive, item.color)} />
                    {/* Text label for mobile navigation item */}
                    <span className={navbarStyles.mobileNavText(isActive, item.color)}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}

              {/* Mobile Action Icons Row - Cart and Login buttons */}
              <div className={navbarStyles.mobileIconRow}>
                {/* Mobile cart link with badge */}
                <Link to='/cart' className='relative group p-2' onClick={() => setIsOpen(false)}>
                  {/* Cart icon with hover effects */}
                  <FaOpencart className='h-5 w-5 text-gray-600 group-hover:text-amber-600' />
                  {/* Mobile cart badge showing item count */}
                  {totalQuantity > 0 && (
                    <span className={navbarStyles.mobileCartBadge}>
                      {totalQuantity}
                    </span>
                  )}
                </Link>
                {/* Mobile login link */}
                <Link to='/login' className=' group p-2' onClick={() => setIsOpen(false)}>
                  {/* User icon with hover effects */}
                  <User className='h-5 w-5 text-gray-600 group-hover:text-amber-600' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

    </nav>
  )
}

// Export component for use in other parts of the application
export default Navbar