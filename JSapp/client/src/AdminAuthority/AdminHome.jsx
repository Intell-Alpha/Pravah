import React, { useEffect, useState } from 'react';
import { firestore, auth } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';

const AdminHome = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const path = `users/${auth.currentUser.uid}/applications`;
        const querySnapshot = await getDocs(collection(firestore, path));
        
        const apps = [];
        querySnapshot.forEach((doc) => {
          apps.push({ id: doc.id, ...doc.data() });
        });

        // Sort applications based on score in non-ascending order
        apps.sort((a, b) => b.score - a.score);
        
        setApplications(apps);
      } catch (error) {
        console.error('Error fetching applications:', error);
      }
    };

    fetchApplications();
  }, []);

  const handleApplicationClick = (app) => {
    setSelectedApplication(app);
    setShowPopup(true);
  };

  const renderValu = (value) => {
    const isValidUrl = (url) => {
      try {
        new URL(url); // Check if the value is a valid URL
        return true;
      } catch {
        return false;
      }
    };
  
    if (typeof value === 'string' && isValidUrl(value)) {
      return (
        <a href={value} target="_blank" rel="noopener noreferrer" style={styles.link}>
          {value}
        </a>
      );
    }
    return value; // Render plain text if not a link
  };
  
  const closePopup = () => {
    setShowPopup(false);
    setSelectedApplication(null);
  };

  const getScoreColor = (score) => {
    if (score > 95) return { color: 'green', note: 'Request can be processed.', noteColor: 'green' };
    if (score >= 90) return { color: 'orange', note: 'Request can be processed.', noteColor: 'green' };
    if (score >= 80) return { color: 'yellow', note: 'Request needs to be processed with caution and careful review of the authority.', noteColor: 'red' };
    return { color: 'red', note: 'Request needs to be processed with caution and careful review of the authority.', noteColor: 'red' };
  };

  const renderValue = (value) => {
    if (typeof value === 'string') {
      return value; // Display strings directly
    }
    if (Array.isArray(value)) {
      return (
        <ul style={{ paddingLeft: '20px' }}>
          {value.map((item, index) => (
            <li key={index}>{typeof item === 'object' ? JSON.stringify(item) : item}</li>
          ))}
        </ul>
      ); // Display arrays as lists
    }
    if (typeof value === 'object' && value !== null) {
      return (
        <div>
          {Object.entries(value).map(([subKey, subValue]) => (
            <p key={subKey}>
              <strong>{subKey.replace(/_/g, ' ')}:</strong> {renderValue(subValue)}
            </p>
          ))}
        </div>
      ); // Recursively render nested objects
    }
    return JSON.stringify(value); // Fallback for any other types
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img 
          src="/logo_pravah.png" 
          alt="Pravah Logo" 
          style={styles.logo} 
        />
        <button style={styles.backButton} onClick={() => window.history.back()}>
          Back
        </button>
      </header>

      <h1 style={styles.title}>Your Requests</h1>
      <ul style={styles.applicationList}>
        {applications.map((app) => {
          const { color, note, noteColor } = getScoreColor(app.score);
          
          return (
            <li 
              key={app.id} 
              style={styles.applicationItem} 
              onClick={() => handleApplicationClick(app)}
            >
              <div style={{ ...styles.scoreIndicator, backgroundColor: color }}></div>
              <div style={styles.applicationContent}>
                <h2 style={styles.appName}>{app.appName}</h2>
                {app.Aadhar && <p style={styles.appId}>Aadhar Number: {app.Aadhar}</p>}
                <p style={styles.appId}>ID: {app.id}</p>
                <p style={{ ...styles.note, color: noteColor }}>{note}</p>
              </div>
            </li>
          );
        })}
      </ul>

    {showPopup && (
        <div style={styles.popupOverlay}>
            <div style={styles.popup}>
            <h2 style={styles.popupTitle}>Application Details</h2>
            <div style={styles.popupContent}>
                {selectedApplication &&
                Object.entries(selectedApplication).map(([key, value]) => (
                    <div key={key} style={styles.popupText}>
                    <strong>{key.replace(/_/g, ' ')}:</strong> {renderValu(value)}
                    </div>
                ))}
            </div>
            <button style={styles.closeButton} onClick={closePopup}>✖ Close</button>
            </div>
        </div>
        )}

      <footer style={styles.footer}>
        <p>&copy; 2024 Pravah. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
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
    fontSize: '2rem',
    marginTop: '20px',
    marginBottom: '20px',
    color: '#003366',
  },
  applicationList: {
    listStyleType: 'none',
    padding: '0',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  applicationItem: {
    display: 'flex',
    alignItems: 'flex-start',
    padding: '20px',
    margin: '10px 0',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    cursor: 'pointer',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'background-color 0.3s, transform 0.3s',
    border: '1px solid #ddd',
  },
  scoreIndicator: {
    width: '8px', // width of the vertical line
    height: '100%', // full height of the tile
    borderRadius: '5px',
    marginRight: '15px', // space between line and content
  },
  applicationContent: {
    flexGrow: 1,
  },
  appName: {
    margin: '0',
    fontSize: '1.5rem',
  },
  appId: {
    margin: '5px 0 0 0',
    color: '#666',
  },
  note: {
    marginTop: '5px',
    fontStyle: 'italic',
  },
  popupOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    width: '80%', // increased width for better layout
    maxWidth: '800px', // increased max width
    height: 'auto', // allows for variable height based on content
    position: 'relative',
  },
  popupTitle: {
    marginTop: '20px',
    marginBottom: '20px',
  },
  popupContent: {
    marginBottom: '20px',
  },
  popupText: {
    margin: '10px',
  },
  link: {
    color: '#008CBA',
    textDecoration: 'none',
  },
  closeButton: {
    backgroundColor: '#ff5c5c',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  footer: {
    marginTop: '20px',
    backgroundColor: '#003366',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
  },
};

export default AdminHome;
