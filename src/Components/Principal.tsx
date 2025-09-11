import { useState } from "react";
import { motion } from "framer-motion";

// Imágenes de portada y logo
import portada from "../assets/pexels-cottonbro-7504597.jpg";
import logo from "../assets/ChatGPT Image 1 sept 2025, 05_56_28 p.m..png";

const Principal: React.FC = () => {
  // Estado para mostrar la vista previa de la imagen seleccionada
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Estado para mostrar mensajes al usuario
  const [mensaje, setMensaje] = useState<string | null>(null);

  // Estado para saber si la cámara está disponible o no
  const [camaraDisponible, setCamaraDisponible] = useState<boolean>(true);

  // Función que se ejecuta cuando se selecciona o se captura una imagen
  const handleImageCapture = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    // Si no se seleccionó ningún archivo, probablemente falló la cámara
    if (!file) {
      setMensaje("⚠️ No se pudo abrir la cámara en este dispositivo. Por favor, sube una imagen desde la galería.");
      setCamaraDisponible(false); // Ocultamos el botón de cámara
      return;
    }

    // Mostrar vista previa localmente
    const imageUrl = URL.createObjectURL(file);
    setImagePreview(imageUrl);
    setMensaje("Subiendo imagen...");

    // Crear FormData para enviar al servidor
    const formData = new FormData();
    formData.append("imagenPerfil", file);

    try {
      // Enviar imagen al servidor
      const response = await fetch(
        "https://pdt-junior-harder-diffs.trycloudflare.com/imagen/single",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error(`Error en el servidor: ${response.statusText}`);

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
      className="relative flex flex-col min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${portada})`, backgroundColor: "#F5F0E6" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    >
      {/* Overlay blanco semitransparente */}
      <div className="absolute inset-0 bg-white/70 z-0"></div>

      {/* Contenido principal */}
      <div className="relative z-10 flex-1 p-6 text-center">
        {/* Encabezado con logo y nombres */}
        <div className="text-center px-4" style={{ fontFamily: 'Le Jour Script' }}>
          <img src={logo} alt="A&F logo" className="mx-auto w-32 h-32 mb-6" />
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7B4B3A" }}>
            ¡Nos Casamos!
          </h2>
          <h1
            className="text-5xl mb-6"
            style={{ color: "#4B2E2B" }}
          >
            Ayelen y Franco
          </h1>
          <p className="text-lg tracking-wide" style={{ color: "#7B4B3A" , fontFamily: 'homemade-apple-regular'  }}>
            13 septiembre | 12:00
          </p>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: "#7B4B3A" , fontFamily: 'homemade-apple-regular' }}>
            Comparte un recuerdo con nosotros
          </h2>
        </div>

        {/* Inputs ocultos (cámara y galería) */}
        <input
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageCapture}
          className="hidden"
          id="cameraInput"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageCapture}
          className="hidden"
          id="fileInput"
        />

        {/* Botones personalizados */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
       

          {/* Botón para subir desde galería (siempre visible) */}
          <label
            htmlFor="fileInput"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
              shadow-lg transition-all cursor-pointer"
            style={{
              backgroundColor: "#D9B08C",
              color: "#4B2E2B",
              border: "1px solid #C89F94",
            }}
          >
            <span className="text-xl">🖼️</span>
            <span>Subi tu recuerdo desde galería</span>
          </label>





             {/* Botón de cámara solo si está disponible 
          {camaraDisponible && (
            <label
              htmlFor="cameraInput"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl 
              shadow-lg transition-all cursor-pointer"
              style={{
                backgroundColor: "#D9B08C",
                color: "#4B2E2B",
                border: "1px solid #C89F94",
              }}
            >
              <span className="text-xl">📸</span>
              <span>Abrir cámara</span>
            </label>
          )}*/}
        </div>

        {/* Aviso si la cámara no está disponible */}
        {!camaraDisponible && (
          <p className="mt-3 text-sm text-red-600">
            Este dispositivo no permite abrir la cámara desde el navegador. Por favor, sube una imagen desde tu galería.
          </p>
        )}

        {/* Vista previa de la imagen seleccionada */}
        {imagePreview && (
          <div className="mt-6">
            <h3 className="font-medium mb-3" style={{ color: "#7B4B3A" }}>
              Vista previa de tu recuerdo
            </h3>
            <img
              src={imagePreview}
              alt="Preview"
              className="mx-auto max-w-xs rounded-2xl shadow-md"
              style={{ border: "2px solid #C89F94" }}
            />
          </div>
        )}

        {/* Mensajes dinámicos (subida exitosa, error, etc.) */}
        {mensaje && (
          <div className="mt-4">
            <p
              className="text-lg font-medium"
              style={{
                color: mensaje.startsWith("✅")
                  ? "#2F7D32"
                  : mensaje.startsWith("❌")
                  ? "#B23A48"
                  : mensaje.startsWith("⚠️")
                  ? "#E67E22"
                  : "#4B2E2B",
              }}
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
