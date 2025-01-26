import React, { useState, useEffect } from "react";
import { firestore, auth } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { AiOutlineFile } from "react-icons/ai";
import bgImage from "../assets/bg4.jpg";

const IndividualDashboard = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (auth.currentUser) {
      getUserDocuments();
    } else {
      setError("User is not authenticated.");
    }
  }, []);

  const getUserDocuments = async () => {
    setLoading(true);
    setError("");
    setDocuments([]);

    try {
      const path = `users/${auth.currentUser.uid}/documents`;
      const querySnapshot = await getDocs(collection(firestore, path));

      const docsData = querySnapshot.docs.map((doc) => ({
        category: doc.id,
        ...doc.data(),
      }));

      if (docsData.length === 0) {
        setError("No documents found for this User ID");
      } else {
        setDocuments(docsData);
        setFilteredDocuments(docsData);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      setError("Error fetching documents.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchInput = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.trim() === "") {
      setFilteredDocuments(documents);
    } else {
      const filtered = documents.filter((doc) =>
        doc.category.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDocuments(filtered);
    }
  };

  const sections = ["Education", "Finance", "Identity", "Miscellaneous", "Work"];

  return (
    <div style={styles.fullPage}>
      <img src="/logo_pravah.png" alt="Pravah Logo" style={styles.logo} />

      <div style={styles.container}>
        <h2 style={styles.header}>Individual Dashboard</h2>

        {/* Search Bar */}
        <div style={styles.searchBar}>
          <input
            type="text"
            placeholder="Search Documents"
            value={searchValue}
            onChange={handleSearchInput}
            style={styles.input}
          />
        </div>

        {/* Error Message */}
        {error && <p style={styles.error}>{error}</p>}

        {/* Sections */}
        <div style={styles.sectionsContainer}>
          {sections.map((section, idx) => (
            <div key={idx} style={styles.sectionCard}>
              <h3 style={styles.sectionTitle}>{section}</h3>

              {/* Documents under each section */}
              <div style={styles.documentsGrid}>
                {filteredDocuments
                  .filter((doc) => doc.category === section)
                  .flatMap((doc) =>
                    Object.entries(doc)
                      .filter(([key]) => key !== "category")
                      .map(([key, value], index) => (
                        <div key={index} style={styles.documentCard}>
                          <img 
                            src="https://cdn-icons-png.freepik.com/256/7515/7515621.png?semt=ais_hybrid" 
                            alt="Document Icon" 
                            style={{ width: "100px", height: "120px" }} 
                          />
                          <p style={styles.documentName}>{key}</p>
                          <a
                            href={value}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={styles.documentLink}
                          >
                            View
                          </a>
                        </div>
                      ))
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  fullPage: {
    minHeight: "100vh",
    width: "100vw",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "absolute", // Change from 'relative' to 'absolute'
    top: 0, // Ensure it starts from the top without space
    left: 0, // Ensure it covers the full width of the viewport
    padding: "0",
  },
  logo: {
    position: "absolute",
    top: "10px",
    left: "40px",
    width: "250px",
    height: "auto",
  },
  container: {
    maxWidth: "1650px",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "15px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  header: {
    textAlign: "center",
    fontSize: "36px",
    marginBottom: "20px",
    fontFamily: "poppins, sans-serif",
  },
  searchBar: {
    position: "absolute", // Change to absolute positioning
    top: "20px", // Adjust the distance from the top
    right: "20px", // Adjust the distance from the right side
    display: "flex",
    justifyContent: "center",
    marginBottom: "0", // Remove any bottom margin as it’s not needed
  },
  input: {
    width: "100%",
    maxWidth: "400px",
    padding: "10px",
    borderRadius: "20px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "16px",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginTop: "10px",
  },
  sectionsContainer: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
  },
  sectionCard: {
    backgroundColor: "#f7f7f7",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  documentsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: "15px",
  },
  documentCard: {
    backgroundColor: "#fff",
    padding: "30px",
    textAlign: "center",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  documentName: {
    fontSize: "14px",
    margin: "10px 0",
    fontWeight: "500",
  },
  documentLink: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "14px",
  },
};

export default IndividualDashboard;
