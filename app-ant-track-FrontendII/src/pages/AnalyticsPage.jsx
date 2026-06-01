
import React from "react";
import { useNavigate } from "react-router-dom";

export default function AnalyticsPage() {

    const navigate = useNavigate();

  const graficos = [
    {
      titulo: "Gastos por Categoría",
      imagen: "/charts/categoria.png"
    },
    {
      titulo: "Métodos de Pago",
      imagen: "/charts/metodos_pago.png"
    },
    {
      titulo: "Evolución Temporal",
      imagen: "/charts/evolucion_gastos.png"
    },
    {
      titulo: "Top Usuarios",
      imagen: "/charts/top_usuarios.png"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-3xl font-bold mb-8">
        Dashboard Analítico
      </h1>
      <button onClick={() => navigate("/dashboard")} 
      className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow" > 
      ← Volver al Dashboard 
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {graficos.map((item, index) => (

          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4"
          >

            <h2 className="text-lg font-semibold mb-4">
              {item.titulo}
            </h2>

            <img
              src={item.imagen}
              alt={item.titulo}
              className="w-full rounded-lg"
            />

          </div>

        ))}

      </div>

    </div>
  );
}

