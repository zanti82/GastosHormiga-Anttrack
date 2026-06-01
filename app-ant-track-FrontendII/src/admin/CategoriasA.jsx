import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import Swal from "sweetalert2";

export default function CategoriasA() {
  const navigate = useNavigate();

  const [categorias, setCategorias] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    presupuestoMaximoMensual: "",
  });

  // ── GET ──────────────────────────────────────────
  function getCategorias() {
    fetch(endPoints.categorias)
      .then((res) => res.json())
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error al cargar categorías:", err));
  }

  useEffect(() => {
    getCategorias();
  }, []);

  // ── HANDLE CHANGE ────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── POST ─────────────────────────────────────────
  async function handleCrear(e) {
    e.preventDefault();

    const nueva = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      presupuestoMaximoMensual: parseFloat(form.presupuestoMaximoMensual),
    };

    try {
      const res = await fetch(endPoints.categorias, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nueva),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Categoría creada",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getCategorias();
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
      nombre: form.nombre,
      descripcion: form.descripcion,
      presupuestoMaximoMensual: parseFloat(form.presupuestoMaximoMensual),
    };

    try {
      const res = await fetch(`${endPoints.categorias}/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(actualizada),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Categoría actualizada",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getCategorias();
        });
      } else {
        Swal.fire({ icon: "error", title: "Error al actualizar" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Sin conexión con el servidor" });
    }
  }

  // ── PUT DESACTIVAR ───────────────────────────────
  function handleEliminar(id) {
    Swal.fire({
      title: "¿Desactivar categoría?",
      text: "La categoría quedará inactiva",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Desactivar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${endPoints.categorias}/${id}/desactivar`, {
          method: "PUT",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Categoría desactivada",
            confirmButtonColor: "#2563eb",
          }).then(() => getCategorias());
        } else {
          Swal.fire({ icon: "error", title: "Error al desactivar" });
        }
      }
    });
  }

  // ── PUT ACTIVAR ──────────────────────────────────
  function handleActivar(id) {
    Swal.fire({
      title: "¿Activar categoría?",
      text: "La categoría volverá a estar activa",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Activar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${endPoints.categorias}/${id}/activar`, {
          method: "PUT",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Categoría activada",
            confirmButtonColor: "#2563eb",
          }).then(() => getCategorias());
        } else {
          Swal.fire({ icon: "error", title: "Error al activar" });
        }
      }
    });
  }

  // ── CARGAR DATOS EN FORM PARA EDITAR ─────────────
  function cargarEdicion(cat) {
    setEditando(cat);
    setForm({
      nombre: cat.nombre,
      descripcion: cat.descripcion,
      presupuestoMaximoMensual: cat.presupuestoMaximoMensual,
    });
  }

  // ── LIMPIAR FORM ─────────────────────────────────
  function limpiarForm() {
    setEditando(null);
    setForm({
      nombre: "",
      descripcion: "",
      presupuestoMaximoMensual: "",
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
        {/* Header modificado con los dos botones */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
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
            {editando ? `Editando: ${editando.nombre}` : "Nueva categoría"}
          </h3>

          <form onSubmit={editando ? handleEditar : handleCrear}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 mb-1">Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Ej: Alimentación"
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">Descripción</label>
                <input
                  type="text"
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  placeholder="Ej: Gastos de comida"
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-700"
                />
              </div>
              <div>
                <label className="block text-gray-600 mb-1">
                  Presupuesto máximo mensual
                </label>
                <input
                  type="number"
                  name="presupuestoMaximoMensual"
                  value={form.presupuestoMaximoMensual}
                  onChange={handleChange}
                  placeholder="0.00"
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
                {editando ? "Guardar cambios" : "Crear categoría"}
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
          <h3 className="text-lg font-semibold mb-4">Categorías registradas</h3>
          {categorias.length === 0 ? (
            <p className="text-gray-400">No hay categorías registradas.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Nombre</th>
                    <th className="px-4 py-2">Descripción</th>
                    <th className="px-4 py-2">Presup. máx.</th>
                    <th className="px-4 py-2">Estado</th>
                    <th className="px-4 py-2 text-center">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map((cat) => (
                    <tr key={cat.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2">{cat.id}</td>
                      <td className="px-4 py-2 font-medium">{cat.nombre}</td>
                      <td className="px-4 py-2 text-gray-500">
                        {cat.descripcion}
                      </td>
                      <td className="px-4 py-2">
                        ${cat.presupuestoMaximoMensual}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            cat.estado === "ACTIVO"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {cat.estado}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-center flex gap-2 justify-center">
                        <button
                          onClick={() => cargarEdicion(cat)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Editar
                        </button>
                        {cat.estado === "ACTIVO" ? (
                          <button
                            onClick={() => handleEliminar(cat.id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                          >
                            Desactivar
                          </button>
                        ) : (
                          <button
                            onClick={() => handleActivar(cat.id)}
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
