import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const Operadores = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/operadores/listar")
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

  // Función para eliminar el operador
  const handleEliminarOperador = async (idOperador) => {
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
          `http://localhost:8080/operadores/eliminar/${idOperador}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Actualiza el estado para quitar el rol eliminado
          setData(data.filter((operador) => operador.idOperador !== idOperador));
          Swal.fire({
            toast: true,
            position: "top-end", // Cambia la posición según necesites
            icon: "success",
            title: "El Operador ha sido eliminado",
            showConfirmButton: false,
            timer: 2000, // Duración en milisegundos
          });
        } else {
          const errorText = await response.text();
          console.error("Error al eliminar el Operador:", errorText);
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
          title: "Error al eliminar el Operador",
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">Operadores</h1>
      </div>
      <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
        <div className="mb-6">
          <Link
            to="/operadores/alta-operador"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Agregar nuevo Operador
          </Link>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3">
                Apellido
              </th>
              <th scope="col" className="px-6 py-3">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3">
                Rol
              </th>
              <th scope="col" className="px-6 py-3">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((ope) => (
              <tr key={ope.idOperador} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{ope.idOperador}</td>
                <td className="px-6 py-4">{ope.nombreOperador}</td>
                <td className="px-6 py-4">{ope.apellidoOperador}</td>
                <td className="px-6 py-4">{ope.nombreUsuario}</td>
                <td className="px-6 py-4">{ope.nombreRol}</td>
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
                        handleNavigation(`editar-operador/${ope.idOperador}`);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleEliminarOperador(ope.idOperador)}
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

export default Operadores;
