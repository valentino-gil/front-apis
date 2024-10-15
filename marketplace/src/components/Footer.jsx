import React from "react";
import "../estilos/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2024 Automarket, Inc. All rights reserved.</p>
        <div className="footer-links">
          <a href="#about">Sobre nosotros</a>
          <a href="#contact">Contactanos</a>
          <a href="#privacy">Politicas de privacidad</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
