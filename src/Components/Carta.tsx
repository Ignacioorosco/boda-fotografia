import { useState } from "react";
import { motion } from "framer-motion";
import Principal from "./Principal";

const Carta = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-pink-50 overflow-hidden">
      {/* Puertas */}
      {!isOpen && (
        <>
          {/* Izquierda */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-white shadow-2xl border-r-4 border-pink-300 z-20 flex items-center justify-center cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ x: 0 }}
            animate={isOpen ? { x: "-100%" } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <p className="text-4xl">💌</p>
          </motion.div>

          {/* Derecha */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-white shadow-2xl border-l-4 border-pink-300 z-20 flex items-center justify-center cursor-pointer"
            onClick={() => setIsOpen(true)}
            initial={{ x: 0 }}
            animate={isOpen ? { x: "100%" } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <p className="text-4xl">💌</p>
          </motion.div>
        </>
      )}

      {/* Contenido principal (Landing) */}
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
