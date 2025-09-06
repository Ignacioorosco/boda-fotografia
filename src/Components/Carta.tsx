import { useState } from "react";
import { motion } from "framer-motion";
import Principal from "./Principal";
import logo from "../assets/ChatGPT Image 1 sept 2025, 05_56_28 p.m..png";
import flores from "../assets/s.png";

const Carta = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-pink-50 overflow-hidden">
      {/* Portada con animación de puerta */}
      {!isOpen && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-white shadow-2xl border-r-4 border-red-300 z-20 flex items-center justify-center cursor-pointer"
          onClick={() => setIsOpen(true)}
          initial={{ x: 0 }}
          animate={isOpen ? { x: "-100%" } : {}}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Fondo con flores */}
          <img
            src={flores}
            alt="Flores decorativas"
            className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none"
          />

          {/* Contenido central */}
          <div className="relative z-10 text-center px-4">
            {/* Logo */}
            <img
              src={logo}
              alt="A&F logo"
              className="mx-auto w-32 h-32 mb-6"
            />

            {/* Texto principal */}
            <h2 className="text-2xl font-semibold mb-4">¡Nos Casamos!</h2>
            <h1 className="font-playwrite text-5xl mb-6">Ayelen y Franco</h1>

            {/* Fecha */}
            <p className="text-lg tracking-wide">13 septiembre | 12:00</p>

            <h2 className="text-2xl font-semibold mb-4">Comparte un recuerdo con nosotros</h2>

          </div>
        </motion.div>
      )}

      {/* Contenido principal (después de abrir la puerta) */}
      <motion.div
        className="relative z-10 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <Principal />
      </motion.div>
    </div>
  );
};

export default Carta;
