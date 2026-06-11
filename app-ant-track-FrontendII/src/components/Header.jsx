import React from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";  // ← add this import

const Header = () => {
  return (
    <div
      className="min-h-screen mb-4 bg-linear-to-r from-blue-600 via-blue-400 to-green-300 flex items-center w-full overflow-hidden"
      id="Header"
    >
      <Navbar />

      <div className="container text-center mx-auto py-4 px-6 md:px-20 lg:px-32 text-white">
        <h2 className="text-5xl sm:text-6xl md:text-[82px] inline-block max-w-3xl font-semibold pt-20">
          Toma el control de tus finanzas
        </h2>

        <h3 className="max-w-xl mx-auto py-5 text-2xl sm:text-2xl md:text-[25px]">
          AntTrack te ayuda a registrar, categorizar y analizar tus gastos del
          dia a dia para que nunca pierdas el control de tu presupuesto.{" "}
        </h3>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16">
          <Link
              to="/login"
              className="w-full sm:w-auto text-center border border-white text-[20px] px-8 py-3 rounded transition-all duration-300
                      hover:bg-white hover:text-blue-600"
          >
              Comenzar gratis
          </Link>
          <a
            href="#Contacto"
            className="border border-white text-[20px] px-8 py-3 rounded transition-all duration-300
                    hover:bg-white hover:text-blue-600"
          >
            Contactanos
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
