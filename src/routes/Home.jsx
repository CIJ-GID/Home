import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [buttons, setButtons] = useState([]);
  const containerRef = useRef(null);

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

  useEffect(() => {
    // Agregar el evento de desplazamiento a todo el contenedor de botones
    const container = containerRef.current;
    container.addEventListener("wheel", handleScroll);

    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, [buttons]);

  const handleScroll = (event) => {
    // Ajustar el desplazamiento del contenedor principal según el movimiento de la rueda del ratón
    const container = containerRef.current;
    container.scrollLeft += event.deltaY;
  };

  return (
    <div ref={containerRef} className="container" style={{ display: "flex", justifyContent: "center", overflowX: "auto" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", maxWidth: "1200px" }}>
        {buttons.map((button, index) => (
          <div key={index} style={{ flex: "0 0 30%" }}>
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
                    width: "96px", // Cambiar el ancho de la imagen al 96% del tamaño original
                    height: "96px", // Cambiar el alto de la imagen al 96% del tamaño original
                    borderRadius: "50%",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <button
                  style={{
                    border: "none",
                    background: "transparent",
                    color: "black",
                    fontSize: "19.2px", // Cambiar el tamaño de fuente del texto al 96% del tamaño original
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
