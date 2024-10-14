import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const AltaOperador = () => {
  const [data, setData] = useState([]);
  // Estados para almacenar los datos del formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [usuario, setUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("")
  const [rol, setRol] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/roles/listar")
      .then((response) => response.json()) // Aquí convertimos a JSON
      .then((data) => setData(data)) // Aquí asignamos los datos
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  
  const handleGuardarOperador = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const nuevoOperador = {
      nombreOperador: nombre.toUpperCase(),
      apellidoOperador: apellido.toUpperCase(),
      nombreUsuario: usuario.toUpperCase(),
      contrasenia: contrasenia,
      unRol : {idRol : rol}
    };

    try {
      const response = await fetch("http://localhost:8080/operadores/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoOperador),
      });

      // Verifica si el servidor envía texto en lugar de JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json(); // Maneja si es JSON
        console.log("Operador agregado con éxito:", data);
      } else {
        const text = await response.text(); // Maneja si es texto plano
        console.log("Respuesta del servidor:", text);
      }

      // Mostrar alerta de éxito
      Swal.fire({
        toast: true,
        position: "top-end", // Cambia la posición según necesites
        icon: "success",
        title: "Operador creado con éxito",
        showConfirmButton: false,
        timer: 2000, // Duración en milisegundos
      });

      // Redirige a la página de roles
      navigate("/operadores");
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">
          Alta de Operadores
        </h1>
      </div>
      <form
        className="max-w-lg mx-auto border shadow-md sm:rounded-lg p-10 mt-10"
        onSubmit={handleGuardarOperador}
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nombre
          </label>
          <input
            type="text"
            id="nombre"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nombre Oeperador"
            maxLength={60}
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
            htmlFor="apellido"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Apellido
          </label>
          <input
            type="text"
            id="apellido"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Apellido Operador"
            maxLength={40}
            required
            value={apellido}
            //onChange={(e) => setApellido(e.target.value)}
            onChange={(e) => {
              const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
              if (regex.test(e.target.value)) {
                setApellido(e.target.value); // Solo actualizar si cumple con el patrón
              }
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="usuario"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Usuario
          </label>
          <input
            type="text"
            id="usuario"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Nombre Usuario"
            maxLength={20}
            required
            value={usuario}
            //onChange={(e) => setUsuario(e.target.value)}
            onChange={(e) => {
              const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]*$/;
              if (regex.test(e.target.value)) {
                setUsuario(e.target.value); // Solo actualizar si cumple con el patrón
              }
            }}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="contrasenia"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Contraseña
          </label>
          <input
            type="text"
            id="contrasenia"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Contraseña"
            minLength={8}
            maxLength={15}
            required
            value={contrasenia}
            onChange={(e) => setContrasenia(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="roles"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Tipo de Rol
          </label>
          <select
            id="roles"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={rol}
            onChange={(e) => setRol(Number(e.target.value))}
          >
            {data.map((rol) => (
              <option value={rol.idRol} key={rol.idRol}>
                {rol.nombreRol}
              </option>
            ))}
            
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Registrar Operador
          </button>
          <Link
            to="/operadores"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 block text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AltaOperador;
