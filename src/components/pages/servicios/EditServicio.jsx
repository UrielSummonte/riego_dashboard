import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const EditServicio = () => {

  const [codigo, setCodigo] = useState("");
  const [importe, setImporte] = useState(0);
  const navigate = useNavigate();
  const { idServicio } = useParams();

  useEffect(() => {
    // Llamada a la API para obtener los datos del rol a editar
    const fetchServicio = async () => {
      try {
        const response = await fetch(`http://localhost:8080/servicios/${idServicio}`);
        if (!response.ok) throw new Error("Error al obtener el servicio");

        const servicio = await response.json();
        setCodigo(servicio.codigoServicio);
        setImporte(servicio.importeServicio);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchServicio();
  }, [idServicio]);

  const handleGuardarServicio = async (event) => {
    event.preventDefault();

    const nuevoServicio = {
      idServicio: idServicio,
      codigoServicio: codigo,
      importeServicio: importe,
    };

    try {
      const response = await fetch(`http://localhost:8080/servicios/editar`, {
        method: "PUT", // Cambia a PUT si es para editar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoServicio),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Servicio modificado con éxito:", data);

        // Mostrar alerta de éxito
        Swal.fire({
          toast: true,
          position: 'top-end', // Cambia la posición según necesites
          icon: 'success',
          title: 'Servicio modificado con éxito',
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });

        navigate("/servicios");
      } else {
        const errorText = await response.text();
        console.error("Error al modificar el Servicio:", errorText);

        // Mostrar alerta de error
        Swal.fire({
          toast: true,
          position: 'top-end', // Cambia la posición según necesites
          icon: 'error',
          title: 'Error al modificar el Servicio',
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
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">Edicion de Servicios</h1>
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
            type="number"
            id="importe"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Valor..."
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
            Modificar Servicio
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

export default EditServicio