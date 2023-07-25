import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Obtener los botones desde la API de json-server
    fetch("http://localhost:8000/buttons")
      .then((response) => response.json())
      .then((data) => {
        setButtons(data);
      })
      .catch((error) => {
        console.error("Error getting buttons:", error);
      });
  }, []);

  return (
    <div className="container">
      <div style={{ display: "flex", gap: "10px" }}>
        {buttons.map((button, index) => (
          <div key={index}>
            <Link to={button.link}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <img
                  src={button.imageUrl}
                  alt={button.label}
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "50%",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "black",
                    fontSize: "14px",
                    marginTop: "4px",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  {button.label}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
