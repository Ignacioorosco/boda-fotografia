import React, { useState } from 'react';
import img from "../assets/WhatsApp Image 2025-08-27 at 00.13.42.jpeg";

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
    const response = await fetch('https://aging-radiation-enormous-costa.trycloudflare.com/imagen/single', {
  method: 'POST',
  body: formData,
});

      const result = await response.text();
      alert(`✅ Imagen subida: ${result}`);
    } catch (error) {
      console.error('❌ Error al subir la imagen:', error);
      alert('Error al subir la imagen.');
    }
  };

  return (
    <section className="relative flex flex-col min-h-screen bg-[#2f3c4f]">
      {/* Portada */}
      <div className="relative w-full h-[60vh] md:h-[70vh]">
        <img
         src={img}
          alt="Portada boda"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center bg-black/30">
          <h1 className="text-5xl font-bold tracking-wide">F & A</h1>
        </div>
      </div>

      {/* Subida directa con cámara */}
      <div className="flex-1 p-6 text-center bg-[#f8f9fa]">
        <h2 className="text-xl font-semibold text-gray-700">
          📸 Tomá una foto y compartila
        </h2>
        <p className="text-gray-500 mt-2 text-sm">
          Usá tu cámara para capturar un momento y subirlo directo.
        </p>

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
          className="mt-4 inline-block bg-pink-500 text-white px-6 py-3 rounded-2xl shadow-lg hover:bg-pink-600 transition cursor-pointer"
        >
          Abrir cámara
        </label>

        {imagePreview && (
          <div className="mt-6">
            <h3 className="text-gray-700 font-medium mb-2">Vista previa</h3>
            <img
              src={imagePreview}
              alt="Preview"
              className="mx-auto max-w-xs rounded shadow-md"
            />
          </div>
        )}
      </div>

      <footer className="py-4 text-center text-gray-500 text-sm border-t bg-[#f8f9fa]">
        Hecho con ❤️ para nuestra boda
      </footer>
    </section>
  );
};

export default Principal;
