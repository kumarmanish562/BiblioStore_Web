// React imports for hooks and component functionality
import React, { useState, useEffect } from 'react'
// Import styled components and classes from the dummy styles file
import { Signup } from '../../assets/dummystyles';
// React Router hooks and components for navigation
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// Icon components from Lucide React
import { ArrowLeft, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'; 

/**
 * SignUp Component
 * User registration form with validation, password visibility toggle, and toast notifications
 * Features comprehensive form validation and automatic redirect to login after successful signup
 */
const SignUp = () => { 
  // State to manage form input data
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  // State to toggle password visibility
  const [showpassword, setShowPassword] = useState(false);
  
  // State to manage toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: '',
    type: '' 
  });
  
  // State to manage form validation errors
  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: ''
  });
  
  // State to track if form has been submitted (for validation display)
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Hook for programmatic navigation
  const navigate = useNavigate();

  /**
   * Effect to handle toast timer and redirect to login page
   * Automatically hides toast after 3 seconds and redirects on success
   */
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast({ visible: false, message: '', type: '' });
        if (toast.type === 'success') {
          navigate('/login');
        }
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, navigate]);

  /**
   * Validate individual form field
   * @param {string} name - Field name to validate
   * @param {string} value - Field value to validate
   * @returns {string} Error message or empty string if valid
   */
  const validateField = (name, value) => {
    switch (name) {
      case 'username':
        if (!value.trim()) {
          return 'Username is required';
        }
        if (value.length < 3) {
          return 'Username must be at least 3 characters long';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
          return 'Username can only contain letters, numbers, and underscores';
        }
        return '';
        
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
        if (value.length < 8) {
          return 'Password must be at least 8 characters long';
        }
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
          return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
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
   * Handle form submission with validation
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    
    // Validate form before submission
    if (!validateForm()) {
      setToast({ 
        visible: true, 
        message: 'Please fix the errors below', 
        type: 'error' 
      });
      return;
    }

    // Simulate successful account creation
    setToast({ 
      visible: true, 
      message: 'Account created successfully! Redirecting to login...', 
      type: 'success' 
    });
    
    // Clear form data after successful submission
    setFormData({
      username: '',
      email: '',
      password: ''
    });
    setErrors({
      username: '',
      email: '',
      password: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className={Signup.container}>
      {/* Toast notification for success/error messages */}
      {toast.visible && (
        <div className={`${Signup.toastBase} ${toast.type === 'success' ? Signup.toastSuccess : Signup.toastError}`}>
          {toast.message}
        </div>
      )}

      {/* Main signup card */}
      <div className={Signup.card}>
        {/* Back to home navigation link */}
        <Link to="/" className={Signup.backLink}>
          <ArrowLeft className='mr-1 h-4 w-4' />
          Back to Home
        </Link>

        {/* Header section with icon and title */}
        <div className='text-center mb-8'>
          <div className={Signup.iconContainer}>
            <User className='h-6 w-6 text-[#43C6AC]' />
          </div>
          <h1 className={Signup.heading}>
            Create Account
          </h1>
          <p className={Signup.subtext}>
            Join our community of book lovers.
          </p>
        </div>

        {/* Signup form */}
        <form onSubmit={handleSubmit} className={Signup.form}>
          {/* Username input field */}
          <div>
            <label className={Signup.label} htmlFor="username">Username</label>
            <div className={Signup.inputWrapper}>
              <User className={Signup.iconLeft} />
              <input
                type="text"
                id="username"
                className={`${Signup.input} ${errors.username && isSubmitted ? 'border-red-500' : ''}`}
                placeholder="Enter your username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
              />
            </div>
            {/* Display validation error for username */}
            {errors.username && isSubmitted && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email input field */}
          <div>
            <label className={Signup.label} htmlFor="email">Email</label>
            <div className={Signup.inputWrapper}>
              <Mail className={Signup.iconLeft} />
              <input
                type="email"
                id="email"
                className={`${Signup.input} ${errors.email && isSubmitted ? 'border-red-500' : ''}`}
                placeholder="email@example.com"
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
            <label className={Signup.label} htmlFor="password">Password</label>
            <div className={Signup.inputWrapper}>
              <Lock className={Signup.iconLeft} />
              <input
                type={showpassword ? "text" : "password"}
                id="password"
                className={`${Signup.input} ${errors.password && isSubmitted ? 'border-red-500' : ''}`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
              />
              {/* Password visibility toggle button */}
              <button 
                type="button" 
                onClick={() => setShowPassword(!showpassword)}
                className={Signup.togglePassword}
              >
                {showpassword ? 
                  <EyeOff className='h-5 w-5' /> : 
                  <Eye className='h-5 w-5' />
                }
              </button>
            </div>
            {/* Display validation error for password */}
            {errors.password && isSubmitted && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit button */}
          <button type="submit" className={Signup.submitBtn}>
            Create Account
          </button>
        </form>

        {/* Footer with login link */}
        <div className={Signup.footerText}>
          Already have an account? {' '}
          <Link to="/login" className={Signup.link}>Login</Link>
        </div>
      </div>
    </div>
  )
}

// Export component for use in other parts of the application
export default SignUp