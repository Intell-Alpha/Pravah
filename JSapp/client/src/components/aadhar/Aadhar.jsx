import React, { memo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { firestore, auth } from '../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const Aadhar = memo(() => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [showNewRegistration, setShowNewRegistration] = useState(false); // State to control visibility

  // Fetch user documents when the component mounts
  useEffect(() => {
    const getUserDocuments = async () => {
      if (auth.currentUser) {
        setDocuments([]); // Reset documents

        try {
          const path = `users/${auth.currentUser.uid}/documents`;
          const querySnapshot = await getDocs(collection(firestore, path));

          // Extract document data while excluding the 'category'
          const docsData = querySnapshot.docs.map((doc) => {
            const data = doc.data();
            delete data.category; // Remove the category field
            return data; // Return the remaining fields
          });

          console.log(docsData);
          setDocuments(docsData); // Store the documents

          // Check for the presence of the Aadhar document
          const hasAadhar = docsData.some(doc => 
            Object.keys(doc).some(key => key.toLowerCase() === 'aadhar')
          );

          // Set the visibility of services based on Aadhar presence
          setShowNewRegistration(!hasAadhar); // If Aadhar is not present, show New Registration
        } catch (error) {
          console.error("Error fetching documents:", error);
          console.log('Error fetching documents.');
        }
      }
    };

    getUserDocuments(); // Call the inner function
  }, []); // Empty dependency array to run once on mount

  // List of Aadhar-specific services
  const services = showNewRegistration 
    ? [{ name: 'New Registration', path: '/aadhar/new-registration' }] // Only show New Registration if Aadhar is not present
    : [
        { name: 'Aadhar Address Update', path: '/aadhar/address-update' },
        { name: 'Aadhar Name Change', path: '/aadhar/name-change' },
      ];

  // Handle card click to navigate to service-specific pages
  const handleServiceClick = (path) => {
    navigate(path);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <img 
          src="/logo_pravah.png" 
          alt="Pravah Logo" 
          style={styles.logo} 
        />
        <button style={styles.backButton} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </header>

      {/* Title Section */}
      <h1 style={styles.title}>Aadhar Services</h1>

      {/* Services List */}
      <div style={styles.cardContainer}>
        {services.map((service, index) => (
          <div 
            key={index} 
            style={styles.card} 
            onClick={() => handleServiceClick(service.path)}
          >
            {service.name}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Pravah. All Rights Reserved.</p>
      </footer>
    </div>
  );
});

// CSS-in-JS styling
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f4f4f4',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003366',
    color: '#fff',
    padding: '15px 30px',
  },
  logo: {
    height: '50px',
    width: 'auto',
    maxWidth: '100%',
    objectFit: 'contain',
  },
  backButton: {
    backgroundColor: '#008CBA',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  title: {
    textAlign: 'center',
    margin: '30px 0',
    fontSize: '2rem',
    color: '#003366',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '0 20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#333',
    cursor: 'pointer',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#003366',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
  },
};

export default Aadhar;
