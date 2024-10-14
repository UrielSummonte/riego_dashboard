import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const AltaRol = () => {
  // Estados para almacenar los datos del formulario
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const navigate = useNavigate();

  const handleGuardarRol = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const nuevoRol = {
      nombreRol: nombre.toUpperCase(),
      descripcion: descripcion.toUpperCase(),
    };

    try {
      const response = await fetch("http://localhost:8080/roles/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoRol),
      });

      // Verifica si el servidor envía texto en lugar de JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json(); // Maneja si es JSON
        console.log("Rol agregado con éxito:", data);

      } else {
        const text = await response.text(); // Maneja si es texto plano
        console.log("Respuesta del servidor:", text);        
      }

      // Mostrar alerta de éxito
      Swal.fire({
        toast: true,
        position: 'top-end', // Cambia la posición según necesites
        icon: 'success',
        title: 'Rol creado con éxito',
        showConfirmButton: false,
        timer: 2000, // Duración en milisegundos
      });
      
      // Redirige a la página de roles
      navigate("/roles");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">Alta de Roles</h1>
      </div>
      <form
        className="max-w-lg mx-auto border shadow-md sm:rounded-lg p-10 mt-10"
        onSubmit={handleGuardarRol}
      >
        <div className="mb-5">
          <label
            htmlFor="rol"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nombre
          </label>
          <input
            type="text"
            id="rol"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nombre Rol"
            maxLength={35}
            required
            value={nombre}
            //onChange={(e) => setNombre(e.target.value)}
            onChange={(e) => {
              const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
              if (regex.test(e.target.value)) {
                setNombre(e.target.value); // Solo actualizar si cumple con el patrón
              }
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="descripcion"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Descripcion
          </label>
          <input
            type="text"
            id="descripcion"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Descripcion"
            maxLength={100}
            required
            value={descripcion}
            //onChange={(e) => setDescripcion(e.target.value)}
            onChange={(e) => {
              const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
              if (regex.test(e.target.value)) {
                setDescripcion(e.target.value); // Solo actualizar si cumple con el patrón
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Registrar Rol
          </button>
          <Link
            to="/roles"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 block text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AltaRol;
