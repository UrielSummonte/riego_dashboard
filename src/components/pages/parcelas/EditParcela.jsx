import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const EditParcela = () => {
  const [dataDepartamento, setDataDepartamento] = useState([]);
  const [dataDistrito, setDataDistrito] = useState([]);
  const [dataServicio, setDataServicio] = useState([]);

  // Estados para almacenar los datos del formulario
  const [idDepartamento, setIdDepartamento] = useState(1);
  const [idDistrito, setIdDistrito] = useState(1);
  const [partida, setPartida] = useState("");
  const [matcat, setMatcat] = useState("");
  const [titular, setTitular] = useState("");
  const [domTitular, setDomTitular] = useState("");
  const [arrendatario, setArrendatario] = useState("");
  const [domArrendatario, setDomArrendatario] = useState("");
  const [idServicio, setIdServicio] = useState(1);
  const [supRiego, setSupRiego] = useState(0);
  const [baja, setBaja] = useState("");
  const [enSFV, setEnSFV] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [fechaBaja, setFechaBaja] = useState("");

  const navigate = useNavigate();
  const { idParcela } = useParams();

  useEffect(() => {
    // Llamada a la API para obtener los datos del operador a editar
    const fetchParcela = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/parcelas/${idParcela}`
        );
        if (!response.ok) throw new Error("Error al obtener la parcela");

        const parce = await response.json();
        setIdDepartamento(parce.unDepartament.idDepartamento);
        setIdDistrito(parce.unDistrito.idDistrito);
        setPartida(parce.partida);
        setMatcat(parce.matriculaCatastral);
        setTitular(parce.titular);
        setDomTitular(parce.domicilioTitular);
        setArrendatario(parce.arrendatario);
        setDomArrendatario(parce.domicilioArrendatario);
        setSupRiego(parce.superficieRiego);
        setIdServicio(parce.unServicio.idServicio);
        if (parce.baja === "SI") {
          setBaja("1");
        } else {
          setBaja("0");
        }
        if (parce.enSFV === "SI") {
          setEnSFV("1");
        } else {
          setEnSFV("0");
        }
        setFechaAlta(parce.fechaAlta);
        setFechaBaja(parce.fechaBaja);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchParcela();
  }, [idParcela]);
  
  useEffect(() => {
    fetch("http://localhost:8080/departamentos/listar")
      .then((response) => response.json()) // Aquí convertimos a JSON
      .then((dataDepartamento) => setDataDepartamento(dataDepartamento)) // Aquí asignamos los datos
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (idDepartamento) {
      // Solo ejecutar si hay un departamento seleccionado
      fetch(`http://localhost:8080/distritos/listar/${idDepartamento}`) // Cambia la URL según tu API
        .then((response) => response.json())
        .then((dataDistrito) => setDataDistrito(dataDistrito))
        .catch((error) => console.error("Error fetching districts:", error));
    } else {
      setDataDistrito([]); // Limpiar distritos si no hay departamento seleccionado
    }
  }, [idDepartamento]); // Dependencia en departamento

  // Efecto que se dispara cuando dataDistrito cambia
useEffect(() => {
  if (dataDistrito.length > 0) {
    // Accedemos al 6to departamento (índice 5)
    setIdDistrito(dataDistrito[0]?.idDistrito);
  }
}, [dataDistrito]); // Este efecto depende de dataDepartamento

  useEffect(() => {
    fetch("http://localhost:8080/servicios/listar")
      .then((response) => response.json()) // Aquí convertimos a JSON
      .then((dataServicio) => setDataServicio(dataServicio)) // Aquí asignamos los datos
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleGuardarParcela = async (event) => {
    event.preventDefault(); // Evita que el formulario recargue la página

    const nuevaParcela = {
      idParcela: idParcela,
      unDepartament: { idDepartamento: idDepartamento },
      unDistrito: { idDistrito: idDistrito },
      partida: partida,
      titular: titular.toUpperCase(),
      domicilioTitular: domTitular.toUpperCase(),
      arrendatario: arrendatario.toUpperCase(),
      domicilioArrendatario: domArrendatario.toUpperCase(),
      unServicio: { idServicio: idServicio },
      superficieRiego: supRiego,
      matriculaCatastral: matcat,
      baja: baja,
      enSFV: enSFV,
      fechaAlta: fechaAlta,
      fechaBaja: fechaBaja,
    };
    
    try {
      const response = await fetch(`http://localhost:8080/parcelas/editar`, {
        method: "PUT", // Cambia a PUT si es para editar
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevaParcela),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Parcela modificada con éxito:", data);

        // Mostrar alerta de éxito
        Swal.fire({
          toast: true,
          position: "top-end", // Cambia la posición según necesites
          icon: "success",
          title: "Parcela modificada con éxito",
          showConfirmButton: false,
          timer: 2000, // Duración en milisegundos
        });

        navigate("/parcelas");
      } else {
        const errorText = await response.text();
        console.error("Error al modificar la Parcela:", errorText);

        // Mostrar alerta de error
        Swal.fire({
          toast: true,
          position: "top-end", // Cambia la posición según necesites
          icon: "error",
          title: "Error al modificar la Parcela",
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
        <h1 className="text-center text-3xl font-bold mt-7">Edicion de Parcela</h1>
      </div>
      <form
        className="max-w-[90%] mx-auto border shadow-md sm:rounded-lg p-10 mt-10"
        onSubmit={handleGuardarParcela}
      >
        <div className="flex items-center justify-between">
          <div className="mb-5 w-2/6">
            <label
              htmlFor="departamento"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Departamento
            </label>
            <select
              id="departamento"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={idDepartamento}
              onChange={(e) => setIdDepartamento(Number(e.target.value))}
            >
              {dataDepartamento.map((dpto) => (
                <option value={dpto.idDepartamento} key={dpto.idDepartamento}>
                  {dpto.codigoDepartamento} - {dpto.nombreDepartamento}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5 w-2/6">
            <label
              htmlFor="distrito"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Distrito
            </label>
            <select
              id="distrito"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={idDistrito}
              onChange={(e) => setIdDistrito(Number(e.target.value))}
            >
              {dataDistrito.map((dto) => (
                <option value={dto.idDistrito} key={dto.idDistrito}>
                  {dto.codigoDistrito} - {dto.nombreDistrito}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5 w-1/6">
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
              placeholder="Partida"
              minLength={4}
              maxLength={4}
              required
              value={partida}
              //onChange={(e) => setPartida(e.target.value)}
              onChange={(e) => {
                const regex = /^[0-9]*$/;
                if (regex.test(e.target.value)) {
                  setPartida(e.target.value); // Solo actualizar si cumple con el patrón
                }
              }}
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
              placeholder="Titular"
              maxLength={50}
              required
              value={titular}
              //onChange={(e) => setTitular(e.target.value)}
              onChange={(e) => {
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
                if (regex.test(e.target.value)) {
                  setTitular(e.target.value); // Solo actualizar si cumple con el patrón
                }
              }}
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
              placeholder="Domicilio Titular"
              maxLength={100}
              required
              value={domTitular}
              //onChange={(e) => setDomTitular(e.target.value)}
              onChange={(e) => {
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]*$/;
                if (regex.test(e.target.value)) {
                  setDomTitular(e.target.value); // Solo actualizar si cumple con el patrón
                }
              }}
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
              placeholder="Arrendatario"
              maxLength={50}
              required
              value={arrendatario}
              //onChange={(e) => setArrendatario(e.target.value)}
              onChange={(e) => {
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]*$/;
                if (regex.test(e.target.value)) {
                  setArrendatario(e.target.value); // Solo actualizar si cumple con el patrón
                }
              }}
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
              placeholder="Domicilio Arrendatario"
              maxLength={100}
              required
              value={domArrendatario}
              //onChange={(e) => setDomArrendatario(e.target.value)}
              onChange={(e) => {
                const regex = /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9\s]*$/;
                if (regex.test(e.target.value)) {
                  setDomArrendatario(e.target.value); // Solo actualizar si cumple con el patrón
                }
              }}
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
              placeholder="Superficie"
              required
              value={supRiego}
              //onChange={(e) => setSupRiego(e.target.value)}
              onChange={(e) => {
                const regex = /^(\d+)(\.\d{0,1})?$/; // Permitir números y punto como separador decimal
                if (regex.test(e.target.value) || e.target.value === "") {
                  setSupRiego(e.target.value); // Solo actualizar si cumple con el patrón o si se está borrando
                }
              }}
            />
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="servicio"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Servicio
            </label>
            <select
              id="servicio"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={idServicio}
              onChange={(e) => setIdServicio(Number(e.target.value))}
            >
              {dataServicio.map((serv) => (
                <option value={serv.idServicio} key={serv.idServicio}>
                  {serv.codigoServicio}
                </option>
              ))}
            </select>
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
              placeholder="Matricula Catastral"
              required
              value={matcat}
              onChange={(e) => setMatcat(e.target.value)}
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
            <select
              id="baja"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={baja}
              onChange={(e) => setBaja(Number(e.target.value))}
            >
              <option value="0">NO</option>
              <option value="1">SI</option>
            </select>
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="enSFV"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              En SFVC
            </label>
            <select
              id="enSFV"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={enSFV}
              onChange={(e) => setEnSFV(Number(e.target.value))}
            >
              <option value="0">NO</option>
              <option value="1">SI</option>
            </select>
          </div>
          <div className="mb-5 w-1/5">
            <label
              htmlFor="fechaAlta"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Fecha Alta
            </label>
            <input
              type="date"
              id="fechaAlta"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              min="2000-01-01"
              max="2040-12-31"
              value={fechaAlta}
              onChange={(e) => setFechaAlta(e.target.value)}
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
              type="date"
              id="fechaBaja"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              min="2000-01-01"
              max="2040-12-31"
              value={fechaBaja}
              onChange={(e) => setFechaBaja(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center justify-around mt-8">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
            // onClick={() => {
            //   handleNavigation(`/parcelas/editar-parcela/${idParcela}`);
            // }}
          >
            {/* <FaEdit /> */}
            <span>Modificar Parcela</span>
          </button>

          <Link
            to="/parcelas"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-10 py-2.5 mt-4 text-center flex items-center justify-center gap-2"
          >
            {/* <FaUndo /> */}
            <span>Cancelar</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditParcela;