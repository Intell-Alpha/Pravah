import React from 'react';
import Header from './Header'; // Import the Header component
import Chatbot from './chatbot';
import About from './About';
import Footer from './Footer';
import './Home.css';

const teamMembers = [
  {
    name: 'Devansh Makam',
    photo: '/devansh.jpg', // Replace with your image path
    position: 'CEO',
  },
  {
    name: 'Vishwas Yeleshwaram',
    photo: '/vishwaa.jpg', // Replace with your image path
    position: 'CTO',
  },
  {
    name: 'Sanjana Jhansi',
    photo: '/sanjana.jpg', // Replace with your image path
    position: 'Lead Developer',
  },
  {
    name: 'Kaushal Sambanna',
    photo: '/kaushal.jpg', // Replace with your image path
    position: 'Product Manager',
  },
];

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Header */}
      <Header /> {/* Render the Header component at the top */}

      {/* Home Section with Parallax */}
      <section id="home" className="relative text-center py-16 main-content">
        <div className="parallax-background"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold leading-tight">Welcome to PRAVAH</h1>
          <p className="mt-6 text-lg text-gray-200 max-w-3xl mx-auto">
            PRAVAH is an AI-powered portal designed to streamline and automate document verification, ensuring a faster, more accurate process for managing accredited holdings. Experience the future of secure authentication and validation.
          </p>
          <div className="mt-8">
            <a href="#about" className="btn-primary">Learn More</a>
          </div>
        </div>
      </section>

      <section id="services">
        <div className="services-container">
          <div className="service-card">
            <h3>AI-powered Automated Verification</h3>
            <p>AI-powered automated verification to streamline processes and reduce errors.</p>
          </div>
          <div className="service-card">
            <h3>Tamper-proof Blockchain Storage</h3>
            <p>Tamper-proof blockchain storage to ensure document integrity and prevent fraud.</p>
          </div>
          <div className="service-card">
            <h3>User-friendly Portal</h3>
            <p>User-friendly portal accessible to authorities, entities, and individuals.</p>
          </div>
          <div className="service-card">
            <h3>Multi-factor Authentication</h3>
            <p>Multi-factor authentication to secure access for all users.</p>
          </div>
          <div className="service-card">
            <h3>Scalable Architecture</h3>
            <p>Scalable architecture ready for integration across services.</p>
          </div>
          <div className="service-card">
            <h3>Real-time Assistance</h3>
            <p>Real-time assistance with 24/7 multi-language chatbot support.</p>
          </div>
        </div>
      </section>

     {/* About Section */}
      <section id="about" className="py-12 mb-12"> {/* Added margin-bottom to About Section */}
        <About />
      </section>
      
      {/* Team Section */}
      <section id="team" className="py-12 bg-white">
        <h2 className="text-3xl font-semibold text-center">Our Team</h2>
        <p className="mt-4 text-center text-gray-600">Meet the dedicated individuals behind PRAVAH.</p>
        <div className="team-container mt-12"> {/* Increased margin-top */}
          {teamMembers.map((member, index) => (
            <div key={index} className="team-card">
              <img
                src={member.photo}
                alt={member.name}
                className="team-photo"
              />
              <h3 className="team-name">{member.name}</h3>
            </div>
          ))}
        </div>
      </section>
      {/* Footer */}
      <Footer />

      {/* Chatbot */}
      <div className="fixed bottom-5 right-5 z-10">
        <Chatbot />
      </div>
    </div>
  );
};

export default Home;
