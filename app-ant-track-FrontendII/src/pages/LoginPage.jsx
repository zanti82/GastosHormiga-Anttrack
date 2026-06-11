import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import { saveToken, saveUser } from "../helpers/local-storage";
import Swal from "sweetalert2";

export default function LoginPage() {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    console.log("API BASE:", import.meta.env.VITE_API_URL);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            // ✅ send credentials to backend
            const response = await fetch(endPoints.auth.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    correo: correo,
                    password: password
                })
            });

            // ✅ get response data
            const data = await response.json();
            console.log("LOGIN RESPONSE:", data)  // ← add this

            // ✅ check if login failed
            if (!response.ok) {
                Swal.fire({
                    icon: "error",
                    title: "Credenciales incorrectas",
                    text: data.message || "El email o la contraseña son incorrectos.",
                    confirmButtonColor: "#2563eb",
                });
                return;
            }

            // ✅ save token and user from LoginResponseDTO
            saveToken(data.token);
            saveUser({
              id: data.id,                          
              nombre: data.nombre,                  
              identificacion: data.identificacion,
              correo: data.correo,
              rol: data.rol
          });

            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                text: data.message || "Sesión iniciada correctamente.",
                confirmButtonColor: "#2563eb",
            }).then(() => {
                if (data.rol === "ADMIN") {
                    navigate("/admin", { replace: true });
                } else {
                    navigate("/dashboard", { replace: true });
                }
            });

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