import React, { useState, useEffect } from "react";


const Home = () => {
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    // Función para obtener los botones desde el archivo buttons.json
    const getButtonsData = async () => {
      try {
        const response = await fetch("../buttons.json"); // Ruta al archivo buttons.json
        const buttonsData = await response.json();
        setButtons(buttonsData);
      } catch (error) {
        console.error("Error reading buttons.json:", error);
      }
    };

    // Llamamos a la función para obtener los botones
    getButtonsData();
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
