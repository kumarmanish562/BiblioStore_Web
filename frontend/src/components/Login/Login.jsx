// React imports for hooks and component functionality
import React, { useEffect, useState } from 'react';
// React Router hooks and components for navigation
import { useNavigate, Link } from 'react-router-dom';
// Import styled components and classes from the dummy styles file
import { loginStyles } from '../../assets/dummystyles';
// Icon components from Lucide React
import {
  ArrowRight,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  LogOut
} from 'lucide-react';

/**
 * Login Component
 * User authentication form with validation, password visibility toggle, and toast notifications
 * Features login/logout functionality with localStorage token management
 */
const Login = () => {
  // State to manage form input data
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  
  // State to manage form submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to manage toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: '',
  });
  
  // State to manage form validation errors
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  
  // State to track if form has been submitted (for validation display)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();
  
  // Check if user is currently logged in
  const isLoggedIn = !!localStorage.getItem('authToken');

  /**
   * Effect to handle toast timer - automatically hide toast after 3 seconds
   */
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, message: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  /**
   * Validate individual form field
   * @param {string} name - Field name to validate
   * @param {string} value - Field value to validate
   * @returns {string} Error message or empty string if valid
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'email': {
        if (!value.trim()) {
          return 'Email is required';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          return 'Please enter a valid email address';
        }
        return '';
      }
        
      case 'password':
        if (!value.trim()) {
          return 'Password is required';
        }
        if (value.length < 6) {
          return 'Password must be at least 6 characters long';
        }
        return '';
        
      default:
        return '';
    }
  };

  /**
   * Validate all form fields
   * @returns {boolean} True if all fields are valid
   */
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate each field
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      newErrors[field] = error;
      if (error) {
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  /**
   * Handle input change with real-time validation
   * @param {string} name - Field name
   * @param {string} value - Field value
   */
  const handleInputChange = (name, value) => {
    // Update form data
    setFormData({ ...formData, [name]: value });
    
    // Clear error for this field if form has been submitted
    if (isSubmitted) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  /**
   * Handle form submission with validation and authentication
   * @param {Event} e - Form submission event
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    // Validate form before submission
    if (!validateForm()) {
      setToast({
        visible: true,
        message: 'Please fix the errors below',
        type: 'error',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token (in real app, this would come from server)
      localStorage.setItem('authToken', 'demo-token');
      localStorage.setItem('userEmail', formData.email);
      
      setToast({
        visible: true,
        message: 'Login successful! Redirecting...',
        type: 'success',
      });

      // Clear form data after successful login
      setFormData({ email: '', password: '' });
      setErrors({ email: '', password: '' });
      setIsSubmitted(false);

      // Redirect to home page after success message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch  {
      setToast({
        visible: true,
        message: 'Login failed. Please try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handle user sign out
   */
  const handleSignOut = () => {
    // Remove authentication data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    
    setToast({
      visible: true,
      message: 'Signed out successfully',
      type: 'success',
    });
    
    // Reload page to reset application state
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // Get stored user email for display
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className={loginStyles.container}>
      {/* Toast notification for success/error messages */}
      {toast.visible && (
        <div className={loginStyles.toast(toast.type)}>
          {toast.message}
        </div>
      )}

      {/* Main login card */}
      <div className={loginStyles.card}>
        {/* Back to home navigation link */}
        <Link to="/" className={loginStyles.backLink}>
          <ArrowRight className="rotate-180 mr-1 h-4 w-4" />
          Back to Home
        </Link>

        {/* Conditional rendering based on authentication status */}
        {!isLoggedIn ? (
          // Login form when user is not authenticated
          <>
            {/* Header section with icon and title */}
            <div className="text-center mb-8">
              <div className={loginStyles.iconCircle}>
                <Lock className="h-6 w-6 text-[#43C6AC]" />
              </div>
              <h1 className={loginStyles.heading}>Sign In</h1>
              <p className={loginStyles.subheading}>Access your account</p>
            </div>

            {/* Login form */}
            <form className={loginStyles.form} onSubmit={handleSubmit}>
              {/* Email input field */}
              <div>
                <label className={loginStyles.label}>Email</label>
                <div className="relative">
                  {/* Email icon positioned in the center left */}
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="email@example.com"
                    className={`${loginStyles.input} pl-10 ${errors.email && isSubmitted ? 'border-red-500' : ''}`}
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                {/* Display validation error for email */}
                {errors.email && isSubmitted && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password input field with visibility toggle */}
              <div>
                <label className={loginStyles.label}>Password</label>
                <div className="relative">
                  {/* Lock icon positioned in the center left */}
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className={`${loginStyles.input} pl-10 pr-10 ${errors.password && isSubmitted ? 'border-red-500' : ''}`}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                  />
                  {/* Password visibility toggle button positioned in center right */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {/* Display validation error for password */}
                {errors.password && isSubmitted && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              {/* Submit button with loading state */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${loginStyles.submitButton} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            {/* Footer with signup link */}
            <div className={loginStyles.footerText}>
              Don't have an account?{' '}
              <Link to="/signup" className={loginStyles.footerLink}>
                Create Account
              </Link>
            </div>
          </>
        ) : (
          // Already signed in state
          <div className={loginStyles.signedInContainer}>
            <div className="text-center mb-8">
              <div className={loginStyles.signedInIcon}>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <h1 className={loginStyles.heading}>Already Signed In</h1>
              <p className={loginStyles.subheading}>
                Welcome back! You're logged in as <br />
                <span className="text-[#43C6AC] font-medium">{userEmail}</span>
              </p>
            </div>
            
            {/* Action buttons for signed-in user */}
            <div className="space-y-4">
              <button 
                onClick={() => navigate('/')}
                className={loginStyles.submitButton}
              >
                Go to Homepage
              </button>
              
              <button 
                onClick={handleSignOut}
                className="w-full flex items-center justify-center px-4 py-3 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="mr-2 h-5 w-5" />
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Export component for use in other parts of the application
export default Login;