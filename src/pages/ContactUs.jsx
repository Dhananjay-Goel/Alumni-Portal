import React, { useState, useEffect } from 'react';
import Captcha from '../captcha';

const ContactUs = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumbers, setPhoneNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaExpression, setCaptchaExpression] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    generateCaptcha();
  }, []); // Run once on component mount

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setCaptchaExpression(`${num1} + ${num2}`);
    setCaptcha('');
  };
  

  const handleFullNameChange = (event) => {
    setFullName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumbersChange = (event) => {
    setPhoneNumbers(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleCaptchaChange = (event) => {
    setCaptcha(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your logic for sending the message, like making an API call
    console.log('Full Name:', fullName);
    console.log('Email:', email);
    console.log('Phone Numbers:', phoneNumbers);
    console.log('Message:', message);
    console.log('CAPTCHA:', captcha);

    // You can add further validation or API calls here

    // Clear the form fields after submission
    setFullName('');
    setEmail('');
    setPhoneNumbers('');
    setMessage('');
    setCaptcha('');
    setSubmitted(true);

    // Generate a new CAPTCHA for the next form rendering
    generateCaptcha();
  };

  return (
    
    <div className="w-full m-4 border border-gray-300 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-3xl font-bold mb-4 text-center">Call Back Request or Mail to :</h2>
      <h2 className="text-lg font-semibold mb-8 text-center">kavleen6@admin.iitrpr.ac.in</h2>
      {submitted ? (
        <p className="text-green-600 mb-4">Form submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="John Doe"
              value={fullName}
              onChange={handleFullNameChange}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email ID
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@example.com"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumbers" className="block text-sm font-medium text-gray-700">
              Your Phone/WhatsApp Numbers
            </label>
            <input
              type="text"
              id="phoneNumbers"
              placeholder="+1-123-456-7890,+91-9876543210"
              value={phoneNumbers}
              onChange={handlePhoneNumbersChange}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={handleMessageChange}
              className="w-full px-4 py-2 rounded-md border focus:outline-none focus:border-blue-500"
              rows="4"
              required
            />
          </div>
          <div className="mb-4">
            <p>capcha</p>
            <Captcha/>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 focus:outline-none mb-4"
          >
            Send Message
          </button>
        </form>
      )}

    <div className="bg-blue-500 text-white py-8 rounded-md">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:justify-between">
        <div className="lg:w-1/2 mb-4 lg:mb-0">
        {/* Insert Dean's photo here */}
          <img
            src="/images/car1.jpg" // Replace with the actual photo URL
            alt="Dean's Photo"
            className="rounded-full w-32 h-32 object-cover mx-auto lg:mx-0"
          />
        </div>
        <div className="lg:w-1/2 text-center lg:text-left">
          <h3 className="text-xl font-semibold mb-2">Dean's Message</h3>
          <p className="text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet accumsan arcu.
            Quisque eu odio ut nisl feugiat scelerisque.
          </p>
        </div>
      </div>
    </div>
  </div>

    
  );
};

export default ContactUs;