import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const EditRol = () => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();
  const { idRol } = useParams();

  useEffect(() => {
    // Llamada a la API para obtener los datos del rol a editar
    const fetchRol = async () => {
      try {
        const response = await fetch(`http://localhost:8080/roles/${idRol}`);
        if (!response.ok) throw new Error("Error al obtener el rol");

        const rol = await response.json();
        setNombre(rol.nombreRol);
        setDescripcion(rol.descripcion);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchRol();
  }, [idRol]);

  const handleGuardarRol = async (event) => {
    event.preventDefault();

    const nuevoRol = {
      idRol: idRol,
      nombreRol: nombre.toUpperCase(),
      descripcion: descripcion.toUpperCase(),
    };

    try {
      const response = await fetch(`http://localhost:8080/roles/editar`, {
        method: "PUT", // Cambia a PUT si es para editar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoRol),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Rol modificado con éxito:", data);

        // Mostrar alerta de éxito
        Swal.fire({
          toast: true,
          position: 'top-end', // Cambia la posición según necesites
          icon: 'success',
          title: 'Rol modificado con éxito',
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });

        navigate("/roles");
      } else {
        const errorText = await response.text();
        console.error("Error al modificar el rol:", errorText);

        // Mostrar alerta de error
        Swal.fire({
          toast: true,
          position: 'top-end', // Cambia la posición según necesites
          icon: 'error',
          title: 'Error al modificar el rol',
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });

      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-7">Edición de Rol</h1>
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
            Descripción
          </label>
          <input
            type="text"
            id="descripcion"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Descripción"
            maxLength={100}
            required
            value={descripcion}
            //onChange={(e) => setDescripcion(e.target.value)}
            onChange={(e) => {
              const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
              if (regex.test(e.target.value)) {
                setNombre(e.target.value); // Solo actualizar si cumple con el patrón
              }
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Modificar Rol
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

export default EditRol;
