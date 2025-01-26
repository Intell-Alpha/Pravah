import React from 'react';
import './Footer.css';
import { AiFillInstagram, AiFillFacebook, AiFillLinkedin, AiFillPhone, AiFillMail } from 'react-icons/ai';

const Footer = () => {
  return (
    <div className="footer-bar">
      <div className="content-wrapper">
        <div className="social-media">
          <h3>Connect with Us</h3>
          <div className="links">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <AiFillInstagram size={40} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <AiFillFacebook size={40} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <AiFillLinkedin size={40} />
            </a>
          </div>
        </div>
        <div className="contact">
          <h3>Contact Information</h3>
          <p>
            <AiFillMail size={30} /> pravah@gmail.com
          </p>
          <p>
            <AiFillPhone size={30} /> +123-456-7890
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
