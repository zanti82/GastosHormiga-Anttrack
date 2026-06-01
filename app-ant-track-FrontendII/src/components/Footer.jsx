import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div
      className="pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden"
      id="Footer"
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start">
        <div className="w-full md:w-1/3 mb-8 md:mb-0">
          <div className="flex items-center gap-3">
            <img src={assets.anttra} className="h-12 w-12" alt="Logo" />
            <h2 className="text-white text-xl font-bold">AntTrack</h2>
          </div>
          <p className="text-gray-400 mt-4">
            La aplicación inteligente de presupuestos que te ayuda a controlar
            gastos, ahorrar dinero y alcanzar tus objetivos financieros con
            facilidad.
          </p>
        </div>
        <div className="w-full md:w-1/5 mb-8 md:mb-0">
          <h3 className="text-white text-lg font-bold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-400">
            <a href="#Header" className="hover:text-white">
              Inicio
            </a>
            <a href="#About" className="hover:text-white">
              Ant Track
            </a>
            <a href="#Contacto" className="hover:text-white">
              Contactanos
            </a>
            <a href="#" className="hover:text-white">
              Politica de privacidad
            </a>
          </ul>
        </div>
        <div className="w-full md:w-1/3">
          <h3 className="text-white text-lg font-bold mb-4">Siguenos</h3>
          <p className="text-gray-400 mb-4 max-w-80">
            En nuestras redes sociales
          </p>
          <div className="flex gap-4">
            <a href="https://www.instagram.com/" target="_blank">
              <img
                src={assets.insta}
                className="w-8 h-8 invert transition-transform duration-300 hover:-translate-y-1"
                alt="Instagram"
              />
            </a>
            <a href="https://www.facebook.com/" target="_blank">
              <img
                src={assets.face}
                className="w-8 h-8 invert transition-transform duration-300 hover:-translate-y-1"
                alt="Facebook"
              />
            </a>
            <a href="https://www.youtube.com/" target="_blank">
              <img
                src={assets.yout}
                className="w-8 h-8 invert transition-transform duration-300 hover:-translate-y-1"
                alt="Youtube"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 py-4 mt-10 text-center text-gray-400 text-sm">
        <p>© 2025 AntTrack. Todos los derechos reservados.</p>
      </div>
      <a
        href="#Header"
        className="hidden md:block fixed bottom-8 right-8 bg-blue-400 p-3 rounded-full shadow-lg hover:-translate-y-1 transition-transform duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 15l7-7 7 7"
          />
        </svg>
      </a>
    </div>
  );
};

export default Footer;
