import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { authFetch, getUser } from "../helpers/local-storage";
import { endPoints } from "../services/api";

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#d97706",
  "#7c3aed",
  "#0891b2",
];

export default function EstadisticasPage() {
  const activeUser = getUser("user");
  const navigate = useNavigate();

  // ── Selector de mes y año ─
  const hoy = new Date();
  const [mes, setMes] = useState(hoy.getMonth() + 1);
  const [anio, setAnio] = useState(hoy.getFullYear());

  // ── Estados de datos ─
  const [resumen, setResumen] = useState(null);
  const [statsCategorias, setStatsCategorias] = useState([]);
  const [statsMetodos, setStatsMetodos] = useState([]);
  const [statsMeses, setStatsMeses] = useState([]);
  const [topComercios, setTopComercios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ── Carga de datos reales ──────────────────────
  console.log("activeUser completo:", activeUser);
  console.log("id del usuario:", activeUser?.id);
  useEffect(() => {
    const cargarDatos = async () => {
      setLoading(true);
      setError(null);
      try {
        const id = activeUser.id;

        const [resumenRes, catRes, mesRes, metodosRes, comerciosRes] =
          await Promise.all([
            authFetch(endPoints.reportes.resumen(id, mes, anio)),
            authFetch(endPoints.reportes.porCategoria(id, mes, anio)),
            authFetch(endPoints.reportes.porMes(id, anio)),
            authFetch(endPoints.reportes.porMetodoPago(id, mes, anio)),
            authFetch(endPoints.reportes.topComercios(id, mes, anio)),
          ]);

        console.log("resumen status:", resumenRes.status);
        console.log("categorias status:", catRes.status);
        console.log("meses status:", mesRes.status);
        console.log("metodos status:", metodosRes.status);
        console.log("comercios status:", comerciosRes.status);

        // Verificamos que todas las respuestas sean ok
        //   if (!resumenRes.ok || !catRes.ok || !mesRes.ok || !metodosRes.ok || !comerciosRes.ok) {
        //   throw new Error("Error en la respuesta del servidor");
        //}

        const [resumenData, catData, mesData, metodosData, comerciosData] =
          await Promise.all([
            resumenRes.json(),
            catRes.json(),
            mesRes.json(),
            metodosRes.json(),
            comerciosRes.json(),
          ]);

        setResumen(resumenData);
        setStatsCategorias(catData); // { nombreCategoria, gastoReal, porcentajeDelTotal }
        setStatsMeses(mesData); // { mes, totalGastado }
        setStatsMetodos(metodosData); // { nombreMetodoPago, totalGastado }
        setTopComercios(comerciosData); // { nombreComercio, totalGastado }

        console.log("resumen es array:", Array.isArray(resumenData));
        console.log("categorias es array:", Array.isArray(catData));
        console.log("meses es array:", Array.isArray(mesData));
        console.log("metodos es array:", Array.isArray(metodosData));
        console.log("comercios es array:", Array.isArray(comerciosData));

        console.log(mesData);
      } catch (err) {
        console.error("Error exacto:", err.message, err);
        setError(`Error: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (activeUser?.id) cargarDatos();
  }, [mes, anio]); // se recarga al cambiar mes o año

  // ── Nombres de meses para el selector ─────────
  const nombresMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Estadísticas</h2>
          <p className="text-gray-500 mt-1">Vista gráfica de tus gastos</p>
        </div>
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver al panel
        </button>
      </div>

      {/* Selector de mes y año */}
      <div className="flex gap-4 mb-8">
        <select
          value={mes}
          onChange={(e) => setMes(Number(e.target.value))}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm"
        >
          {nombresMeses.map((nombre, i) => (
            <option key={i + 1} value={i + 1}>
              {nombre}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={anio}
          onChange={(e) => setAnio(Number(e.target.value))}
          min="2020"
          max="2030"
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700 shadow-sm w-28"
        />
      </div>

      {/* Estados de carga y error */}
      {loading && (
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-400 text-lg">Cargando estadísticas...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 rounded-lg p-4 mb-6">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          {/* Tarjetas resumen */}
          {resumen && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white rounded-xl shadow p-5 border-l-4 border-blue-500">
                <p className="text-gray-500 text-sm">Total gastado</p>
                <p className="text-2xl font-bold text-blue-600">
                  ${resumen.totalGastado?.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-5 border-l-4 border-green-500">
                <p className="text-gray-500 text-sm">Presupuesto</p>
                <p className="text-2xl font-bold text-green-600">
                  ${resumen.presupuesto?.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-5 border-l-4 border-purple-500">
                <p className="text-gray-500 text-sm">Disponible</p>
                <p className="text-2xl font-bold text-purple-600">
                  ${resumen.disponible?.toLocaleString()}
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-5 border-l-4 border-yellow-500">
                <p className="text-gray-500 text-sm">Presupuesto usado</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {resumen.porcentajeUsado?.toFixed(1)}%
                </p>
              </div>
            </div>
          )}

          {/* Barras: gastos por mes */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Gastos por mes — {anio}
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={statsMeses}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  formatter={(v) => [`$${v.toLocaleString()}`, "Total"]}
                />
                <Bar dataKey="totalGastado" name="Total" radius={[4, 4, 0, 0]}>
                  {statsMeses.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index % 2 === 0 ? "#2563eb" : "#dc2626"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tortas + Top comercios */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Por categoría */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Por categoría
              </h3>
              {statsCategorias.length === 0 ? (
                <p className="text-gray-400 text-center py-10">
                  Sin gastos este mes
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={statsCategorias}
                      dataKey="gastoReal"
                      nameKey="nombreCategoria"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ nombreCategoria, porcentajeDelTotal }) =>
                        `${nombreCategoria} ${porcentajeDelTotal}%`
                      }
                    >
                      {statsCategorias.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend
                      formatter={(value, entry) =>
                        entry.payload.nombreCategoria
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            {/* Por método de pago */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">
                Por método de pago
              </h3>
              {statsMetodos.length === 0 ? (
                <p className="text-gray-400 text-center py-10">
                  Sin gastos este mes
                </p>
              ) : (
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={statsMetodos}
                      dataKey="totalGastado"
                      nameKey="nombreMetodoPago"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label={({ nombreMetodoPago, percent }) =>
                        `${nombreMetodoPago} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {statsMetodos.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
                    <Legend
                      formatter={(value, entry) =>
                        entry.payload.nombreMetodoPago
                      }
                    />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Top comercios */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Top 5 comercios
            </h3>
            {topComercios.length === 0 ? (
              <p className="text-gray-400 text-center py-10">
                Sin datos este mes
              </p>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={topComercios} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis
                    type="number"
                    tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                  />

                  <YAxis type="category" dataKey="nombreComercio" width={120} />

                  <Tooltip
                    formatter={(v) => [`$${v.toLocaleString()}`, "Total"]}
                  />

                  <Bar dataKey="totalGastado" radius={[0, 4, 4, 0]}>
                    {topComercios.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </>
      )}
    </div>
  );
}
