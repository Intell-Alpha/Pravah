import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineSearch, AiFillDelete } from 'react-icons/ai'; // Icons (if needed)

const IndividualHome = () => {
  const navigate = useNavigate();
  const redirectToservicePage= (service) => {
     if (service === "Aadhar"){
        navigate("/Aadhar");
     }
     if(service === "Driving License"){
        navigate("/Driving License");
     }
     if (service === "Passport"){
        navigate("/Passport");
     }
  }
  // Handle navigation to another route
  const handleViewFunctions = () => {
    navigate('/IndividualDashboard');
  };
  const handleApplications = () => {
    navigate('/IndividualApplications');
  }
  // List of services to render
  const services = [
    'Aadhar',
    'Passport',
    'Driving License',
    'PAN Card',
    'Income Certificate',
    'Caste Certificate',
  ];

  return (
    <div style={styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <img
          src="/logo_pravah.png"
          alt="Pravah Logo"
          style={styles.logo}
        />
        <button style={styles.viewButton} onClick={handleApplications}>
          Current Applications
        </button>
        <button style={styles.viewButton} onClick={handleViewFunctions}>
          Your Documents
        </button>
      </header>

      {/* Title Section */}
      <h1 style={styles.title}>Our Services</h1>

      {/* Services List */}
      <div style={styles.cardContainer}>
        {services.map((service, index) => (
          <div key={index} style={styles.card} onClick={() => {redirectToservicePage(service)}}>
            {service}
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

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
  viewButton: {
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

export default IndividualHome;
