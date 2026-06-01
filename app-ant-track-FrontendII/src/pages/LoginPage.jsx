import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import { saveToken, saveUser } from "../helpers/local-storage";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();

  const [users, setUser] = useState([]);
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");

  function getUser() {
    fetch(endPoints.users)
      .then((response) => response.json())
      .then((data) => setUser(data));
  }

  useEffect(() => {
    getUser();
  }, []);

  //PARA VERIFICaR QUE CARGuEN
  console.log(users);

  function findUser() {
    let auth = users.find((u) => correo == u.correo); // password == u.password para despues
    return auth;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      let userLogin = findUser();

      //validaciones en el log

      if (userLogin) {
        //saveToken(data.token);
        //local sotarge
        saveUser(userLogin);

        Swal.fire({
          icon: "success",
          title: "¡Bienvenido!",
          text: "Sesión iniciada correctamente.",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          // VALIDACIÓN ADMIN

          if (userLogin.rol === "ADMIN") {
            navigate("/admin",  { replace: true });
          } else {
            navigate("/dashboard",  { replace: true });
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: "El email o la contraseña son incorrectos.",
          confirmButtonColor: "#2563eb",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Sin conexión",
        text: "No se pudo conectar con el servidor.",
        confirmButtonColor: "#2563eb",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <img
          src="/antt.png"
          alt="AntTrack logo"
          className="w-20 mx-auto mb-4 invert"
        />
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              placeholder="tucorreo@email.com"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-1">Contraseña</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-blue-600">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}
