import PropTypes from 'prop-types';
import React, { memo, useEffect, useState } from 'react';
import { firestore, auth } from '../../../firebase/config'; // Import Firestore and auth from your config
import { collection, getDocs } from 'firebase/firestore';
import { doc, setDoc } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid'; // Import UUID for unique IDs

const NewRegistration = memo(() => {
  const [identityProof, setIdentityProof] = useState('');
  const [dobProof, setDobProof] = useState('');
  const [nameProofOptions, setNameProofOptions] = useState([]); // State to hold document options

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const path = `users/${auth.currentUser.uid}/documents`;
        const querySnapshot = await getDocs(collection(firestore, path));

        const options = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          for (const [key, value] of Object.entries(data)) {
            if (value) options.push({ name: key, link: value }); // Collect document names and links
          }
        });

        setNameProofOptions(options); // Set the document options in state
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchDocuments();
  }, []); // Fetch documents only once on mount

  const handleFileSelect = (e, setFile) => {
    setFile(e.target.value);
  };

  const handleSubmit = async () => {
    if (!identityProof || !dobProof) {
      alert('Please select both Identity Proof and DOB Proof');
      return; // Ensure both proofs are selected
    }

    const uniqueId = uuidv4(); // Generate a unique ID
    const applicationData = {
      appName: 'New Registration',
      POI_document: identityProof,
      POI_link: nameProofOptions.find(option => option.name === identityProof)?.link || '', // Get link for Identity Proof
      POA_document: dobProof,
      POA_link: nameProofOptions.find(option => option.name === dobProof)?.link || '', // Get link for DOB Proof
      score: 100,
      summary: 'Since it is a new registration, we take accredited documents and generate a certificate on that details if one doesn\'t already exist'
    };

    try {
      // Upload to current user's applications
      await setDoc(doc(collection(firestore, `users/${auth.currentUser.uid}/applications`), uniqueId), applicationData);
      
      // Upload to the hardcoded user ID (for example: 'FGuEricT0iUdcSwe7Z5oTaYMgR02')
      await setDoc(doc(collection(firestore, `users/FGuEricT0iUdcSwe7Z5oTaYMgR02/applications`), uniqueId), applicationData);

      alert('Application submitted successfully!'); // Alert on success
    } catch (error) {
      console.error('Error uploading application:', error);
      alert('Failed to submit application. Please try again.');
    }
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

      <h1 style={styles.title}>Aadhar New Registration</h1>

      <div style={styles.form}>
        <label style={styles.label}>Select Identity Proof</label>
        <select 
          value={identityProof} 
          onChange={(e) => handleFileSelect(e, setIdentityProof)}
          style={styles.select}
        >
          <option value="">-- Select File --</option>
          {nameProofOptions.map((docOption, index) => (
            <option key={index} value={docOption.name}>
              {docOption.name}
            </option>
          ))}
        </select>

        <label style={styles.label}>Select Proof of Date of Birth</label>
        <select 
          value={dobProof} 
          onChange={(e) => handleFileSelect(e, setDobProof)}
          style={styles.select}
        >
          <option value="">-- Select File --</option>
          {nameProofOptions.map((docOption, index) => (
            <option key={index} value={docOption.name}>
              {docOption.name}
            </option>
          ))}
        </select>

        <button style={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2024 Pravah. All Rights Reserved.</p>
      </footer>
    </div>
  );
});

NewRegistration.propTypes = {};

export default NewRegistration;

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
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    margin: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: '1.2rem',
    color: '#333',
    fontWeight: 'bold',
  },
  select: {
    width: '300px',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  submitButton: {
    backgroundColor: '#008CBA',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
  },
  footer: {
    marginTop: 'auto',
    backgroundColor: '#003366',
    color: '#fff',
    textAlign: 'center',
    padding: '10px 0',
  },
};
