import React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex h-[30vh] flex-col items-center justify-evenly">
      <h1>Not Found (aka 404)</h1>
      <p>
        Estás buscando algo que no existe, no ha existido, no existirá, tal vez no exista
        o no deba existir ...
      </p>
      <p>
        ... pero siempre eres bienvenido/a a volver al{" "}
        <a href="/" className="text-primary underline">
          Home.
        </a>
      </p>
      <p>-GID ;)</p>
    </div>
  );
};

export default ErrorPage;
