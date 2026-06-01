import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (MobileMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [MobileMenu]);

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={assets.anttra} className="h-12 w-12" alt="" />
        <ul className="hidden md:flex gap-7 text-white">
          <a href="#Header" className="cursor-pointer hover:text-gray-700">
            Inicio
          </a>
          <a href="#About" className="cursor-pointer hover:text-gray-700">
            Ant Track
          </a>
          <a href="#AsiFunciona" className="cursor-pointer hover:text-gray-700">
            Como funciona
          </a>
          <a
            href="#Experiencias"
            className="cursor-pointer hover:text-gray-700"
          >
            Experiencias
          </a>
        </ul>
        <button
          className="hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Login/Registro
        </button>
        <img
          onClick={() => setMobileMenu(true)}
          src={assets.men_icon}
          className="md:hidden w-7 cursor-pointer"
          alt=""
        />
      </div>
      {/*------menu movil------- */}
      <div
        className={`md:hidden ${MobileMenu ? "fixed w-full" : "h-0 w-0"} right-0 top-0 bottom-0 overflow-hidden bg-white transition-full`}
      >
        <div className="flex justify-end p-6">
          <img
            onClick={() => setMobileMenu(false)}
            src={assets.x_icon}
            className="w-6 cursor-pointer"
            alt=""
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a
            onClick={() => setMobileMenu(false)}
            href="#Header"
            className="px-4 py-2 rounded-full inline-block"
          >
            Inicio
          </a>
          <a
            onClick={() => setMobileMenu(false)}
            href="#Asi funciona"
            className="px-4 py-2 rounded-full inline-block"
          >
            Ant Track
          </a>
          <a
            onClick={() => setMobileMenu(false)}
            href="#Experiencias"
            className="px-4 py-2 rounded-full inline-block"
          >
            Asi funciona
          </a>
          <a
            onClick={() => setMobileMenu(false)}
            href="#Contactanos"
            className="px-4 py-2 rounded-full inline-block"
          >
            Experiencias
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
