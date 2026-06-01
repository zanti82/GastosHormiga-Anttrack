import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { endPoints } from "../services/api";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [edad, setEdad] = useState("");
  const [genero, setGenero] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [presupMensual, setPresupMensual] = useState("");
  const [direccion, setDireccion] = useState("");

  //este ultimo e spara guardar todo lo anterior
  const [users, setUsers] = useState([]);

  //buscamos los usuarios que hay actuales
  function getUser() {
    fetch(endPoints.users)
      .then((response) => response.json())
      .then((data) => {
        console.table(data); //verificar si llega la data
        setUsers(data);
      });
  }

  //funcion para saber si existe el usuario, busacno que el correo o docuemnto exista
  function findUser() {
    let auth = users.find((u) => correo == u.correo);
    return auth;
  }

  //funcion para crear el usuario y guardarlo

  function saveUser() {
    let user = {
      nombre: nombre, //si la variable se llama igual al atributo, se puede dejar solo el atributo
      documento: documento,
      tipoDocumento: tipoDocumento,
      edad: edad,
      genero: genero,
      correo: correo,
      password: password,
      telefono: telefono,
      direccion: direccion,
      presupMensual: presupMensual,
    };
    //ya creado el user, lo mandamos con una peticion post

    fetch(endPoints.users, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en el servidor");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Usuario guardado con éxito:", data);

        //este return, me devuelvo un resul del boton que sav¿ca el swalfrire
        return Swal.fire({
          icon: "success",
          title: "¡Cuenta creada!",
          text: "Tu cuenta fue registrada correctamente.",
          confirmButtonColor: "#2563eb",
        });
      })
      .then((result) => {
        //Redirigir al login después de que
        if (result.isConfirmed || result.isDismissed) {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Hubo un fallo:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo registrar el usuario. Intenta de nuevo.",
        });
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  /* OTRA FROMA DE CAPTURAR INFO

  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    tipoDocumento:"",
    edad:"",
    genero:"",
    correo: "",
    password: "",
    telefono:"",
    presupMensual:""
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    con esto EN el html, se settea el forma data con la info que llega

    <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("2. Contenido de la lista users:", users);

    let usernew = findUser();

    console.log("3. Resultado de la búsqueda:", usernew);

    if (!usernew) {
      console.log("entro");

      saveUser();

      // limpiar formulario
      setNombre("");
      setDocumento("");
      setTipoDocumento("");
      setEdad("");
      setGenero("");
      setCorreo("");
      setPassword("");
      setTelefono("");
      setDireccion("");
      setPresupMensual("");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Usuario ya existe",
        text: "El correo ya está registrado",
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
        <h2 className="text-2xl font-bold mb-6 text-center">Crear cuenta</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Tipo Doc</label>
            <select
              name="tipoDocumento"
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 bg-white text-gray-600"
              required
            >
              <option value="">Selecciona un tipo</option>
              <option value="CEDULA">CEDULA</option>
              <option value="TARJETA_IDENTIDAD">TARJETA DE IDENTIDAD</option>
              <option value="PASAPORTE">PASAPORTE</option>
              <option value="EXTRANJERIA">CEDULA EXTRANJERIA</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Documento</label>
            <input
              type="text"
              name="documento"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              placeholder="Numero de documento"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Edad</label>
            <input
              type="text"
              name="edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              placeholder="edad"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Género</label>
            <select
              name="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 bg-white  text-gray-600"
              required
            >
              <option value="">Selecciona un género</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Telefono</label>
            <input
              type="text"
              name="contacto"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="321000000"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Direccion</label>
            <input
              type="text"
              name="contacto"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="crr 50 45 20, medellin"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="correo"
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
          <div className="mb-4">
            <label className="block text-gray-600 mb-1">
              Presupuesto Mensual
            </label>
            <input
              type="text"
              name="presupuesto"
              value={presupMensual}
              onChange={(e) => setPresupMensual(e.target.value)}
              placeholder="1000000"
              className="w-full border border-gray-300 rounded px-4 py-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-blue-600">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
