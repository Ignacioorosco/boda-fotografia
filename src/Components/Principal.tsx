import { useState } from "react";
import { motion } from "framer-motion";
import portada from "../assets/fondo.webp";
import logo from "../assets/ChatGPT Image 1 sept 2025, 05_56_28 p.m..png";

const Principal: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Mostrar vista previa
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);

    // Crear FormData
    const formData = new FormData();
    formData.append('imagenPerfil', file); // importante: debe coincidir con multer.single('imagenPerfil')

    try {
    const response = await fetch(' https://charging-jacket-designers-insulation.trycloudflare.com/imagen/single', {
  method: 'POST',
  body: formData,
});

      const result = await response.text();
      console.log(`✅ Imagen subida: ${result}`);
    } catch (error) {
      console.error('❌ Error al subir la imagen:', error);
      alert('Error al subir la imagen.');
    }
  };

  return (
  <motion.section
  className="relative flex flex-col min-h-screen bg-pink-50 bg-cover bg-center"
  style={{ backgroundImage: `url(${portada})` }}
  initial={{ opacity: 0 }}          // empieza invisible
  animate={{ opacity: 1 }}          // aparece suavemente
  transition={{ duration: 2 }}      // en 1s
>

      {/* Sección de recuerdos */}
      <div className="flex-1 p-6 text-center">
        <div className="relative z-10 text-center px-4">
          <img
            src={logo}
            alt="A&F logo"
            className="mx-auto w-32 h-32 mb-6"
          />

          <h2 className="text-2xl font-semibold mb-4">¡Nos Casamos!</h2>
          <h1 className="font-playwrite text-5xl mb-6">Ayelen y Franco</h1>
          <p className="text-lg tracking-wide">13 septiembre | 12:00</p>
          <h2 className="text-2xl font-semibold mb-4">
            Comparte un recuerdo con nosotros
          </h2>
        </div>

        {/* Input de cámara */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageCapture}
          className="hidden"
          id="cameraInput"
        />
        <label
          htmlFor="cameraInput"
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
             backdrop-blur-md bg-white/30 border border-white/50
             text-pink-700 font-medium shadow-lg
             hover:bg-white/50 hover:scale-105 transition-all cursor-pointer"
        >
          <span className="text-xl">📸</span>
          <span>Abrir cámara</span>
        </label>

        {imagePreview && (
          <div className="mt-6">
            <h3 className="text-gray-700 font-medium mb-3">
              Vista previa de tu recuerdo
            </h3>
            <img
              src={imagePreview}
              alt="Preview"
              className="mx-auto max-w-xs rounded-2xl shadow-md border border-pink-200"
            />
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Principal;
