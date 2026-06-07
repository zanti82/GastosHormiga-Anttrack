//servidor levantado en otra temrinal dento de la app-ant-track

//const URL_BASE = "http://3.134.93.54:8080/anttrackapi/v1";
const URL_BASE = "https://abc123.ngrok-free.app/anttrackapi/v1";
//nueva linea

export let endPoints = {

  users: URL_BASE + "/usuarios",
  gastos: URL_BASE + "/gastos",
  gastosByID: URL_BASE + "/gastos/usuarios",
  comercios: URL_BASE + "/comercios",
  categorias: URL_BASE + "/categorias",
  metodoPago: URL_BASE + "/metodopagos",
  

 
  auth: {
    login: URL_BASE +"/auth/login",
    register: URL_BASE +"/auth/register",
  },
  // ── Reportes / Estadísticas ──────────────────────
  reportes: {
    porCategoria:  (id, mes, anio) => `${URL_BASE}/reportes/usuario/${id}/por-categoria?mes=${mes}&anio=${anio}`,
    resumen:       (id, mes, anio) => `${URL_BASE}/reportes/usuario/${id}/resumen?mes=${mes}&anio=${anio}`,
    porMes:        (id, anio)      => `${URL_BASE}/reportes/usuario/${id}/por-mes?anio=${anio}`,
    porMetodoPago: (id, mes, anio) => `${URL_BASE}/reportes/usuario/${id}/por-metodo-pago?mes=${mes}&anio=${anio}`,
    topComercios:  (id, mes, anio) => `${URL_BASE}/reportes/usuario/${id}/top-comercios?mes=${mes}&anio=${anio}`,
  },
   /*
  gastos: {
    listar: `${BASE_URL}/gastos`,
    crear: `${BASE_URL}/gastos`,
    eliminar: (id) => `${BASE_URL}/gastos/${id}`,
  },
  categorias: {
    listar: `${BASE_URL}/categorias`,
  },
  comercios: {
    listar: `${BASE_URL}/comercios`,
  },
  mediosPago: {
    listar: `${BASE_URL}/medios-pago`,
  },*/
};