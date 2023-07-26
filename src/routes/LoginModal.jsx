import React, { useState } from "react";

const LoginModal = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);

  const handleLogin = () => {
    if (username === "admin" && password === "gid12345") {
      setError("");
      onLogin(true);
      setIsOpen(false);
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={closeModal}>
            &times;
          </span>
          <h2>Iniciar sesión</h2>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
          <button onClick={handleLogin}>Iniciar sesión</button>
          {error && <p className="error">{error}</p>}
        </div>
      </div>
    )
  );
};

export default LoginModal;
