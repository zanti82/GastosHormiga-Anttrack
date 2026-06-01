import React, { useEffect, useState } from "react";
import { assets, projectsData } from "../assets/assets";

const AsiFunciona = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(1);

  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(projectsData.length);
      } else {
        setCardsToShow(1);
      }
    };
    updateCardsToShow();

    window.addEventListener("resize", updateCardsToShow);
    return () => window.addEventListener("resize", updateCardsToShow);
  }, []);

  const nextProject = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
  };
  const prevProject = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden bg-blue-50"
      id="AsiFunciona"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Como{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          funciona
        </span>
      </h1>
      <p className="text-gray-500 max-w-80 text-center mb-8 mx-auto">
        Sencillo, inteligente y seguro
      </p>
      {/*slider buttons */}
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={prevProject}
          className="p-3 bg-gray-300 rounded mr-2 cursor-pointer"
          aria-label="Anterior"
        >
          <img src={assets.izq} alt="izquierda" />
        </button>
        <button
          onClick={nextProject}
          className="p-3 bg-gray-300 rounded mr-2 cursor-pointer"
          aria-label="Siguiente"
        >
          <img src={assets.der} alt="derecha" />
        </button>
      </div>
      {/*AsiFunciona slider container */}
      <div className="overflow-hidden">
        <div
          className="flex gap-8 transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
          }}
        >
          {projectsData.map((project, index) => (
            <div key={index} className="flex-shrink-0 w-full sm:w-1/4 p-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-60 object-cover"
                />

                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    {" "}
                    {project.title}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    {" "}
                    {project.price} {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AsiFunciona;
