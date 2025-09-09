import { useState } from "react";
import { motion } from "framer-motion";
import portada from "../assets/fondo.webp";
import logo from "../assets/ChatGPT Image 1 sept 2025, 05_56_28 p.m..png";

const Principal: React.FC = () => {
  // Estado para mostrar la vista previa de la foto
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  // Estado para mostrar mensajes al usuario (subiendo, error, etc.)
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Maneja la selección de imagen (ya sea cámara o galería)
  const handleImageCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    // ⚠️ Si no se seleccionó archivo (ej: cámara falló o usuario canceló)
    if (!file) {
      setMensaje("⚠️ No se pudo abrir la cámara. Intenta desde la galería.");
      return;
    }

    // Crear URL temporal para mostrar vista previa
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setMensaje("Subiendo imagen...");

    // Preparamos el archivo para enviarlo al backend
    const formData = new FormData();
    formData.append("imagenPerfil", file);

    try {
      // Enviamos al backend
      const response = await fetch(
        "https://convenient-madrid-threshold-plugins.trycloudflare.com/imagen/single",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${response.statusText}`);
      }

      const result = await response.text();
      console.log(`✅ Imagen subida: ${result}`);
      setMensaje("✅ Imagen subida con éxito. ¡Gracias por compartir tu recuerdo!");
    } catch (error: any) {
      console.error("❌ Error al subir la imagen:", error);
      setMensaje("❌ Hubo un error al subir la imagen. Intenta nuevamente.");
    }
  };

  return (
    <motion.section
      className="relative flex flex-col min-h-screen bg-pink-50 bg-cover bg-center"
      style={{ backgroundImage: `url(${portada})` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      <div className="flex-1 p-6 text-center">
        {/* Encabezado */}
        <div className="relative z-10 text-center px-4">
          <img src={logo} alt="A&F logo" className="mx-auto w-32 h-32 mb-6" />
          <h2 className="text-2xl font-semibold mb-4">¡Nos Casamos!</h2>
          <h1 className="font-playwrite text-5xl mb-6">Ayelen y Franco</h1>
          <p className="text-lg tracking-wide">13 septiembre | 12:00</p>
          <h2 className="text-2xl font-semibold mb-4">
            Comparte un recuerdo con nosotros
          </h2>
        </div>

        {/* Inputs ocultos: uno para cámara y otro para galería */}
        <input
          type="file"
          accept="image/*"
          capture="environment" // intenta abrir la cámara trasera
          onChange={handleImageCapture}
          className="hidden"
          id="cameraInput"
        />
        <input
          type="file"
          accept="image/*" // galería normal
          onChange={handleImageCapture}
          className="hidden"
          id="fileInput"
        />

        {/* Botones visibles que disparan los inputs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
          {/* Botón cámara */}
          <label
            htmlFor="cameraInput"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
              backdrop-blur-md bg-white/30 border border-white/50
              text-pink-700 font-medium shadow-lg
              hover:bg-white/50 hover:scale-105 transition-all cursor-pointer"
          >
            <span className="text-xl">📸</span>
            <span>Abrir cámara</span>
          </label>

          {/* Botón galería */}
          <label
            htmlFor="fileInput"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
              backdrop-blur-md bg-white/30 border border-white/50
              text-pink-700 font-medium shadow-lg
              hover:bg-white/50 hover:scale-105 transition-all cursor-pointer"
          >
            <span className="text-xl">🖼️</span>
            <span>Subir desde galería</span>
          </label>
        </div>

        {/* Vista previa de la imagen seleccionada */}
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

        {/* Mensajes dinámicos (éxito, error, advertencia, etc.) */}
        {mensaje && (
          <div className="mt-4">
            <p
              className={`text-lg font-medium ${
                mensaje.startsWith("✅")
                  ? "text-green-600"
                  : mensaje.startsWith("❌")
                  ? "text-red-600"
                  : mensaje.startsWith("⚠️")
                  ? "text-yellow-600"
                  : "text-gray-600"
              }`}
            >
              {mensaje}
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default Principal;
