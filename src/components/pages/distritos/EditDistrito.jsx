import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const EditDistrito = () => {

    const [data, setData] = useState([]);
  // Estados para almacenar los datos del formulario
  const [codigoDistrito, setCodigoDistrito] = useState("");
  const [nombreDistrito, setNombreDistrito] = useState("");
  const [idDepartamento, setIdDepartamento] = useState(1);

  const navigate = useNavigate();
  const { idDistrito } = useParams();

  useEffect(() => {
    fetch("http://localhost:8080/departamentos/listar")
      .then((response) => response.json()) // Aquí convertimos a JSON
      .then((data) => setData(data)) // Aquí asignamos los datos
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener los datos del distrito a editar
    const fetchDistrito = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/distritos/${idDistrito}`
        );
        if (!response.ok) throw new Error("Error al obtener el operador");

        const distrito = await response.json();
        
        setCodigoDistrito(distrito.codigoDistrito);
        setNombreDistrito(distrito.nombreDistrito);
        setIdDepartamento(distrito.unDepartamento.idDepartamento);
        
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchDistrito();
  }, [idDistrito]);

  const handleGuardarDistrito = async (event) => {
    event.preventDefault();

    const nuevoDistrito = {
      idDistrito: idDistrito,
      codigoDistrito: codigoDistrito,
      nombreDistrito: nombreDistrito,
      unDepartamento : {idDepartamento : idDepartamento}
    };

    try {
      const response = await fetch(`http://localhost:8080/distritos/editar`, {
        method: "PUT", // Cambia a PUT si es para editar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoDistrito),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Distrito modificado con éxito:", data);

        // Mostrar alerta de éxito
        Swal.fire({
          toast: true,
          position: "top-end", // Cambia la posición según necesites
          icon: "success",
          title: "Distrito modificado con éxito",
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });

        navigate("/distritos");
      } else {
        const errorText = await response.text();
        console.error("Error al modificar el Distrito:", errorText);

        // Mostrar alerta de error
        Swal.fire({
          toast: true,
          position: "top-end", // Cambia la posición según necesites
          icon: "error",
          title: "Error al modificar el operador",
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
        <h1 className="text-center text-3xl font-bold mt-7">
          Edicion de Distrito
        </h1>
      </div>
      <form
        className="max-w-lg mx-auto border shadow-md sm:rounded-lg p-10 mt-10"
        onSubmit={handleGuardarDistrito}
      >
        <div className="mb-5">
          <label
            htmlFor="codigoDistrito"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Codigo de Distrito
          </label>
          <input
            type="text"
            id="codigoDistrito"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Codigo"
            required
            value={codigoDistrito}
            onChange={(e) => setCodigoDistrito(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="nombreDistrito"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Distrito
          </label>
          <input
            type="text"
            id="nombreDistrito"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Distrito"
            maxLength={40}
            required
            value={nombreDistrito}
            //onChange={(e) => setNombreDistrito(e.target.value)}
            onChange={(e) => {
              const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
              if (regex.test(e.target.value)) {
                setNombreDistrito(e.target.value); // Solo actualizar si cumple con el patrón
              }
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="departamentos"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Departamentos
          </label>
          <select
            id="departamentos"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={idDepartamento}
            onChange={(e) => setIdDepartamento(Number(e.target.value))}
          >
            {data.map((dpto) => (
              <option value={dpto.idDepartamento} key={dpto.idDepartamento}>
                {dpto.codigoDepartamento} - {dpto.nombreDepartamento}
              </option>
            ))}
            
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Modificar Distrito
          </button>
          <Link
            to="/distritos"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 block text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  )
}

export default EditDistrito