import React from "react";
import Header from "../components/Header";
import About from "../components/About";
import AsiFunciona from "../components/AsiFunciona";
import Experiencias from "../components/Experiencias";
import Contacto from "../components/Contacto";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <About />
      <AsiFunciona />
      <Experiencias />
      <Contacto />
      <Footer />
    </div>
  );
};

export default HomePage;
