import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DashboardPage from "../pages/DashboardPage";
import EstadisticasPage from "../pages/EstadisticasPage";

import AdminPage from "../admin/AdminPage";
import UsuarioA from "../admin/UsuarioA";
import ComerciosA from "../admin/ComerciosA";
import CategoriasA from "../admin/CategoriasA";
import MetodosA from "../admin/MetodosA";
import PagosA from "../admin/PagosA";
import AnalyticsPage from "../pages/AnalyticsPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "/estadisticas", element: <EstadisticasPage /> },
  { path:"/analytics", element: <AnalyticsPage />},
  //Admin
  { path: "/admin", element: <AdminPage /> },
  { path: "/admin/usuarios", element: <UsuarioA /> },
  { path: "/admin/comercios", element: <ComerciosA /> },
  { path: "/admin/categorias", element: <CategoriasA /> },
  { path: "/admin/metodos-pago", element: <MetodosA /> },
  { path: "/admin/pagos", element: <PagosA /> }
  

]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
