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
    <div ref={containerRef} className="container overflow-y-scroll py-20">
      <div className="grid grid-cols-4 gap-4">
        {buttons.map((button, index) => (
          <Link to={button.link} key={index} className="flex items-center justify-between w-72 rounded-lg bg-white/10 p-4 backdrop-blur-lg transition-all duration-100 shadow-xl hover:bg-white/20 hover:shadow-3xl overflow-hidden">
              <img
                src={button.imageUrl}
                alt={button.label}
                className="mx-auto mb-2 h-20 w-20 rounded-full object-cover shadow-md"
              />
              <h1 className="w-full text-sm font-semibold text-white flex items-center justify-center">{button.label}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
