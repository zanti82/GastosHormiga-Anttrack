import React from "react";
import { assets, testimoniData } from "../assets/assets";

const Experiencias = () => {
  return (
    <div
      className="container mx-auto py-10 lg:px-32 w-full overflow-hidden"
      id="Experiencias"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Experiencias{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          de usuarios{" "}
        </span>
      </h1>
      <p className="text-center text-gray-500 mb-12 max-w-80 mx-auto">
        La app que te ayuda ahorrar
      </p>

      <div className="flex flex-wrap justify-center gap-8">
        {testimoniData.map((testimonio, index) => (
          <div
            key={index}
            className="w-[320px] border border-gray-200 shadow-lg
                 rounded-lg px-8 py-8 text-center bg-white"
          >
            <img
              className="w-19 h-18 rounded-full mx-auto mb-4"
              src={testimonio.image}
              alt={testimonio.alt}
            />
            <h2 className="text-lg text-gray-700 font-medium ">
              {testimonio.name}
            </h2>
            <p className="text-gray-500 mb-4 text-sm">{testimonio.title}</p>
            <div className="flex justify-center gap-1 text-red-500 mb-4">
              {Array.from({ length: testimonio.rating }, (item, index) => (
                <img key={index} src={assets.ztar} alt="" className="" />
              ))}
            </div>
            <p className="text-gray-600">{testimonio.text} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experiencias;
