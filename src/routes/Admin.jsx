import React, { useState } from "react";
import defaultImage from "../assets/default.png"; // Ruta de la imagen por defecto
import LoginForm from "./LoginModal";

const Admin = () => {
  const [buttonData, setButtonData] = useState({
    name: "",
    ipAddress: "",
    port: "",
    imageUrl: "",
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar si el usuario está autenticado

  const handleLogin = (loggedIn) => {
    setIsLoggedIn(loggedIn);
  };

  const [buttons, setButtons] = useState([]);

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "imageUrl") {
      setButtonData((prevData) => ({
        ...prevData,
        [name]: files && files.length ? URL.createObjectURL(files[0]) : "",
      }));
    } else {
      setButtonData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleAddButton = () => {
    const { name, ipAddress, port, imageUrl } = buttonData;
    if (name.trim() && ipAddress.trim()) {
      const newImageUrl = imageUrl.trim() ? imageUrl : defaultImage;
      const newButton = {
        label: name,
        link: `${ipAddress}${port ? `:${port}` : ""}`,
        imageUrl: imageUrl.trim() ? imageUrl : newImageUrl, // Usar la imagen por defecto si no se ingresó una imagen
      };

      // Agregar el nuevo botón al estado local de buttons
      setButtons((prevButtons) => [...prevButtons, newButton]);

      // Guardar el nuevo botón en la API de json-server
      fetch("http://localhost:8000/buttons", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newButton),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Button added:", data);
        })
        .catch((error) => {
          console.error("Error saving button:", error);
        });

      // Limpiar el formulario después de agregar el botón
      setButtonData({
        name: "",
        ipAddress: "",
        port: "",
        imageUrl: "",
      });
    }
  };

  // Si el usuario no está autenticado, mostramos el modal de inicio de sesión
  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="container mx-auto max-w-md mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Admin</h1>
      <div className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Nombre de la página"
          value={buttonData.name}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="ipAddress"
          placeholder="Dirección IP"
          value={buttonData.ipAddress}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="text"
          name="port"
          placeholder="Puerto (opcional)"
          value={buttonData.port}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        <input
          type="file"
          name="imageUrl"
          accept="image/*"
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
        {buttonData.imageUrl && (
          <img
            src={buttonData.imageUrl}
            alt="Imagen Cargada"
            className="w-32 h-32 object-contain mx-auto"
          />
        )}
        <button
          onClick={handleAddButton}
          className="w-full bg-blue-500 hover:bg-blue-600 text-black font-semibold py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        >
          Agregar Botón
        </button>
      </div>
    </div>
  );
};

export default Admin;
