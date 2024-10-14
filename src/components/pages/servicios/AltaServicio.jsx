import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const AltaServicio = () => {

   // Estados para almacenar los datos del formulario
   const [codigo, setCodigo] = useState("");
   const [importe, setImporte] = useState("");
 
   const navigate = useNavigate();

   const handleGuardarServicio = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const nuevoServicio = {
      codigoServicio: codigo,
      importeServicio: importe,
    };

    try {
      const response = await fetch("http://localhost:8080/servicios/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoServicio),
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
        title: 'Servicio creado con éxito',
        showConfirmButton: false,
        timer: 2000, // Duración en milisegundos
      });
      
      // Redirige a la página de roles
      navigate("/servicios");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">Alta de Servicios</h1>
      </div>
      <form
        className="max-w-lg mx-auto border shadow-md sm:rounded-lg p-10 mt-10"
        onSubmit={handleGuardarServicio}
      >
        <div className="mb-5">
          <label
            htmlFor="codigo"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Codigo de Servicio
          </label>
          <input
            type="text"
            id="codigo"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Codigo..."
            maxLength={5}
            required
            value={codigo}
            //onChange={(e) => setCodigo(e.target.value)}
            onChange={(e) => {
              const regex = /^[0-9]*$/;
              if (regex.test(e.target.value)) {
                setCodigo(e.target.value); // Solo actualizar si cumple con el patrón
              }
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="importe"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Valor de Servicio
          </label>
          <input
            type="text"
            id="importe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="0.00"
            required
            value={importe}
            //onChange={(e) => setImporte(e.target.value)}
            onChange={(e) => {
              const regex = /^(\d+)(\.\d{0,2})?$/; // Permitir números y punto como separador decimal
              if (regex.test(e.target.value) || e.target.value === '') {
                setImporte(e.target.value); // Solo actualizar si cumple con el patrón o si se está borrando
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Registrar Servicio
          </button>
          <Link
            to="/servicios"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 block text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}

export default AltaServicio