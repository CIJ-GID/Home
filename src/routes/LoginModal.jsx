import React, { useState } from "react";

const LoginModal = ({ onLogin }) => {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [state, setState] = useState({
    username: "",
    password: "",
  })
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(true);
 
  const handleLogin = () => {
    if (state.username === "admin" && state.password.toUpperCase() === import.meta.env.VITE_APP_PASSWORD) {
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
            value={state.username}
            onChange={(e) => setState({...state, username: e.target.value})}
            autoComplete="off"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={state.password}
            onChange={(e) => setState({...state, password: e.target.value})}
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
