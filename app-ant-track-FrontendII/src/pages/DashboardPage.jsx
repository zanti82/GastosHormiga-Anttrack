import React, { useState, useEffect } from "react";
import { endPoints } from "../services/api";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { clearSession, getUser, authFetch } from "../helpers/local-storage";

export default function DashboardPage() {
  const navigate = useNavigate();

  

  // local storage para recibir usuario
  let activeUser = getUser("user");

  
  //para revisar que si
  console.log(activeUser.correo);
  console.log(activeUser.id);
  console.log(activeUser.rol);

  //el DTO recobe estos parametros, el userID lo sacamos del localStorage

  const [gasto, setGasto] = useState({
    descripcion: "",
    valor: "",
    categoriaId: "",
    metodoPagoId: "",
    comercioNombre: "",
    usuarioId: activeUser.id,
  });

  // array para guaradar los gastos, categorias, comercios, metodos de pago
  const [gastos, setGastos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [comercios, setComercios] = useState([]);
  const [metodoPagos, setMetodoPagos] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const [gastoEditar, setGastoEditar] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  //PARA LISTAR GASTOS recibe un parametro id para listar al usuario activo
  function getGastos(id) {
    authFetch(`${endPoints.gastosByID}/${id}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.log("GASTOS DATA:", data); //verificar si llega la data
        setGastos(data);
      })
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }

  //PARA LISTAR coemrcios
  function getComercios() {
    authFetch(`${endPoints.comercios}/mis-comercios`)
      .then((res) => res.json())
      .then((data) => {
        setComercios(data);
      })
      .catch((error) => console.log("Error al cargar comercios:", error.message));
}

  //PARA LISTAR categorias
  function getCategorias() {
    authFetch(`${endPoints.categorias}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.log("categorias", data); //verificar si llega la data
        setCategorias(data);
      })
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }

  //PARA LISTAR metod de pago
  function getMetodoPagos() {
    authFetch(`${endPoints.metodoPago}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.log("metodopago", data); //verificar si llega la data
        setMetodoPagos(data);
      })
      .catch((error) => console.log("Error al cargar gastos:", error.message));
  }

  useEffect(() => {
    const idUser = activeUser.id;

    //revisar que si llega el id
    console.log(idUser);

    //usamos la funcion fecth que recibe id como parametro
    getGastos(idUser);
    getCategorias();
    getComercios();
    getMetodoPagos();

  }, []);

  //filtros

  const gastosFiltrados = gastos.filter((item) => {
    return item.descripcion
      .toLowerCase()
      .includes(busqueda.toLowerCase());
  });



  // FUNCION LOGOUT
  const handleLogout = () => {
    Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Volverás a la página principal",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Salir",
      cancelButtonText: "Quedarme",
    }).then((result) => {
      if (result.isConfirmed) {
        clearSession("user");
        navigate("/", { replace: true });
      }
    });
  };

  //ESTA FUNCION NOs CAMPURA TODOS LOS DATOS Y LOS SETTEA DIRECTAMENTE

  const handleChange = (e) => {
    if (gastoEditar) {
      setGastoEditar({ ...gastoEditar, [e.target.name]: e.target.value });
    } else {
      setGasto({ ...gasto, [e.target.name]: e.target.value });
    }
  };

  //funcione spara edita y eliminar
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
        const res = await authFetch(`${endPoints.gastos}/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          Swal.fire({
            icon: "success",
            title: "Gasto eliminado",
            confirmButtonColor: "#2563eb",
          }).then(() => getGastos(activeUser.id));
        } else {
          Swal.fire({ icon: "error", title: "Error al elimniar" });
        }
      }
    });
  }

  //para editar



  function handleEditar(id) {
    let gasto = gastos.find((g) => g.id === id);
    setGastoEditar(gasto); // guarda el gasto en el estado
    setOpenModal(true);
  }

  //aca enviamos todo

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (gastoEditar) {
      const gastoParaEditar = {
        descripcion: gastoEditar.descripcion,
        valor: parseFloat(gastoEditar.valor),
        categoriaId:
          gastoEditar.categoria?.id || parseInt(gastoEditar.categoriaId),
        metodoPagoId:
          gastoEditar.metodoPago?.id || parseInt(gastoEditar.metodoPagoId),
        comercioNombre: 
          gastoEditar.comercio?.nombreComercio || gastoEditar.comercioNombre,
        usuarioId: activeUser.id,
      };

      try {
        const response = await authFetch(`${endPoints.gastos}/${gastoEditar.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gastoParaEditar),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Gasto registrado!",
            text: "Tu gasto fue guardado correctamente.",
            confirmButtonColor: "#2563eb",
          });

          getGastos(activeUser.id);
          setOpenModal(false);

          setGasto({
            descripcion: "",
            valor: "",
            categoriaId: "",
            metodoPagoId: "",
            comercioId: "",
            usuarioId: activeUser.id,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo registrar el gasto.",
            confirmButtonColor: "#2563eb",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sin conexión",
          text: "No se pudo conectar con el servidor.",
          confirmButtonColor: "#2563eb",
        });
      }

      setGastoEditar(null);
    } else {
      const gastoParaEnviar = {
        ...gasto,
        valor: parseFloat(gasto.valor),
        descripcion: gasto.descripcion,
        categoriaId: parseInt(gasto.categoriaId),
        metodoPagoId: parseInt(gasto.metodoPagoId),
        comercioNombre: gasto.comercioNombre,
        usuarioId: activeUser.id,
      };

      try {
        const response = await authFetch(endPoints.gastos, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(gastoParaEnviar),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "¡Gasto registrado!",
            text: "Tu gasto fue guardado correctamente.",
            confirmButtonColor: "#2563eb",
          });

          getGastos(activeUser.id);
          setOpenModal(false);

          setGasto({
            descripcion: "",
            valor: "",
            categoriaId: "",
            metodoPagoId: "",
            comercioId: "",
            usuarioId: activeUser.id,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "No se pudo registrar el gasto.",
            confirmButtonColor: "#2563eb",
          });
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Sin conexión",
          text: "No se pudo conectar con el servidor.",
          confirmButtonColor: "#2563eb",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-32">

      {/* ── HEADER ── */}
      <div className="max-w-5xl mx-auto px-4 pt-6">

        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-4">
          <img src="/antt.png" alt="AntTrack logo" className="w-16 mb-2 invert" />
          <h2 className="text-xl font-bold">PANEL DE GASTOS</h2>
        </div>

        {/* Welcome + email */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-1">
          <h2 className="text-lg font-bold">
            Bienvenido, {activeUser.nombre || "Usuario"}
          </h2>
          <span className="text-gray-500 text-sm">{activeUser.correo}</span>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => { setOpenModal(true); setGastoEditar(null); }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Crear gasto
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Salir</span>
          </button>
        </div>

      </div>

      {/* ── MODAL ── */}
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setOpenModal(false);
                setGastoEditar(null);
                setGasto({ descripcion: "", valor: "", categoriaId: "", metodoPagoId: "", comercioNombre: "", usuarioId: activeUser.id });
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-black text-lg font-bold"
            >
              ✕
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {gastoEditar ? "Editar gasto" : "Registrar nuevo gasto"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Monto</label>
                <input type="number" name="valor"
                  value={gastoEditar ? gastoEditar.valor : gasto.valor}
                  onChange={handleChange} placeholder="0.00"
                  className="w-full border border-gray-300 rounded px-4 py-2" required />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Concepto</label>
                <input type="text" name="descripcion"
                  value={gastoEditar ? gastoEditar.descripcion : gasto.descripcion}
                  onChange={handleChange} placeholder="Ej: café, transporte..."
                  className="w-full border border-gray-300 rounded px-4 py-2" required />
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Categoría</label>
                <select name="categoriaId"
                  value={gastoEditar ? gastoEditar.categoria.id : gasto.categoriaId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-600" required>
                  <option value="">Selecciona una categoría</option>
                  {categorias.map((item) => (
                    <option key={item.id} value={item.id}>{item.nombre}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-600 mb-1">Comercio</label>
                <input
                  type="text"
                  name="comercioNombre"
                  value={gastoEditar ? gastoEditar.comercio?.nombreComercio || gastoEditar.comercioNombre || '' : gasto.comercioNombre}
                  onChange={handleChange}
                  placeholder="Escribe el nombre del comercio..."
                  className="w-full border border-gray-300 rounded px-4 py-2"
                  list="comercios-list"
                  required
                />
                <datalist id="comercios-list">
                  {comercios.map((item) => (
                    <option key={item.id} value={item.nombreComercio} />
                  ))}
                </datalist>
              </div>

              <div className="mb-6">
                <label className="block text-gray-600 mb-1">Método de pago</label>
                <select name="metodoPagoId"
                  value={gastoEditar ? gastoEditar.metodoPago.id : gasto.metodoPagoId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-gray-600" required>
                  <option value="">Selecciona un método de pago</option>
                  {metodoPagos.map((item) => (
                    <option key={item.id} value={item.id}>{item.formaPago}</option>
                  ))}
                </select>
              </div>

              <button type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                {gastoEditar ? "Guardar cambios" : "Registrar gasto"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── HISTORIAL ── */}
      <div className="bg-white p-4 rounded shadow-md mx-4 overflow-hidden">
        <h3 className="text-lg font-semibold mb-4">Historial de gastos</h3>

        <input type="text" placeholder="Buscar gasto..." value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 mb-4" />

        {gastos.length === 0 ? (
          <p className="text-gray-400">No hay gastos registrados aún.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-[10px] md:text-xs">
                <tr>
                  <th className="px-2 py-2">Descripción</th>
                  <th className="px-2 py-2 hidden sm:table-cell">Categoría</th>
                  <th className="px-2 py-2 hidden md:table-cell">Método pago</th>
                  <th className="px-2 py-2 hidden md:table-cell">Comercio</th>
                  <th className="px-2 py-2 text-right">Valor</th>
                  <th className="px-2 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gastosFiltrados.map((g) => (
                  <tr key={g.id} className="border-b hover:bg-blue-50 transition">
                    <td className="px-2 py-2 max-w-[100px] truncate">{g.descripcion}</td>
                    <td className="px-2 py-2 hidden sm:table-cell">{g.categoria.nombre}</td>
                    <td className="px-2 py-2 hidden md:table-cell">{g.metodoPago.descripcion}</td>
                    <td className="px-2 py-2 hidden md:table-cell">{g.comercio?.nombreComercio}</td>
                    <td className="px-2 py-2 text-right font-bold text-blue-600">${g.valor}</td>
                    <td className="px-2 py-2">
                      <div className="flex flex-col gap-1">
                        <button onClick={() => handleEditar(g.id)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs">
                          Editar
                        </button>
                        <button onClick={() => handleEliminar(g.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs">
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── FLOATING BUTTONS ── */}
      {/* Estadísticas */}
      <button onClick={() => navigate("/estadisticas")}
        className="fixed bottom-20 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 text-sm">
        📊 Estadísticas
      </button>

      {/* Analytics */}
      <button onClick={() => navigate("/analytics")}
        className="fixed bottom-36 right-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2 z-50 text-sm">
        🐍 Python
      </button>

    </div>
  );
}