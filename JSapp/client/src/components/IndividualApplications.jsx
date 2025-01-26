import React, { useEffect, useState } from "react";
import { firestore, auth } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

const IndividualApplications = () => {
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

        apps.sort((a, b) => b.score - a.score);
        setApplications(apps);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);

  const handleApplicationClick = (app) => {
    setSelectedApplication(app);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedApplication(null);
  };

  const getScoreColor = (score) => {
    if (score > 95) return { color: "#4CAF50", note: "Request can be processed." };
    if (score >= 90) return { color: "#FF9800", note: "Request can be processed." };
    if (score >= 80)
      return {
        color: "#FFEB3B",
        note: "Request needs careful review.",
      };
    return {
      color: "#F44336",
      note: "Request needs caution and authority review.",
    };
  };

  const renderValue = (value) => {
    if (typeof value === "string") return value;
    if (Array.isArray(value))
      return (
        <ul>
          {value.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    if (typeof value === "object" && value !== null)
      return (
        <div>
          {Object.entries(value).map(([key, val]) => (
            <p key={key}>
              <strong>{key.replace(/_/g, " ")}:</strong> {val}
            </p>
          ))}
        </div>
      );
    return JSON.stringify(value);
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <img src="/logo_pravah.png" alt="Pravah Logo" style={styles.logo} />
        <button
          style={styles.backButton}
          onClick={() => window.history.back()}
        >
          Back
        </button>
      </header>

      <h1 style={styles.title}>Your Requests</h1>
      <div style={styles.applicationGrid}>
        {applications.map((app) => {
          const { color, note } = getScoreColor(app.score);
          return (
            <div
              key={app.id}
              style={{ ...styles.card, borderLeftColor: color }}
              onClick={() => handleApplicationClick(app)}
            >
              <h2 style={styles.cardTitle}>{app.appName}</h2>
              {app.Aadhar && <p style={styles.cardText}>Aadhar: {app.Aadhar}</p>}
              <p style={styles.cardText}>ID: {app.id}</p>
              <p style={styles.cardNote}>{note}</p>
            </div>
          );
        })}
      </div>

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h2 style={styles.popupTitle}>Application Details</h2>
            <div style={styles.popupContent}>
              {selectedApplication &&
                Object.entries(selectedApplication).map(([key, value]) => (
                  <p key={key} style={styles.popupText}>
                    <strong>{key.replace(/_/g, " ")}:</strong> {renderValue(value)}
                  </p>
                ))}
            </div>
            <button style={styles.closeButton} onClick={closePopup}>
              ✖ Close
            </button>
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
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f0f4f8",
    minHeight: "10vh",
    padding: "0",
    position: "absolute",
    top:0,
    width: "100%"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#003366",
    color: "#fff",
    padding: "15px 30px",
  },
  logo: {
    height: "50px",
  },
  backButton: {
    backgroundColor: "#1976D2",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "2px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontSize: "2rem",
    margin: "20px 0",
    color: "#003366",
  },
  applicationGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    borderLeft: "5px solid",
    cursor: "pointer",
    transition: "transform 0.3s",
  },
  cardTitle: {
    margin: "0 0 10px 0",
    fontSize: "1.5rem",
    color: "#003366",
  },
  cardText: {
    margin: "5px 0",
    color: "#555",
  },
  cardNote: {
    margin: "10px 0",
    fontStyle: "italic",
    color: "#777",
  },
  popupOverlay: {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "1000",
  },
  popup: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "10px",
    width: "90%",
    maxWidth: "600px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    overflowY: "auto",
    maxHeight: "80vh",
  },
  popupTitle: {
    fontSize: "1.5rem",
    marginBottom: "20px",
    color: "#003366",
  },
  popupContent: {
    maxHeight: "60vh",
    overflowY: "auto",
  },
  popupText: {
    margin: "10px 0",
    lineHeight: "1.5",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#ff5c5c",
    color: "#fff",
    border: "none",
    borderRadius: "0%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    backgroundColor: "#003366",
    color: "#fff",
    padding: "10px",
  },
};

export default IndividualApplications;
