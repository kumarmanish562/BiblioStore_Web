// React imports for hooks and component functionality
import React, { useState } from 'react'
// Import styled components and classes from the dummy styles file
import { sendIconWrapperStyle, contactPageStyles as styles } from '../../assets/dummystyles'
// Icon components from Lucide React
import { AlertCircle, CheckCircle, Mail, MapPin, MessageSquare, Phone, Send, User } from 'lucide-react'

/**
 * ContactP Component
 * Contact page with form submission that redirects to WhatsApp
 * Features form validation, toast notifications, and responsive design
 */
const ContactP = () => {
  // State to manage form input data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  
  // State to manage form validation errors
  const [errors, setErrors] = useState({})
  
  // State to manage form submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // State to manage toast notifications (currently unused but available for future enhancements)
  const [toast, setToast] = useState({ visible: false, message: "", type: "info" })

  /**
   * Validate form fields before submission
   * Checks for required fields: name, email, and message
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {}
    
    // Validate required fields
    if (!formData.name.trim()) newErrors.name = "Name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    
    // Additional email format validation
    if (formData.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  /**
   * Handle form submission and redirect to WhatsApp
   * Formats form data into WhatsApp message and opens WhatsApp Web
   * @param {Event} e - Form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Validate form before proceeding
    if (!validateForm()) return

    // WhatsApp number (replace with actual business number)
    const whatsappNumber = "1234567890"
    
    // Format form data into message lines
    const textLines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      formData.phone && `Phone: ${formData.phone}`,
      formData.subject && `Subject: ${formData.subject}`,
      `Message: ${formData.message}`,
    ].filter(Boolean) // Remove empty/falsy values
    
    // Join all lines with newlines
    const text = textLines.join("\n")

    // Create WhatsApp URL with pre-filled message
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`
    
    // Open WhatsApp in new tab
    window.open(url, "_blank")
    
    // Reset form after successful submission
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    })
    setErrors({})
  }

  /**
   * Handle input field changes with real-time error clearing
   * @param {Event} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target
    
    // Update form data
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  return (
    // Main container for the contact page
    <div className={styles.containerStyle}>
      {/* Toast notification (conditionally rendered) */}
      {toast.visible && (
        <div className={styles.toastStyle(toast.type)}>
          {toast.type === 'success' ? (
            <CheckCircle className='h-5 w-5 mr-2' />
          ) : (
            <AlertCircle className='h-5 w-5 mr-2' />
          )}
          <span>{toast.message}</span>
        </div>
      )}
      
      {/* Main content container */}
      <div className='container mx-auto px-4 py-8'>
        {/* Page header section */}
        <div className={styles.headerStyle}>
          <h1 className='text-4xl font-bold text-gray-800 mb-4'>Contact Us</h1>
          <p className='max-w-2xl mx-auto text-gray-600'>
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>
        
        {/* Two-column layout: contact info and form */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Left column - Contact information */}
          <div className={styles.contactInfoCardStyle}>
            <h2 className={styles.sectionHeadingStyle}>
              Contact Information
            </h2>

            {/* Contact details list */}
            <div className='space-y-6'>
              {/* Location information */}
              <div className={styles.contactItemStyle}>
                <MapPin className='h-6 w-6 text-[#43c6ac]' />
                <div>
                  <h3 className='font-medium text-gray-800 mb-1'>Our Location</h3>
                  <p className='text-gray-600'>123 Main St, Bhilai, India</p>
                </div>
              </div>

              {/* Email information */}
              <div className={styles.contactItemStyle}>
                <Mail className='h-6 w-6 text-[#43c6ac]' />
                <div>
                  <h3 className='font-medium text-gray-800 mb-1'>Email</h3>
                  <p className='text-gray-600'>info@example.com</p>
                </div>
              </div>

              {/* Phone information */}
              <div className={styles.contactItemStyle}>
                <Phone className='h-6 w-6 text-[#43c6ac]' />
                <div>
                  <h3 className='font-medium text-gray-800 mb-1'>Phone</h3>
                  <p className='text-gray-600'>+91 12345 67890</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column - Contact form */}
          <div className={styles.contactFormCardStyle}>
            <h2 className={styles.sectionHeadingStyle}>Send us a message via WhatsApp</h2>

            {/* Contact form */}
            <form onSubmit={handleSubmit} className='space-y-6'>
              {/* First row: Name and Email fields */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Dynamic rendering of name and email fields */}
                {['name', 'email'].map((field) => (
                  <div className='space-y-2' key={field}>
                    {/* Field label with required indicator */}
                    <label className={styles.labelStyle}>
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      <span className='text-red-500'>*</span>
                    </label>

                    {/* Input wrapper with icon and error handling */}
                    <div className={styles.inputWrapperStyle}>
                      {/* Conditional icon based on field type */}
                      {field === 'name' ? (
                        <User className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                      ) : (
                        <Mail className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                      )}
                      {/* Input field */}
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className={`${styles.inputStyle} ${errors[field] ? 'border-red-500' : ''}`}
                        placeholder={`Enter your ${field}`}
                      />
                      {/* Error message display */}
                      {errors[field] && (
                        <p className={styles.errorStyle}>{errors[field]}</p>
                      )}
                    </div>
                  </div>
                ))}

                {/* Phone field (optional) */}
                <div className='space-y-2'>
                  <label className={styles.labelStyle}>
                    Phone
                    <span className='text-gray-500'> (optional)</span>
                  </label>
                  <div className={styles.inputWrapperStyle}>
                    <Phone className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                      className={styles.inputStyle}
                      placeholder='Enter your phone number'
                    />
                  </div>
                </div>

                {/* Subject field (optional) */}
                <div className='space-y-2'>
                  <label className={styles.labelStyle}>
                    Subject
                    <span className='text-gray-500'> (optional)</span>
                  </label>
                  <input
                    type='text'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    className={styles.inputStyle}
                    placeholder='Enter subject'
                  />
                </div>
              </div>

              {/* Message field (required) */}
              <div className='space-y-2'>
                <label className={styles.labelStyle}>
                  Message
                  <span className='text-red-500'>*</span>
                </label>
                <div className={styles.inputWrapperStyle}>
                  <MessageSquare className='absolute left-3 top-3 h-5 w-5 text-gray-400' />
                  <textarea
                    rows='4'
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    className={`${styles.textareaStyle} ${errors.message ? 'border-red-500' : ''}`}
                    placeholder='Enter your message'
                  />
                  {/* Error message for message field */}
                  {errors.message && (
                    <p className={styles.errorStyle}>{errors.message}</p>
                  )}
                </div>
              </div>

              {/* Submit button */}
              <button
                type='submit'
                className={`${styles.submitButtonStyle} ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isSubmitting}
              >
                <div className={sendIconWrapperStyle}>
                  <Send className='h-5 w-5 mr-2' />
                  Send via WhatsApp
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

// Export component for use in other parts of the application
export default ContactP