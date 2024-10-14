import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const Distritos = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/distritos/listar")
      .then((response) => response.json()) // Aquí convertimos a JSON
      .then((data) => setData(data)) // Aquí asignamos los datos
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Función para manejar la redirección
  const handleNavigation = (href) => {
    if (href) {
      navigate(href);
    }
  };

  // Función para eliminar el distrito
  const handleEliminarDistrito = async (idDistrito) => {
    const confirmation = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esto.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/distritos/eliminar/${idDistrito}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Actualiza el estado para quitar el rol eliminado
          setData(data.filter((distrito) => distrito.idDistrito !== idDistrito));
          Swal.fire({
            toast: true,
            position: "top-end", // Cambia la posición según necesites
            icon: "success",
            title: "El Distrito ha sido eliminado",
            showConfirmButton: false,
            timer: 2000, // Duración en milisegundos
          });
        } else {
          const errorText = await response.text();
          console.error("Error al eliminar el Distrito:", errorText);
          // Mostrar alerta de error
          Swal.fire({
            toast: true,
            position: "top-end", // Cambia la posición según necesites
            icon: "error",
            title: "Error al eliminar el Operador",
            showConfirmButton: false,
            timer: 2000, // Duración en milisegundos
          });
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
        Swal.fire({
          toast: true,
          position: "top-end", // Cambia la posición según necesites
          icon: "error",
          title: "Error al eliminar el Distrito",
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">Distritos</h1>
      </div>
      <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
        <div className="mb-6">
          <Link
            to="/distritos/alta-distrito"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Agregar nuevo Distrito
          </Link>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Cod. Distrito
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre Distrito
              </th>
              <th scope="col" className="px-6 py-3">
                Cod. Departamento
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre Departamento
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((distri) => (
              <tr key={distri.idDistrito} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{distri.idDistrito}</td>
                <td className="px-6 py-4">{distri.codigoDistrito}</td>
                <td className="px-6 py-4">{distri.nombreDistrito}</td>
                <td className="px-6 py-4">{distri.codigoDepartamento}</td>
                <td className="px-6 py-4">{distri.nombreDepartamento}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {/* <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => {
                        handleNavigation("alta-rol");
                      }}
                    >
                      <FaEye />
                    </button> */}
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => {
                        handleNavigation(`editar-distrito/${distri.idDistrito}`);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleEliminarDistrito(distri.idDistrito)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Distritos;
