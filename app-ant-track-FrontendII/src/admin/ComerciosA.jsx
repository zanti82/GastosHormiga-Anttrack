import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import Swal from "sweetalert2";

export default function ComerciosA() {
  const navigate = useNavigate();

  const [comercios, setComercios] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombreComercio: "",
    nit: "",
    telefono: "",
    direccion: "",
    horarioAtencion: "",
  });

  // ── GET ──────────────────────────────────────────
  function getComercios() {
    fetch(endPoints.comercios)
      .then((res) => res.json())
      .then((data) => setComercios(data))
      .catch((err) => console.error("Error al cargar comercios:", err));
  }

  useEffect(() => {
    getComercios();
  }, []);

  // ── HANDLE CHANGE ────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── POST ─────────────────────────────────────────
  async function handleCrear(e) {
    e.preventDefault();

    const nueva = {
      nombreComercio: form.nombreComercio,
      nit: form.nit,
      telefono: form.telefono,
      direccion: form.direccion,
      horarioAtencion: form.horarioAtencion,
    };

    try {
      const res = await fetch(endPoints.comercios, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nueva),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Comercio creado",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getComercios();
        });
      } else {
        Swal.fire({ icon: "error", title: "Error al crear" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Sin conexión con el servidor" });
    }
  }

  // ── PUT EDITAR ───────────────────────────────────
  async function handleEditar(e) {
    e.preventDefault();

    const actualizada = {
      nombreComercio: form.nombreComercio,
      nit: form.nit,
      telefono: form.telefono,
      direccion: form.direccion,
      horarioAtencion: form.horarioAtencion,
    };

    try {
      const res = await fetch(`${endPoints.comercios}/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizada),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Comercio actualizado",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getComercios();
        });
      } else {
        Swal.fire({ icon: "error", title: "Error al actualizar" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Sin conexión con el servidor" });
    }
  }

  // ── PUT DESACTIVAR (Corregido para evitar error 500) ───────────
  function handleEliminar(id) {
    Swal.fire({
      title: "¿Desactivar comercio?",
      text: "El comercio quedará inactivo",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Desactivar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // Cambiamos el endpoint de DELETE a PUT /desactivar
        const res = await fetch(`${endPoints.comercios}/${id}/desactivar`, {
          method: "PUT",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Comercio desactivado",
            confirmButtonColor: "#2563eb",
          }).then(() => getComercios());
        } else {
          Swal.fire({ icon: "error", title: "Error al desactivar" });
        }
      }
    });
  }

  // ── PUT ACTIVAR ──────────────────────────────────
  function handleActivar(id) {
    Swal.fire({
      title: "¿Activar comercio?",
      text: "El comercio volverá a estar activo",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Activar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${endPoints.comercios}/${id}/activar`, {
          method: "PUT",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Comercio activado",
            confirmButtonColor: "#2563eb",
          }).then(() => getComercios());
        } else {
          Swal.fire({ icon: "error", title: "Error al activar" });
        }
      }
    });
  }

  // ── CARGAR DATOS EN FORM PARA EDITAR ─────────────
  function cargarEdicion(comercio) {
    setEditando(comercio);
    setForm({
      nombreComercio: comercio.nombreComercio,
      nit: comercio.nit,
      telefono: comercio.telefono,
      direccion: comercio.direccion,
      horarioAtencion: comercio.horarioAtencion,
    });
  }

  // ── LIMPIAR FORM ─────────────────────────────────
  function limpiarForm() {
    setEditando(null);
    setForm({
      nombreComercio: "",
      nit: "",
      telefono: "",
      direccion: "",
      horarioAtencion: "",
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
        // Si usas localStorage, límpialo aquí
        // localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto p-8">
        {/* Header con dos botones de salida */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Gestión de Comercios</h1>
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
              ? `Editando: ${editando.nombreComercio}`
              : "Nuevo comercio"}
          </h3>

          <form onSubmit={editando ? handleEditar : handleCrear}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">
                  Nombre Comercio
                </label>
                <input
                  type="text"
                  name="nombreComercio"
                  value={form.nombreComercio}
                  onChange={handleChange}
                  placeholder="ej: Pull and Bear"
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Nit</label>
                <input
                  type="text"
                  name="nit"
                  value={form.nit}
                  onChange={handleChange}
                  placeholder="ej: 1234567-8"
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Dirección</label>
                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">
                  Horario de Atención
                </label>
                <input
                  type="text"
                  name="horarioAtencion"
                  value={form.horarioAtencion}
                  onChange={handleChange}
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
                {editando ? "Guardar cambios" : "Crear comercio"}
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
          <h3 className="text-lg font-semibold mb-4">Comercios registrados</h3>
          {comercios.length === 0 ? (
            <p className="text-gray-400">No hay comercios registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Nit</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {comercios.map((comercio) => (
                    <tr key={comercio.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{comercio.id}</td>
                      <td className="px-4 py-2 font-medium">
                        {comercio.nombreComercio}
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {comercio.nit}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            comercio.estado === "ACTIVO"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {comercio.estado}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => cargarEdicion(comercio)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Editar
                        </button>
                        {comercio.estado === "ACTIVO" ? (
                          <button
                            onClick={() => handleEliminar(comercio.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Desactivar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivar(comercio.id)}
                            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Activar
                          </button>
                        )}
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
