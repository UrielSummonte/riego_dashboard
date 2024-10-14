// import React, { useEffect } from "react";
// import { useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // Importa SweetAlert2

// const LiquidacionServicio = () => {
//   const [data, setData] = useState([]);
//   const [seleccionDistritos, setSeleccionDistritos] = useState([]);
//   const [periodoSeleccionado, setPeriodoSeleccionado] = useState(""); // Estado para el tipo de periodo seleccionado
//   const [opcionPeriodo, setOpcionPeriodo] = useState([]); // Estado para las opciones del select
//   const [years, setYears] = useState([]); // Estado para los años
//   const [periodo, setPeriodo] = useState("");
//   const [anio, setAnio] = useState("");
//   const [primerVencimiento, setPrimerVencimiento] = useState("");
//   const [segundoVencimiento, setSegundoVencimiento] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:8080/distritos/listar")
//       .then((response) => response.json()) // Aquí convertimos a JSON
//       .then((data) => setData(data)) // Aquí asignamos los datos
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Función para manejar la redirección
//   const handleNavigation = (href) => {
//     if (href) {
//       navigate(href);
//     }
//   };

//   // Funcion para manejar la seleccion
//   const handleSeleccion = (distritoSeleccionado) => {
//     setSeleccionDistritos((prevSeleccion) => {
//       if (prevSeleccion.includes(distritoSeleccionado.idDistrito)) {
//         // Si el idDistrito ya está seleccionado, lo quitamos de la selección
//         return prevSeleccion.filter(
//           (id) => id !== distritoSeleccionado.idDistrito
//         );
//       } else {
//         // Si no está seleccionado, lo añadimos
//         return [...prevSeleccion, distritoSeleccionado.idDistrito];
//       }
//     });
//   };

//   // Función para manejar la selección de un tipo de periodo
//   const handlePeriodSelection = (tipoPeriodo) => {
//     setPeriodoSeleccionado(tipoPeriodo);

//     let options = [];
//     switch (tipoPeriodo) {
//       case "MENSUAL":
//         options = Array.from({ length: 12 }, (_, i) => `${i + 1}º Periodo`);
//         break;
//       case "BIMESTRAL":
//         options = Array.from({ length: 6 }, (_, i) => `${i + 1}º Bimestre`);
//         break;
//       case "TRIMESTRAL":
//         options = Array.from({ length: 4 }, (_, i) => `${i + 1}º Trimestre`);
//         break;
//       case "CUATRIMESTRAL":
//         options = Array.from({ length: 3 }, (_, i) => `${i + 1}º Cuatrimestre`);
//         break;
//       case "SEMESTRAL":
//         options = Array.from({ length: 2 }, (_, i) => `${i + 1}º Semestre`);
//         break;
//       case "ANUAL":
//         options = ["Año Completo"];
//         break;
//       default:
//         options = [];
//     }

//     setOpcionPeriodo(options); // Actualizamos las opciones del select
//   };

//   useEffect(() => {
//     // Obtener el año actual
//     const currentYear = new Date().getFullYear();
//     // Crear un array con dos años hacia atrás y dos años hacia adelante
//     const availableYears = [];
//     for (let i = currentYear - 2; i <= currentYear + 2; i++) {
//       availableYears.push(i);
//     }
//     setYears(availableYears);
//   }, []);

//   const handleLiquidar = async (e) => {
//     e.preventDefault();

//     let peri = periodo.substring(0, 1) + "/" + anio;

//     const datosLiquidacion = {
//       distritos: seleccionDistritos, // Distritos seleccionados
//       periodoCompleto: peri,
//       primerVencimiento: primerVencimiento,
//       segundoVencimiento: segundoVencimiento,
//     };

//     console.log(datosLiquidacion);

//     try {
//       const response = await fetch(
//         "http://localhost:8080/liquidacion",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(datosLiquidacion),
//         }
//       );

//       if (response.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Liquidación guardada correctamente",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Error al guardar la liquidación",
//           showConfirmButton: false,
//           timer: 2000,
//         });
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h1 className="text-center text-3xl font-bold mt-7">
//           Liquidacion del Canon
//         </h1>
//       </div>
//       <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 ID
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Cod. Departamento
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Nombre Departamento
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Cod. Distrito
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Nombre Distrito
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Seleccion
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((distri) => (
//               <tr
//                 key={distri.idDistrito}
//                 className="bg-white border-b hover:bg-gray-50"
//               >
//                 <td className="px-6 py-4">{distri.idDistrito}</td>
//                 <td className="px-6 py-4">{distri.codigoDepartamento}</td>
//                 <td className="px-6 py-4">{distri.nombreDepartamento}</td>
//                 <td className="px-6 py-4">{distri.codigoDistrito}</td>
//                 <td className="px-6 py-4">{distri.nombreDistrito}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center justify-center">
//                     <input
//                       type="checkbox"
//                       className="text-green-400 hover:text-green-600"
//                       onChange={() => handleSeleccion(distri)}
//                       checked={seleccionDistritos.includes(distri.idDistrito)} // Para mantener la sincronización visual
//                     ></input>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <form
//         className="max-w-[90%] mx-auto border shadow-md sm:rounded-lg p-10 mt-10"
//         onSubmit={handleLiquidar}
//       >
//         <div className="mb-5">
//           <label className="block mb-2 text-sm font-medium text-gray-900">
//             Tipo de Liquidacion
//           </label>
//           <div className="flex items-center justify-evenly">
//             <div className="flex items-center justify-center">
//               <input
//                 type="radio"
//                 id="mensual"
//                 name="sel_periodo"
//                 value="MENSUAL"
//                 onChange={() => handlePeriodSelection("MENSUAL")}
//               />
//                <label htmlFor="mensual">MENSUAL</label>
//             </div>
//             <div className="flex items-center justify-center">
//               <input
//                 type="radio"
//                 id="bimestral"
//                 name="sel_periodo"
//                 value="BIMESTRAL"
//                 onChange={() => handlePeriodSelection("BIMESTRAL")}
//               />
//                <label htmlFor="bimestral">BIMESTRAL</label>
//             </div>
//             <div className="flex items-center justify-center">
//               <input
//                 type="radio"
//                 id="trimestral"
//                 name="sel_periodo"
//                 value="TRIMESTRAL"
//                 onChange={() => handlePeriodSelection("TRIMESTRAL")}
//               />
//                 <label htmlFor="trimestral">TRIMESTRAL</label>
//             </div>
//             <div className="flex items-center justify-center gap-2">
//               <input
//                 type="radio"
//                 id="cuatrimestral"
//                 name="sel_periodo"
//                 value="CUATRIMESTRAL"
//                 onChange={() => handlePeriodSelection("CUATRIMESTRAL")}
//               />
//               <label htmlFor="cuatrimestral">CUATRIMESTRAL</label>
//             </div>
//             <div className="flex items-center justify-center">
//               <input
//                 type="radio"
//                 id="semestral"
//                 name="sel_periodo"
//                 value="SEMESTRAL"
//                 onChange={() => handlePeriodSelection("SEMESTRAL")}
//               />
//                 <label htmlFor="semestral">SEMESTRAL</label>
//             </div>
//             <div className="flex items-center justify-center">
//               <input
//                 type="radio"
//                 id="anual"
//                 name="sel_periodo"
//                 value="ANUAL"
//                 onChange={() => handlePeriodSelection("ANUAL")}
//               />
//                <label htmlFor="anual">ANUAL</label>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="mb-5 w-2/5">
//             <label
//               htmlFor="periodo"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               Periodo
//             </label>
//             <select
//               id="periodo"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={periodo}
//               onChange={(e) => setPeriodo(e.target.value)}
//             >
//               <option value="" disabled>
//                 -- Seleccione un periodo --
//               </option>
//               {opcionPeriodo.map((option, index) => (
//                 <option key={index} value={option}>
//                   {option}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="mb-5 w-2/5">
//             <label
//               htmlFor="selectYear"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               Seleccione el año
//             </label>
//             <select
//               id="selectYear"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               value={anio}
//               onChange={(e) => setAnio(e.target.value)}
//             >
//               <option value="" disabled>
//                 -- Seleccione un año --
//               </option>
//               {years.map((year, index) => (
//                 <option key={index} value={year}>
//                   {year}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           <div className="mb-5 w-2/5">
//             <label
//               htmlFor="primerVencimiento"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               1º Vencimiento
//             </label>
//             <input
//               type="date"
//               id="primerVencimiento"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               min="2020-01-01"
//               max="2040-12-31"
//               value={primerVencimiento}
//               onChange={(e) => setPrimerVencimiento(e.target.value)}
//             />
//           </div>
//           <div className="mb-5 w-2/5">
//             <label
//               htmlFor="segundoVencimiento"
//               className="block mb-2 text-sm font-medium text-gray-900"
//             >
//               2º Vencimiento
//             </label>
//             <input
//               type="date"
//               id="segundoVencimiento"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
//               min="2020-01-01"
//               max="2040-12-31"
//               value={segundoVencimiento}
//               onChange={(e) => setSegundoVencimiento(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="flex items-center justify-between">
//           <button
//             type="submit"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//           >
//             Iniciar Liquidacion
//           </button>
//           <Link
//             to="/distritos"
//             className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 block text-center"
//           >
//             Cancelar
//           </Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LiquidacionServicio;

import React, { useEffect } from "react";
import { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const LiquidacionServicio = () => {
  const [data, setData] = useState([]);
  const [seleccionDistritos, setSeleccionDistritos] = useState([]); // Se mantendrá vacío inicialmente
  const [periodoSeleccionado, setPeriodoSeleccionado] = useState(""); // Estado para el tipo de periodo seleccionado
  const [opcionPeriodo, setOpcionPeriodo] = useState([]); // Estado para las opciones del select
  const [years, setYears] = useState([]); // Estado para los años
  const [periodo, setPeriodo] = useState("");
  const [anio, setAnio] = useState("");
  const [primerVencimiento, setPrimerVencimiento] = useState("");
  const [segundoVencimiento, setSegundoVencimiento] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/distritos/listar")
      .then((response) => response.json()) // Aquí convertimos a JSON
      .then((data) => {
        setData(data);
        // Inicializamos seleccionDistritos con todos los idDistrito de los distritos
        setSeleccionDistritos(data.map((d) => d.idDistrito));
      }) // Aquí asignamos los datos
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Función para manejar la redirección
  const handleNavigation = (href) => {
    if (href) {
      navigate(href);
    }
  };

  // Funcion para manejar la seleccion
  const handleSeleccion = (distritoSeleccionado) => {
    setSeleccionDistritos((prevSeleccion) => {
      if (prevSeleccion.includes(distritoSeleccionado.idDistrito)) {
        // Si el idDistrito ya está seleccionado, lo quitamos de la selección
        return prevSeleccion.filter(
          (id) => id !== distritoSeleccionado.idDistrito
        );
      } else {
        // Si no está seleccionado, lo añadimos
        return [...prevSeleccion, distritoSeleccionado.idDistrito];
      }
    });
  };

  // Función para manejar la selección de un tipo de periodo
  const handlePeriodSelection = (tipoPeriodo) => {
    setPeriodoSeleccionado(tipoPeriodo);

    let options = [];
    switch (tipoPeriodo) {
      case "MENSUAL":
        options = Array.from({ length: 12 }, (_, i) => `${i + 1}º Periodo`);
        break;
      case "BIMESTRAL":
        options = Array.from({ length: 6 }, (_, i) => `${i + 1}º Bimestre`);
        break;
      case "TRIMESTRAL":
        options = Array.from({ length: 4 }, (_, i) => `${i + 1}º Trimestre`);
        break;
      case "CUATRIMESTRAL":
        options = Array.from({ length: 3 }, (_, i) => `${i + 1}º Cuatrimestre`);
        break;
      case "SEMESTRAL":
        options = Array.from({ length: 2 }, (_, i) => `${i + 1}º Semestre`);
        break;
      case "ANUAL":
        options = ["Año Completo"];
        break;
      default:
        options = [];
    }

    setOpcionPeriodo(options); // Actualizamos las opciones del select
  };

  useEffect(() => {
    // Obtener el año actual
    const currentYear = new Date().getFullYear();
    // Crear un array con dos años hacia atrás y dos años hacia adelante
    const availableYears = [];
    for (let i = currentYear - 2; i <= currentYear + 2; i++) {
      availableYears.push(i);
    }
    setYears(availableYears);
  }, []);

  const handleLiquidar = async (e) => {
    e.preventDefault();

    if (seleccionDistritos.length != 0) {
      let peri = periodo.substring(0, 1) + "/" + anio;

      const datosLiquidacion = {
        distritos: seleccionDistritos, // Distritos seleccionados
        periodoCompleto: peri,
        primerVencimiento: primerVencimiento,
        segundoVencimiento: segundoVencimiento,
      };

      console.log(datosLiquidacion);

      try {
        const response = await fetch("http://localhost:8080/liquidacion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(datosLiquidacion),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Liquidación guardada correctamente",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al guardar la liquidación",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "Debe seleccionar algun distrito",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">
          Liquidacion del Canon
        </h1>
      </div>
      <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Cod. Departamento
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre Departamento
              </th>
              <th scope="col" className="px-6 py-3">
                Cod. Distrito
              </th>
              <th scope="col" className="px-6 py-3">
                Nombre Distrito
              </th>
              <th scope="col" className="px-6 py-3">
                Seleccion
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((distri) => (
              <tr
                key={distri.idDistrito}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{distri.idDistrito}</td>
                <td className="px-6 py-4">{distri.codigoDepartamento}</td>
                <td className="px-6 py-4">{distri.nombreDepartamento}</td>
                <td className="px-6 py-4">{distri.codigoDistrito}</td>
                <td className="px-6 py-4">{distri.nombreDistrito}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      className="text-green-400 hover:text-green-600"
                      onChange={() => handleSeleccion(distri)}
                      checked={seleccionDistritos.includes(distri.idDistrito)} // Para mantener la sincronización visual
                    ></input>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <form
        className="max-w-[90%] mx-auto border shadow-md sm:rounded-lg p-10 mt-10"
        onSubmit={handleLiquidar}
      >
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Tipo de Liquidacion
          </label>
          <div className="flex items-center justify-evenly">
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="mensual"
                name="sel_periodo"
                value="MENSUAL"
                onChange={() => handlePeriodSelection("MENSUAL")}
              />
               <label htmlFor="mensual">MENSUAL</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="bimestral"
                name="sel_periodo"
                value="BIMESTRAL"
                onChange={() => handlePeriodSelection("BIMESTRAL")}
              />
               <label htmlFor="bimestral">BIMESTRAL</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="trimestral"
                name="sel_periodo"
                value="TRIMESTRAL"
                onChange={() => handlePeriodSelection("TRIMESTRAL")}
              />
               <label htmlFor="trimestral">TRIMESTRAL</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="cuatrimestral"
                name="sel_periodo"
                value="CUATRIMESTRAL"
                onChange={() => handlePeriodSelection("CUATRIMESTRAL")}
              />
               <label htmlFor="cuatrimestral">CUATRIMESTRAL</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="semestral"
                name="sel_periodo"
                value="SEMESTRAL"
                onChange={() => handlePeriodSelection("SEMESTRAL")}
              />
               <label htmlFor="semestral">SEMESTRAL</label>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="radio"
                id="anual"
                name="sel_periodo"
                value="ANUAL"
                onChange={() => handlePeriodSelection("ANUAL")}
              />
               <label htmlFor="anual">ANUAL</label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="mb-5 w-2/5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Periodo
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setPeriodo(e.target.value)}
              required
            >
              <option value="">Seleccione un periodo</option>
              {opcionPeriodo.map((opcion, index) => (
                <option key={index} value={opcion}>
                  {opcion}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-5 w-2/5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Año
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setAnio(e.target.value)}
              required
            >
              <option value="">Seleccione un año</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="mb-5 w-2/5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Primer Vencimiento
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setPrimerVencimiento(e.target.value)}
              required
            />
          </div>

          <div className="mb-5 w-2/5">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Segundo Vencimiento
            </label>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setSegundoVencimiento(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Iniciar Liquidacion
          </button>
          <Link
            to="/"
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 mt-4 block text-center"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LiquidacionServicio;
