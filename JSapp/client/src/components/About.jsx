import React, { useState } from 'react';
// This page has all FAQ's
const About = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is PRAVAH?",
      answer:
        "PRAVAH is a reliable authentication and verification platform designed to help users with various services, including physiotherapy, occupational therapy, and more.",
    },
    {
      question: "How do I sign up for PRAVAH?",
      answer:
        "You can sign up by visiting our registration page, providing your details, and following the steps to complete the process.",
    },
    {
      question: "Is PRAVAH available on mobile?",
      answer:
        "Currently, PRAVAH is a web platform, but we are working on launching mobile applications for iOS and Android in the near future.",
    },
    {
      question: "What services does PRAVAH offer?",
      answer:
        "PRAVAH offers services including physiotherapy, occupational therapy, speech therapy, vocational learning, distance learning, and inclusive education.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via the contact form on our website or by emailing support@pravah.com.",
    },
  ];

  const faqContainerStyle = {
    width: '80%',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginTop: '50px',
  };

  const faqHeadingStyle = {
    textAlign: 'center',
    fontSize: '28px',
    color: '#333',
    marginBottom: '20px',
  };

  const faqListStyle = {
    listStyle: 'none',
    padding: '0',
  };

  const faqItemStyle = {
    marginBottom: '15px',
  };

  const faqQuestionStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px',
    backgroundColor: '#f1f1f1',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const faqQuestionHoverStyle = {
    backgroundColor: '#e1e1e1',
  };

  const faqAnswerStyle = {
    padding: '10px 15px',
    backgroundColor: '#f9f9f9',
    borderLeft: '3px solid #008CBA',
    borderRadius: '0 0 8px 8px',
    marginTop: '10px',
  };

  const faqAnswerTextStyle = {
    fontSize: '16px',
    color: '#555',
  };

  return (
    <div style={faqContainerStyle}>
      <h2 style={faqHeadingStyle}>Frequently Asked Questions</h2>
      <div style={faqListStyle}>
        {faqData.map((item, index) => (
          <div key={index} style={faqItemStyle}>
            <div
              style={faqQuestionStyle}
              onClick={() => toggleAnswer(index)}
              onMouseEnter={(e) => (e.target.style.backgroundColor = faqQuestionHoverStyle.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#f1f1f1')}
            >
              <h4>{item.question}</h4>
              <span>{activeIndex === index ? '-' : '+'}</span>
            </div>
            {activeIndex === index && (
              <div style={faqAnswerStyle}>
                <p style={faqAnswerTextStyle}>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
