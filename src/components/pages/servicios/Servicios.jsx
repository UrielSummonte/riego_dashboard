import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const Servicios = () => {

    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:8080/servicios/listar")
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

  // Función para eliminar el rol
  const handleEliminarServicio = async (idServicio) => {
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
          `http://localhost:8080/servicios/eliminar/${idServicio}`,
          {
            method: "DELETE",
          }
        );

        if (response.ok) {
          // Actualiza el estado para quitar el rol eliminado
          setData(data.filter((servicio) => servicio.idServicio !== idServicio));
          Swal.fire({
            toast: true,
            position: "top-end", // Cambia la posición según necesites
            icon: "success",
            title: "El Servicio ha sido eliminado",
            showConfirmButton: false,
            timer: 2000, // Duración en milisegundos
          });
        } else {
          const errorText = await response.text();
          console.error("Error al eliminar el Servicio:", errorText);
          // Mostrar alerta de error
          Swal.fire({
            toast: true,
            position: "top-end", // Cambia la posición según necesites
            icon: "error",
            title: "Error al eliminar el Servicio",
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
          title: "Error al eliminar el Servicio",
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });
      }
    }
  };
      
  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">Servicios</h1>
      </div>
      <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
        <div className="mb-6">
          <Link
            to="/servicios/alta-servicio"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Agregar nuevo Servicio
          </Link>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
            <th scope="col" className="px-6 py-3">
                Id
              </th>
              <th scope="col" className="px-6 py-3">
                Codigo de Servicio
              </th>
              <th scope="col" className="px-6 py-3">
                Valor de Servicio
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((serv) => (
              <tr key={serv.idServicio} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{serv.idServicio}</td>
                <td className="px-6 py-4">{serv.codigoServicio}</td>
                <td className="px-6 py-4">{serv.importeServicio}</td>
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
                        handleNavigation(`editar-servicio/${serv.idServicio}`);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleEliminarServicio(serv.idServicio)}
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
  )
}

export default Servicios