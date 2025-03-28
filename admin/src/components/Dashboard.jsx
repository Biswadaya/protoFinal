import React, { useEffect, useState } from "react";
import NavBar from "./Navbar"

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        console.log("Fetching files...");
        const response = await fetch("http://localhost:9090/files");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("API response:", data);
        
        // Ensure we have the expected data structure
        if (data && Array.isArray(data.files)) {
          setFiles(data.files);
        } else {
          throw new Error("Invalid data format from API");
        }
      } catch (err) {
        console.error("Error fetching files:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  return (
    <>
    <NavBar/>
      <div style={styles.dashboard}>
      <h1 style={styles.heading}>File Analytics Dashboard</h1>
      
      {error ? (
        <div style={styles.error}>
          Error loading files: {error}
        </div>
      ) : loading ? (
        <p style={styles.loading}>Loading files...</p>
      ) : (
        <div style={styles.container}>
          {files.length > 0 ? (
            files.map((file, index) => (
              <div key={index} style={styles.fileBox}>
                <h3>{file.name}</h3>
                <p>
                  <strong>Size:</strong> {file.size} KB
                </p>
                <p>
                  <strong>Last Modified:</strong> {new Date(file.lastModified).toLocaleString()}
                </p>
                <div
                  style={{
                    ...styles.statusBox,
                    backgroundColor: file.isSigned ? "#28a745" : "#dc3545",
                  }}
                >
                  {file.isSigned ? "Signed" : "Not Signed"}
                </div>
              </div>
            ))
          ) : (
            <p style={styles.noFiles}>No files found</p>
          )}
        </div>
      )}
    </div>
    </>
  );
};

// Updated styles
const styles = {
  dashboard: {
    background: "linear-gradient(to right, #141e30, #243b55)",
    minHeight: "100vh",
    color: "white",
    textAlign: "center",
    padding: "20px",
  },
  heading: {
    marginTop:"4rem",
    fontSize: "2rem",
    marginBottom: "20px",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "20px",
  },
  fileBox: {
    backgroundColor: "#1e293b",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(255, 255, 255, 0.2)",
    minWidth: "250px",
    textAlign: "left",
  },
  statusBox: {
    marginTop: "10px",
    padding: "8px",
    borderRadius: "5px",
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  loading: {
    fontSize: "1.2rem",
  },
  noFiles: {
    fontSize: "1.2rem",
    color: "#aaa",
  },
  error: {
    color: "#ff6b6b",
    backgroundColor: "#2d2d2d",
    padding: "15px",
    borderRadius: "5px",
    maxWidth: "500px",
    margin: "0 auto",
  },
};

export default Dashboard;