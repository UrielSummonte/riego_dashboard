import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaEdit, FaTrash, FaUndo } from "react-icons/fa";
import Swal from "sweetalert2"; // Importa SweetAlert2

export const VistaParcela = () => {
  // Estados para almacenar los datos del formulario
  const [codDepartamento, setCodDepartamento] = useState("");
  const [nomDepartamento, setNomDepartamento] = useState("");
  const [codDistrito, setCodDistrito] = useState("");
  const [nomDistrito, setNomDistrito] = useState("");
  const [partida, setPartida] = useState("");
  const [matcat, setMatcat] = useState("");
  const [titular, setTitular] = useState("");
  const [domTitular, setDomTitular] = useState("");
  const [arrendatario, setArrendatario] = useState("");
  const [domArrendatario, setDomArrendatario] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [supRiego, setSupRiego] = useState(0);
  const [baja, setBaja] = useState("");
  const [enSFV, setEnSFV] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [fechaBaja, setFechaBaja] = useState("");

  const navigate = useNavigate();
  const { idParcela } = useParams();

  // Función para manejar la redirección
  const handleNavigation = (href) => {
    if (href) {
      navigate(href);
    }
  };

  //Funcion fecha dd-mm-aaaa
  const convertirFecha = (fechaOriginal) => {
    if (!fechaOriginal) return "";

    // Dividimos la fecha en partes (aaaa, mm, dd)
    const [anio, mes, dia] = fechaOriginal.split("-");

    // Retornamos la fecha en el nuevo formato (dd-mm-aaaa)
    return `${dia}-${mes}-${anio}`;
  };

  useEffect(() => {
    // Llamada a la API para obtener los datos del operador a editar
    const fetchParcela = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/parcelas/${idParcela}`
        );
        if (!response.ok) throw new Error("Error al obtener la parcela");

        const parce = await response.json();
        setCodDepartamento(parce.unDepartament.codigoDepartamento);
        setNomDepartamento(parce.unDepartament.nombreDepartamento);
        setCodDistrito(parce.unDistrito.codigoDistrito);
        setNomDistrito(parce.unDistrito.nombreDistrito);
        setPartida(parce.partida);
        setMatcat(parce.matriculaCatastral);
        setTitular(parce.titular);
        setDomTitular(parce.domicilioTitular);
        setArrendatario(parce.arrendatario);
        setDomArrendatario(parce.domicilioArrendatario);
        setSupRiego(parce.superficieRiego);
        setTipoServicio(parce.unServicio.codigoServicio);
        setBaja(parce.baja);
        setEnSFV(parce.enSFV);
        setFechaAlta(convertirFecha(parce.fechaAlta));
        setFechaBaja(convertirFecha(parce.fechaBaja));
        //setFechaAlta(parce.fechaAlta);
        //setFechaBaja(parce.fechaBaja);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchParcela();
  }, [idParcela]);

  // Función para eliminar la parcela
  const handleEliminarParcela = async (idParcela) => {
    const confirmation = await Swal.fire({
      title: "¿Estás seguro?",
      text: "La parcela será dada de baja",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, dar de Baja",
      cancelButtonText: "Cancelar",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:8080/parcelas/eliminar/${idParcela}`,
          {
            method: "PUT",
          }
        );

        if (response.ok) {
          // Actualiza el estado para quitar el rol eliminado
          //setData(data.filter((operador) => operador.idOperador !== idOperador));
          Swal.fire({
            toast: true,
            position: "top-end", // Cambia la posición según necesites
            icon: "success",
            title: "La parcela ha sido dada de baja",
            showConfirmButton: false,
            timer: 2000, // Duración en milisegundos
          });

          navigate("/parcelas");
        } else {
          const errorText = await response.text();
          console.error("Error al eliminar la parcela:", errorText);
          // Mostrar alerta de error
          Swal.fire({
            toast: true,
            position: "top-end", // Cambia la posición según necesites
            icon: "error",
            title: "Error al eliminar la parcela",
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
          title: "Error al eliminar la parcela",
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });
      }
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">
          Datos de Parcela
        </h1>
      </div>
      <div className="max-w-[90%] mx-auto border shadow-md sm:rounded-lg p-10 mt-10">
         <div className="flex items-center justify-between mb-8">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => {
              handleNavigation(`/parcelas/deuda/${idParcela}`);
            }}
          >
            Ver deuda
          </button>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            onClick={() => {
              handleNavigation(`/pagos/${idParcela}`);
            }}
          >
            Ver Pagos
          </button>
          
        </div>
        <div className="flex items-center justify-between">
          <div className="mb-5 w-2/6">
            <label
              htmlFor="departamento"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Departamento
            </label>
            <input
              type="text"
              id="departamento"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={`${codDepartamento} - ${nomDepartamento}`}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-2/6">
            <label
              htmlFor="distrito"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Distrito
            </label>
            <input
              type="text"
              id="distrito"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={`${codDistrito} - ${nomDistrito}`}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="partida"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Partida
            </label>
            <input
              type="text"
              id="partida"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={partida}
              readOnly
              disabled
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="mb-5 w-2/5">
            <label
              htmlFor="titular"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Titular
            </label>
            <input
              type="text"
              id="titular"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={titular}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-[50%]">
            <label
              htmlFor="domTitular"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Domicilio Titular
            </label>
            <input
              type="text"
              id="domTitular"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={domTitular}
              readOnly
              disabled
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="mb-5 w-2/5">
            <label
              htmlFor="arrendatario"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Arrendatario
            </label>
            <input
              type="text"
              id="arrendatario"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={arrendatario}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-[50%]">
            <label
              htmlFor="domArrendatario"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Domicilio Arrendatario
            </label>
            <input
              type="text"
              id="domArrendatario"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={domArrendatario}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="mb-5 w-1/5">
            <label
              htmlFor="superficie"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Superficie
            </label>
            <input
              type="text"
              id="superficie"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={`${supRiego} Has.`}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="servicio"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Servicio
            </label>
            <input
              type="text"
              id="servicio"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={`${tipoServicio}`}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="matricula"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Mat. Catastral
            </label>
            <input
              type="text"
              id="matricula"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={matcat}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="mb-5 w-1/5">
            <label
              htmlFor="baja"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              De Baja
            </label>
            <input
              type="text"
              id="baja"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                baja === "SI" ? "bg-red-200" : "bg-green-200"
              }`}
              value={`${baja}`}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="enSFV"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              En SFVC
            </label>
            <input
              type="text"
              id="servenSFVcio"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={`${enSFV}`}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="fechaAlta"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Fecha Alta
            </label>
            <input
              type="text"
              id="fechaAlta"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={fechaAlta}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="fechaBaja"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Fecha Baja
            </label>
            <input
              type="text"
              id="fechaBaja"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={fechaBaja}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="flex items-center justify-around mt-8">
          <button
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center flex items-center justify-center gap-2"
            onClick={() => {
              handleNavigation(`/parcelas/editar-parcela/${idParcela}`);
            }}
          >
            <FaEdit />
            <span>Modificar</span>
          </button>
          
          {baja === "NO" && (
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 text-center flex items-center justify-center gap-2"
              onClick={() => handleDarBaja(idParcela)}
            >
              <FaTrash />
              <span>Dar de Baja</span>
            </button>
          )}
          <Link
            to="/parcelas"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 mt-4 text-center flex items-center justify-center gap-2"
          >
            <FaUndo />
            <span>Cancelar</span>
          </Link>
        </div>

        {/* <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Modificar Operador
          </button>
          <Link
            to="/operadores"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 block text-center"
          >
            Cancelar
          </Link>
        </div> */}
      </div>
    </div>
  );
};
