import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const IndividualHome = () => {
  const navigate = useNavigate();

  // Debugging - Log the component render
  useEffect(() => {
    console.log("IndividualHome component rendered!");
  }, []);

  // Redirect to service page based on service type
  const redirectToservicePage = (service) => {
    console.log(`Navigating to ${service} page`); // Debugging - Log which service is being clicked
    if (service === "Aadhar") {
      navigate("/Aadhar");
    }
    if (service === "Driving License") {
      navigate("/Driving License");
    }
    if (service === "Passport") {
      navigate("/Passport");
    }
  };

  // Handle navigation to other routes
  const handleViewFunctions = () => {
    console.log("Navigating to IndividualDashboard"); // Debugging
    navigate('/IndividualDashboard');
  };

  const handleApplications = () => {
    console.log("Navigating to IndividualApplications"); // Debugging
    navigate('/IndividualApplications');
  };

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
          <div
            key={index}
            style={styles.card}
            onClick={() => {
              redirectToservicePage(service);
            }}
          >
            {service}
          </div>
        ))}
      </div>
    </div>
  );
};

// CSS-in-JS styling
const styles = {
  container: {
    fontFamily: 'poppins, sans-serif',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    position: "absolute",
    width: "100%",
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003366',
    color: '#fffff',
    padding: '15px 30px',
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
    fontSize: '2.5rem',
    color: '#003366',
    fontWeight: 'bold',
  },
  cardContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '30px',
    padding: '0 20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px 20px',
    borderRadius: '15px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    color: '#003366',
    cursor: 'pointer',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardHover: {
    transform: 'scale(1.05)',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
  },
};

export default IndividualHome;
