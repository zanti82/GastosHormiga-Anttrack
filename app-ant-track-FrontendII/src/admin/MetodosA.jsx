import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import Swal from "sweetalert2";

const FORMAS_PAGO = [
  "EFECTIVO",
  "TARJETA_CREDITO",
  "TARJETA_DEBITO",
  "NEQUI",
  "DAVIPLATA",
  "TRANSFERENCIA",
];
const FRANQUICIAS = ["VISA", "MASTERCARD", "AMERICAN_EXPRESS", "OTRA"];

export default function MetodosA() {
  const navigate = useNavigate();

  const [metodos, setMetodos] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    formaPago: "",
    franquicia: "",
    descripcion: "",
  });

  // ── GET ──────────────────────────────────────────
  function getMetodos() {
    fetch(endPoints.metodoPago)
      .then((res) => res.json())
      .then((data) => setMetodos(data))
      .catch((err) => console.error("Error al cargar métodos de pago:", err));
  }

  useEffect(() => {
    getMetodos();
  }, []);

  // ── HANDLE CHANGE ────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── POST ─────────────────────────────────────────
  async function handleCrear(e) {
    e.preventDefault();

    const nuevo = {
      formaPago: form.formaPago,
      franquicia: form.franquicia,
      descripcion: form.descripcion,
      estado: "ACTIVO",
    };

    try {
      const res = await fetch(endPoints.metodoPago, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Método de pago creado",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getMetodos();
        });
      } else {
        const errData = await res.json().catch(() => null);
        Swal.fire({
          icon: "error",
          title: "Error al crear",
          text: errData?.message || errData?.error || `Código: ${res.status}`,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sin conexión con el servidor",
        text: err.message,
      });
    }
  }

  // ── PUT EDITAR ───────────────────────────────────
  async function handleEditar(e) {
    e.preventDefault();

    const actualizado = {
      formaPago: form.formaPago,
      franquicia: form.franquicia,
      descripcion: form.descripcion,
      estado: "ACTIVO",
    };

    try {
      const res = await fetch(`${endPoints.metodoPago}/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizado),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Método de pago actualizado",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getMetodos();
        });
      } else {
        const errData = await res.json().catch(() => null);
        Swal.fire({
          icon: "error",
          title: "Error al actualizar",
          text: errData?.message || errData?.error || `Código: ${res.status}`,
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Sin conexión con el servidor",
        text: err.message,
      });
    }
  }

  // ── CARGAR DATOS EN FORM PARA EDITAR ─────────────
  function cargarEdicion(metodo) {
    setEditando(metodo);
    setForm({
      formaPago: metodo.formaPago,
      franquicia: metodo.franquicia,
      descripcion: metodo.descripcion,
    });
  }

  // ── LIMPIAR FORM ─────────────────────────────────
  function limpiarForm() {
    setEditando(null);
    setForm({
      formaPago: "",
      franquicia: "",
      descripcion: "",
    });
  }

  // ── LOGOUT TOTAL A LANDING ───────────────────────
  const handleSalirLanding = () => {
    Swal.fire({
      title: "¿Deseas salir al inicio?",
      text: "Se cerrará la sesión de administrador",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header modificado con dos botones */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Gestión de Métodos de Pago</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="text-sm text-gray-500 hover:text-gray-800 border border-gray-300 px-4 py-2 rounded-lg transition-colors"
            >
              ← Volver al menú
            </button>
            <button
              onClick={handleSalirLanding}
              className="text-sm bg-gray-800 text-white hover:bg-black px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              Salir al Inicio
            </button>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white p-6 rounded shadow-md w-full mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {editando
              ? `Editando: ${editando.formaPago}`
              : "Nuevo método de pago"}
          </h3>

          <form onSubmit={editando ? handleEditar : handleCrear}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Forma de pago */}
              <div>
                <label className="block text-gray-600 mb-1">
                  Forma de pago
                </label>
                <select
                  name="formaPago"
                  value={form.formaPago}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                  required
                >
                  <option value="">Selecciona una forma de pago</option>
                  {FORMAS_PAGO.map((fp) => (
                    <option key={fp} value={fp}>
                      {fp}
                    </option>
                  ))}
                </select>
              </div>

              {/* Franquicia */}
              <div>
                <label className="block text-gray-600 mb-1">Franquicia</label>
                <select
                  name="franquicia"
                  value={form.franquicia}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                  required
                >
                  <option value="">Selecciona una franquicia</option>
                  {FRANQUICIAS.map((fr) => (
                    <option key={fr} value={fr}>
                      {fr}
                    </option>
                  ))}
                </select>
              </div>

              {/* Descripción */}
              <div className="sm:col-span-2">
                <label className="block text-gray-600 mb-1">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Ej: Tarjeta de crédito Visa Bancolombia"
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                  required
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {editando ? "Guardar cambios" : "Crear método de pago"}
              </button>

              {editando && (
                <button
                  type="button"
                  onClick={limpiarForm}
                  className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Tabla */}
        <div className="bg-white p-6 rounded shadow-md w-full">
          <h3 className="text-lg font-semibold mb-4">
            Métodos de pago registrados
          </h3>
          {metodos.length === 0 ? (
            <p className="text-gray-400">No hay métodos de pago registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Forma de pago</th>
                    <th className="px-4 py-2">Franquicia</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {metodos.map((metodo) => (
                    <tr key={metodo.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{metodo.id}</td>
                      <td className="px-4 py-2 font-medium">
                        {metodo.formaPago}
                      </td>
                      <td className="px-4 py-2">{metodo.franquicia}</td>
                      <td className="px-4 py-2 text-gray-500">
                        {metodo.descripcion}
                      </td>
                      <td className="px-4 py-2">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          ACTIVO
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => cargarEdicion(metodo)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Editar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
