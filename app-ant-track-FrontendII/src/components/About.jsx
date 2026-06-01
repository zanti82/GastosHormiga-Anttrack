import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div
      className="flex flex-col items-center justify-center container mx-auto p-14 md:px-20 lg: px-32 w-full overflow-hidden"
      id="About"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2">
        AntTrack{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          Que es?
        </span>
      </h1>
      <p className="text-gray-500 max-w-80 text-center mb-8">
        Pasion por el ahorro, alcanza tus objetivos financieros
      </p>
      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-20 mt-8">
        <img
          src={assets.about}
          alt=""
          className="w-full sm:w-1/2 max-w-lg md:max-w-xl lg:max-w-2xl h-64 md:h-96 lg:h-[400px] object-cover rounded-2xl mt-4"
        />
        <div className="flex flex-col items-center md:items-start mt-10 text-gray-600">
          <div className="grid grid-cols-2 gap-6 md:gap-10 w-full 2x1:pr-28">
            <div>
              <p className="text-4xl font-medium text-gray-800">1000+</p>
              <p>Descargas</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-800">1+</p>
              <p>Años trabajando junto a ti</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-800">500+</p>
              <p>Valoraciones positivas</p>
            </div>
            <div>
              <p className="text-4xl font-medium text-gray-800">$150.000+</p>
              <p>Ahorrado mensualmente por nuestros usuarios</p>
            </div>
          </div>
          <p className="my-10 max-w-lg text-lg">
            AntTrack es una aplicación de seguimiento de gastos que te permite
            registrar cualquier compra con pocos toques y ver al instante en qué
            gastas tu dinero; Sus funciones son intuitivas, asi tu solo te
            preocupas en como gestionar tu dinero.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
