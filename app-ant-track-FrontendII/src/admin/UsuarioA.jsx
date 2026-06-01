import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import Swal from "sweetalert2";

export default function UsuariosA() {
  const navigate = useNavigate();

  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);

  const [form, setForm] = useState({
    nombre: "",
    tipoDocumento: "",
    documento: "",
    edad: "",
    genero: "",
    direccion: "",
    telefono: "",
    correo: "",
    presupMensual: "",
  });

  // ── GET ──────────────────────────────────────────
  function getUsuarios() {
    fetch(endPoints.users)
      .then((res) => res.json())
      .then((data) => setUsuarios(data))
      .catch((err) => console.error("Error al cargar usuarios:", err));
  }

  useEffect(() => {
    getUsuarios();
  }, []);

  // ── HANDLE CHANGE ────────────────────────────────
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ── POST ─────────────────────────────────────────
  async function handleCrear(e) {
    e.preventDefault();

    const nuevoUsuario = {
      ...form,
      presupMensual: parseFloat(form.presupMensual),
    };

    try {
      const res = await fetch(endPoints.users, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Usuario creado",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getUsuarios();
        });
      } else {
        Swal.fire({ icon: "error", title: "Error al crear usuario" });
      }
    } catch {
      Swal.fire({ icon: "error", title: "Sin conexión con el servidor" });
    }
  }

  // ── PUT EDITAR ───────────────────────────────────
  async function handleEditar(e) {
    e.preventDefault();

    const usuarioEditado = {
      ...form,
      presupMensual: parseFloat(form.presupMensual),
    };

    try {
      const res = await fetch(`${endPoints.users}/${editando.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioEditado),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Usuario actualizado",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          limpiarForm();
          getUsuarios();
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
      title: "¿Desactivar usuario?",
      text: "El usuario ya no podrá acceder al sistema",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Desactivar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${endPoints.users}/${id}/desactivar`, {
          method: "PUT",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Usuario desactivado",
            confirmButtonColor: "#2563eb",
          }).then(() => getUsuarios());
        } else {
          Swal.fire({ icon: "error", title: "Error al desactivar" });
        }
      }
    });
  }

  // ── PUT ACTIVAR ──────────────────────────────────
  function handleActivar(id) {
    Swal.fire({
      title: "¿Activar usuario?",
      text: "El usuario volverá a estar activo",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Activar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`${endPoints.users}/${id}/activar`, {
          method: "PUT",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Usuario activado",
            confirmButtonColor: "#2563eb",
          }).then(() => getUsuarios());
        } else {
          Swal.fire({ icon: "error", title: "Error al activar" });
        }
      }
    });
  }

  // ── CARGAR DATOS EN FORM PARA EDITAR ─────────────
  function cargarEdicion(user) {
    setEditando(user);

    setForm({
      nombre: user.nombre || "",
      tipoDocumento: user.tipoDocumento || "",
      documento: user.documento || "",
      edad: user.edad || "",
      genero: user.genero || "",
      direccion: user.direccion || "",
      telefono: user.telefono || "",
      correo: user.correo || "",
      presupMensual: user.presupMensual || "",
    });
  }

  // ── LIMPIAR FORM ─────────────────────────────────
  function limpiarForm() {
    setEditando(null);

    setForm({
      nombre: "",
      tipoDocumento: "",
      documento: "",
      edad: "",
      genero: "",
      direccion: "",
      telefono: "",
      correo: "",
      presupMensual: "",
    });
  }

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
      if (result.isConfirmed) navigate("/");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/admin")}
              className="text-sm text-gray-500 hover:text-gray-800 border border-gray-300 px-4 py-2 rounded-lg"
            >
              ← Volver al menú
            </button>

            <button
              onClick={handleSalirLanding}
              className="text-sm bg-gray-800 text-white hover:bg-black px-4 py-2 rounded-lg"
            >
              Salir al Inicio
            </button>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white p-6 rounded shadow-md w-full mb-8">
          <h3 className="text-lg font-semibold mb-4">
            {editando
              ? `Editando: ${editando.nombre}`
              : "Registrar nuevo usuario"}
          </h3>

          <form onSubmit={editando ? handleEditar : handleCrear}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nombre */}
              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-1 text-sm">
                  Nombre Completo
                </label>

                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  readOnly={!!editando}
                  className={`w-full border border-gray-300 rounded px-4 py-2 ${
                    editando ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  required
                />
              </div>

              {/* Tipo Documento */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm">
                  Tipo Identificación
                </label>

                {editando ? (
                  <input
                    type="text"
                    value={form.tipoDocumento}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100 cursor-not-allowed"
                  />
                ) : (
                  <select
                    name="tipoDocumento"
                    value={form.tipoDocumento}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-4 py-2"
                    required
                  >
                    <option value="">Seleccione un tipo</option>
                    <option value="CEDULA">CEDULA</option>
                    <option value="TARJETA DE IDENTIDAD">
                      TARJETA DE IDENTIDAD
                    </option>
                    <option value="PASAPORTE">PASAPORTE</option>
                    <option value="CEDULA DE EXTRANJERIA">
                      CEDULA DE EXTRANJERIA
                    </option>
                  </select>
                )}
              </div>

              {/* Documento */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm">
                  Número documento
                </label>

                <input
                  type="text"
                  name="documento"
                  value={form.documento}
                  onChange={handleChange}
                  readOnly={!!editando}
                  className={`w-full border border-gray-300 rounded px-4 py-2 ${
                    editando ? "bg-gray-100 cursor-not-allowed" : ""
                  }`}
                  required
                />
              </div>

              {/* Edad */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm">Edad</label>

                <input
                  type="number"
                  name="edad"
                  value={form.edad}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              {/* Género */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm">
                  Género
                </label>

                <input
                  type="text"
                  name="genero"
                  value={form.genero}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              {/* Presupuesto */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm">
                  Presupuesto mensual
                </label>

                <input
                  type="number"
                  name="presupMensual"
                  value={form.presupMensual}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2"
                />
              </div>

              {/* Dirección */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm font-bold text-blue-600">
                  Dirección
                </label>

                <input
                  type="text"
                  name="direccion"
                  value={form.direccion}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm font-bold text-blue-600">
                  Teléfono
                </label>

                <input
                  type="text"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Correo */}
              <div>
                <label className="block text-gray-600 mb-1 text-sm font-bold text-blue-600">
                  Correo Electrónico
                </label>

                <input
                  type="email"
                  name="correo"
                  value={form.correo}
                  onChange={handleChange}
                  className="w-full border border-blue-300 rounded px-4 py-2 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-bold"
              >
                {editando ? "Guardar cambios" : "Crear usuario"}
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
          <h3 className="text-lg font-semibold mb-4">Usuarios registrados</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-4 py-2">Nombre</th>
                  <th className="px-4 py-2">Documento</th>
                  <th className="px-4 py-2">Contacto</th>
                  <th className="px-4 py-2">Presupuesto</th>
                  <th className="px-4 py-2">Estado</th>
                  <th className="px-4 py-2 text-center">Acciones</th>
                </tr>
              </thead>

              <tbody>
                {usuarios.map((u) => (
                  <tr key={u.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2 font-medium">{u.nombre}</td>

                    <td className="px-4 py-2 text-gray-600">
                      <div className="text-xs text-gray-400">
                        {u.tipoDocumento}
                      </div>

                      {u.documento}
                    </td>

                    <td className="px-4 py-2 text-gray-500">
                      <div className="font-bold">{u.telefono}</div>
                      <div className="text-xs">{u.correo}</div>
                      <div className="text-xs italic">{u.direccion}</div>
                    </td>

                    <td className="px-4 py-2">${u.presupMensual}</td>

                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          u.estado === "ACTIVO"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {u.estado}
                      </span>
                    </td>

                    <td className="px-4 py-2 text-center flex gap-2 justify-center">
                      <button
                        onClick={() => cargarEdicion(u)}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs shadow-sm"
                      >
                        Editar
                      </button>

                      {u.estado === "ACTIVO" ? (
                        <button
                          onClick={() => handleEliminar(u.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs shadow-sm"
                        >
                          Desactivar
                        </button>
                      ) : (
                        <button
                          onClick={() => handleActivar(u.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs shadow-sm"
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
        </div>
      </div>
    </div>
  );
}
