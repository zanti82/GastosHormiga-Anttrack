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
    comercioId: "",
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
    authFetch(`${endPoints.comercios}`) //traemos los gastos del uasuario id
      .then((res) => res.json())
      .then((data) => {
        console.log("comercios", data); //verificar si llega la data
        setComercios(data);
      })
      .catch((error) => console.log("Error al cargar gastos:", error.message));
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
        comercioId:
          gastoEditar.comercio?.id || parseInt(gastoEditar.comercioId),
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
        comercioId: parseInt(gasto.comercioId),
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-2xl font-bold mb-6 p-6">PANEL DE GASTOS</h2>
          <img
            src="/antt.png"
            alt="AntTrack logo"
            className="w-20 mx-auto mb-4 invert"
          />
        </div>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            Bienvenido, {activeUser.nombre || "Usuario"}
          </h2>
          <span className="text-gray-500 text-sm">{activeUser.correo}</span>
        </div>

        <button
          onClick={() => {
            setOpenModal(true);
            setGastoEditar(null);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Crear gasto
        </button>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition shadow-sm"
          title="Cerrar sesión"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          <span className="hidden sm:inline">Salir</span>
        </button>

        
      </div>

      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md relative">
            
            <button
              onClick={() => {
                setOpenModal(false);
                setGastoEditar(null);
              
                setGasto({
                  descripcion: "",
                  valor: "",
                  categoriaId: "",
                  metodoPagoId: "",
                  comercioId: "",
                  usuarioId: activeUser.id,
                });
              }}
              className="absolute top-2 right-3 text-gray-500 hover:text-black"
            >
              X
            </button>

            <h3 className="text-lg font-semibold mb-4">
              {gastoEditar ? "Editar gasto" : "Registrar nuevo gasto"}
            </h3>

            {/* FORMULARIO */}

            <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Monto</label>
              <input
                type="number"
                name="valor"
                value={gastoEditar ? gastoEditar.valor : gasto.valor} //input con edit o entrada
                onChange={handleChange}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded px-4 py-2"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 mb-1">Concepto</label>
              <input
                type="text"
                name="descripcion"
                value={
                  gastoEditar ? gastoEditar.descripcion : gasto.descripcion
                }
                onChange={handleChange}
                placeholder="Ej: café, transporte..."
                className="w-full border border-gray-300 rounded px-4 py-2"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-600 mb-1">Categoría</label>
              <select
                name="categoriaId"
                value={
                  gastoEditar ? gastoEditar.categoria.id : gasto.categoriaId
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2  text-gray-600"
                required
              >
                <option value="">Selecciona una categoría</option>

                {/* esta debe tarer lo que este en categorias pordriamos traer la categorias
             de la api */}

                {categorias.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-1">Comercio</label>
              <select
                name="comercioId"
                value={gastoEditar ? gastoEditar.comercio.id : gasto.comercioId}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2  text-gray-600"
                required
              >
                <option value="">Selecciona un comercios registrado</option>

                {/* esta debe tarer lo que este en categorias pordriamos traer la categorias
             de la api */}
                {comercios.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.nombreComercio}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-gray-600 mb-1">Metodo pago</label>
              <select
                name="metodoPagoId"
                value={
                  gastoEditar ? gastoEditar.metodoPago.id : gasto.metodoPagoId
                }
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-4 py-2  text-gray-600"
                required
              >
                <option value="">Selecciona un metod de pago</option>

                {/* esta debe tarer lo que este en meroso de pago
             de la api */}
                {metodoPagos.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.formaPago}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Registrar gasto
            </button>
          </form>

          </div>
        </div>
      )}

      {/* Historial */}
      <div className="bg-white p-4 md:p-6 rounded shadow-md w-full overflow-hidden">
        <h3 className="text-lg font-semibold mb-4">Historial de gastos</h3>
        <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar gasto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2"
        />
      </div>
        {gastos.length === 0 ? (
          <p className="text-gray-400">No hay gastos registrados aún.</p>
        ) : (
          
          
          <div className="overflow-x-auto">
            <table className="w-full text-xs md:text-sm text-left">
            <thead className="bg-gray-100 text-gray-600 uppercase text-[10px] md:text-xs">
                <tr>
                  <th className="px-2 py-2">Descripción</th>
                  <th className="px-2 py-2">Categoría</th>
                  <th className="px-2 py-2">Método de pago</th>
                  <th className="px-2 py-2">Comercio</th>
                  <th className="px-2 py-2 text-right">Valor</th>
                  <th className="px-2 py-2 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {gastosFiltrados.map((g) => (
                  <tr key={g.id} className="border-b hover:bg-blue-50 transition">
                    <td className="px-2 py-2 max-w-[120px] truncate">
                      {g.descripcion}
                    </td>
                    <td className="px-2 py-2">{g.categoria.nombre}</td>
                    <td className="px-2 py-2">{g.metodoPago.descripcion}</td>
                    <td className="px-2 py-2">{g.comercio.nombreComercio}</td>
                    <td className="px-2 py-2 text-right font-bold text-blue-600">
                      ${g.valor}
                    </td>
                    <td className="px-2 py-2">
                    <div className="flex flex-col md:flex-row gap-2 justify-center">
                        
                        <button
                          onClick={() => handleEditar(g.id)}
                          className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs"
                        >
                          Editar
                        </button>

                        <button
                          onClick={() => handleEliminar(g.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        >
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
      {/* ✅ NUEVO — botón flotante para ir a estadísticas */}
      <button
        onClick={() => navigate("/estadisticas")}
        className="fixed top-25 right-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all z-50"
        title="Ver estadísticas en gráficas"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Ver estadísticas
      </button>

          <button
      onClick={() =>
        window.open("http://localhost:8501", "_blank")
      }
    >
      Abrir Dashboard
    </button>
    <button
        onClick={() => navigate("/analytics")}
        className="fixed top-11 right-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all z-50"
        title="Ver python"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Ver Python
      </button>

      <button
        onClick={() => window.open("http://localhost:8501", "_blank")} 
        className="fixed top-40 right-8 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all z-50"
        title="Ver streamlit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Ver Streamlit
      </button>

        
          <button
      
    >
      Abrir Dashboard
    </button>
    </div>
  );
}
