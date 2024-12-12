import React, { memo, useState, useEffect } from 'react';
import { firestore, auth } from '../../../firebase/config';
import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';

const AddressChange = memo(() => {
  const [address, setAddress] = useState({
    houseNum: '',
    street: '',
    area: '',
    city: '',
    state: '',
    pincode: '',
  });

  const [nameProofOptions, setNameProofOptions] = useState([]);
  const [selectedProof, setSelectedProof] = useState({ name: '', link: '' });
  const [result, setResult] = useState({ score: '', summary: '' });
  const [aadhar, setAadhar] = useState('');

  // Fetch name proof options and Aadhar number from Firestore
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userPath = `users/${auth.currentUser.uid}`;
  
        // Fetch the Aadhar number
        const userDoc = await getDoc(doc(firestore, userPath));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          console.log('User Data:', userData); // Debugging log
          setAadhar(userData.Aadhar || ''); // Set Aadhar number if available
        } else {
          console.error('User document does not exist');
        }
  
        // Fetch name proof options
        const docsPath = `${userPath}/documents`;
        console.log('Fetching documents from:', docsPath); // Debugging log
  
        const querySnapshot = await getDocs(collection(firestore, docsPath));
        if (querySnapshot.empty) {
          console.warn('No documents found'); // Warn if no documents are found
        }
  
        const options = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Document Data:', data); // Debugging log
  
          for (const [key, value] of Object.entries(data)) {
            if (value) options.push({ name: key, link: value });
          }
        });
  
        console.log('Options:', options); // Debugging log
        setNameProofOptions(options);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleProofSelect = (e) => {
    const selectedName = e.target.value;
    const selectedOption = nameProofOptions.find(
      (option) => option.name === selectedName
    );
    setSelectedProof(selectedOption || { name: '', link: '' });
  };

  const handleSubmit = async () => {
    const { houseNum, street, area, city, state, pincode } = address;
    const fullAddress = `${houseNum}, ${street}, ${area}, ${city}, ${state} - ${pincode}`;
    console.log('Submitting:', fullAddress);

    const data = {
      fullText: fullAddress,
      proofName: selectedProof.name,
      proofLink: selectedProof.link,
    };

    try {
      const response = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setResult(result);

        if (result.score < 50) {
          alert(
            'Your address is not verified. Please try again with correct details.'
          );
        } else {
          const newApplication = {
            appName: 'Aadhar Address Change',
            newAddress: fullAddress,
            Aadhar: aadhar,
            proofFileName: selectedProof.name,
            proofFileLink: selectedProof.link,
            score: result.score,
            summary: result.summary,
            createdAt: new Date().toISOString(),
          };

          const userPath = `users/${auth.currentUser.uid}/applications`;
          const specificPath = '/users/FGuEricT0iUdcSwe7Z5oTaYMgR02/applications';

          const newDocRef = doc(collection(firestore, userPath));
          const docId = newDocRef.id;

          await setDoc(newDocRef, newApplication);
          const specificDocRef = doc(firestore, `${specificPath}/${docId}`);
          await setDoc(specificDocRef, newApplication);

          alert('Application submitted successfully!');
        }
      } else {
        alert('Failed to submit the data');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/logo_pravah.png" alt="Pravah Logo" style={styles.logo} />
        <button style={styles.backButton} onClick={() => window.history.back()}>
          Back
        </button>
      </header>

      <h1 style={styles.title}>Aadhar Address Change</h1>

      <div style={styles.form}>
        {['houseNum', 'street', 'area', 'city', 'state', 'pincode'].map((field) => (
          <div key={field} style={styles.inputGroup}>
            <label style={styles.label}>
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type="text"
              name={field}
              value={address[field]}
              onChange={handleAddressChange}
              placeholder={`Enter ${field}`}
              style={styles.input}
            />
          </div>
        ))}

        <label style={styles.label}>Select Proof of Address</label>
        <select
          value={selectedProof.name}
          onChange={handleProofSelect}
          style={styles.select}
        >
          <option value="">-- Select Document --</option>
          {nameProofOptions.map((option, index) => (
            <option key={index} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>

        <button style={styles.submitButton} onClick={handleSubmit}>
          Submit
        </button>

        {result.summary && (
          <div style={styles.result}>
            <h3>Score: {result.score}</h3>
            <h3>Summary: {result.summary}</h3>
          </div>
        )}
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2024 Pravah. All Rights Reserved.</p>
      </footer>
    </div>
  );
});

export default AddressChange;

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
  inputGroup: {
    width: '300px',
  },
  label: {
    fontSize: '1rem',
    color: '#333',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '1rem',
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
