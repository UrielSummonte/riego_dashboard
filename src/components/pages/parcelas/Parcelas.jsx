// import React, { useEffect } from "react";
// import { useState } from "react";
// import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2"; // Importa SweetAlert2

// const Parcelas = () => {

//   const [data, setData] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:8080/parcelas/listar")
//       .then((response) => response.json()) // Aquí convertimos a JSON
//       .then((data) => setData(data)) // Aquí asignamos los datos
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//    // Función para manejar la redirección
//    const handleNavigation = (href) => {
//     if (href) {
//       navigate(href);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h1 className="text-center text-3xl font-bold mt-7">Parcelas</h1>
//       </div>
//       <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
//         <div className="mb-6">
//           <Link
//             to="/parcelas/alta-parcela"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//           >
//             Agregar nueva Parcela
//           </Link>
//         </div>
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3">
//                 ID
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Dpto.
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Distrito
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Partida
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Titular
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Arrendatario
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Superficie
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Acciones
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((parce) => (
//               <tr key={parce.idParcela} className="bg-white border-b hover:bg-gray-50">
//                 <td className="px-6 py-4">{parce.idParcela}</td>
//                 <td className="px-6 py-4">{parce.codigoDepartamento}</td>
//                 <td className="px-6 py-4">{parce.codigoDistrito}</td>
//                 <td className="px-6 py-4">{parce.partida}</td>
//                 <td className="px-6 py-4">{parce.titular}</td>
//                 <td className="px-6 py-4">{parce.arrendatario}</td>
//                 <td className="px-6 py-4">{parce.superficieRiego}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <button
//                     className="text-blue-500 hover:text-blue-700"
//                     onClick={() => {
//                       handleNavigation(`ver-parcela/${parce.idParcela}`);
//                     }}
//                   >
//                     <FaEye />
//                   </button>
//                     <button
//                       className="text-green-500 hover:text-green-700"
//                       onClick={() => {
//                         handleNavigation(`editar-parcela/${parce.idParcela}`);
//                       }}
//                     >
//                       <FaEdit />
//                     </button>
//                     {/* <button
//                       className="text-red-500 hover:text-red-700"
//                       onClick={() => handleEliminarParcela(parce.idParcela)}
//                     >
//                       <FaTrash />
//                     </button> */}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// export default Parcelas


// import React, { useEffect, useState } from "react";
// import { FaEdit, FaEye } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";

// const Parcelas = () => {
//   const [data, setData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1); // Página actual
//   const [itemsPerPage] = useState(10); // Resultados por página
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("http://localhost:8080/parcelas/listar")
//       .then((response) => response.json())
//       .then((data) => setData(data))
//       .catch((error) => console.error("Error fetching data:", error));
//   }, []);

//   // Calcular el índice de los primeros y últimos elementos de la página actual
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentData = data.slice(indexOfFirstItem, indexOfLastItem); // Datos que se mostrarán en la página actual

//   // Cambiar página
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   // Función para manejar la redirección
//   const handleNavigation = (href) => {
//     if (href) {
//       navigate(href);
//     }
//   };

//   return (
//     <div>
//       <div>
//         <h1 className="text-center text-3xl font-bold mt-7">Parcelas</h1>
//       </div>
//       <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
//         <div className="mb-6">
//           <Link
//             to="/parcelas/alta-parcela"
//             className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
//           >
//             Agregar nueva Parcela
//           </Link>
//         </div>
//         <table className="w-full text-sm text-left rtl:text-right text-gray-500">
//           <thead className="text-xs text-gray-700 uppercase bg-gray-50">
//             <tr>
//               <th scope="col" className="px-6 py-3">ID</th>
//               <th scope="col" className="px-6 py-3">Dpto.</th>
//               <th scope="col" className="px-6 py-3">Distrito</th>
//               <th scope="col" className="px-6 py-3">Partida</th>
//               <th scope="col" className="px-6 py-3">Titular</th>
//               <th scope="col" className="px-6 py-3">Arrendatario</th>
//               <th scope="col" className="px-6 py-3">Superficie</th>
//               <th scope="col" className="px-6 py-3">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentData.map((parce) => (
//               <tr key={parce.idParcela} className="bg-white border-b hover:bg-gray-50">
//                 <td className="px-6 py-4">{parce.idParcela}</td>
//                 <td className="px-6 py-4">{parce.codigoDepartamento}</td>
//                 <td className="px-6 py-4">{parce.codigoDistrito}</td>
//                 <td className="px-6 py-4">{parce.partida}</td>
//                 <td className="px-6 py-4">{parce.titular}</td>
//                 <td className="px-6 py-4">{parce.arrendatario}</td>
//                 <td className="px-6 py-4">{parce.superficieRiego}</td>
//                 <td className="px-6 py-4">
//                   <div className="flex space-x-2">
//                     <button
//                       className="text-blue-500 hover:text-blue-700"
//                       onClick={() => handleNavigation(`ver-parcela/${parce.idParcela}`)}
//                     >
//                       <FaEye />
//                     </button>
//                     <button
//                       className="text-green-500 hover:text-green-700"
//                       onClick={() => handleNavigation(`editar-parcela/${parce.idParcela}`)}
//                     >
//                       <FaEdit />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Paginación */}
//         <div className="flex justify-center mt-4">
//           <ul className="inline-flex items-center -space-x-px">
//             {[...Array(Math.ceil(data.length / itemsPerPage)).keys()].map((number) => (
//               <li key={number}>
//                 <button
//                   onClick={() => paginate(number + 1)}
//                   className={`px-3 py-2 leading-tight ${
//                     currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
//                   } border border-gray-300 hover:bg-gray-200`}
//                 >
//                   {number + 1}
//                 </button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Parcelas;




import React, { useEffect, useState } from "react";
import { FaEdit, FaEye } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Parcelas = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const [itemsPerPage] = useState(10); // Resultados por página
  const [searchDpto, setSearchDpto] = useState(""); // Filtro por departamento
  const [searchDistrito, setSearchDistrito] = useState(""); // Filtro por distrito
  const [searchPartida, setSearchPartida] = useState(""); // Filtro por partida
  const [searchTitular, setSearchTitular] = useState(""); // Filtro por titular

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/parcelas/listar")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filtro combinado por departamento, distrito y partida
  const filteredData = data.filter((parce) => {
    return (
      parce.codigoDepartamento.toLowerCase().includes(searchDpto.toLowerCase()) &&
      parce.codigoDistrito.toLowerCase().includes(searchDistrito.toLowerCase()) &&
      parce.partida.toLowerCase().includes(searchPartida.toLowerCase()) &&
      parce.titular.toLowerCase().includes(searchTitular.toLowerCase())
    );
  });

  // Calcular el índice de los primeros y últimos elementos de la página actual
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem); // Datos que se mostrarán en la página actual

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Función para manejar la redirección
  const handleNavigation = (href) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">Parcelas</h1>
      </div>
      
      {/* Sección de Filtros */}
      <div className="w-[90%] mx-auto mt-6 mb-6 flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
        <input
          type="text"
          placeholder="Filtrar por Dpto"
          value={searchDpto}
          onChange={(e) => setSearchDpto(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Filtrar por Distrito"
          value={searchDistrito}
          onChange={(e) => setSearchDistrito(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Filtrar por Partida"
          value={searchPartida}
          onChange={(e) => setSearchPartida(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
        <input
          type="text"
          placeholder="Filtrar por Titular"
          value={searchTitular}
          onChange={(e) => setSearchTitular(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        />
      </div>

      <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
        <div className="mb-6">
          <Link
            to="/parcelas/alta-parcela"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Agregar nueva Parcela
          </Link>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Dpto.</th>
              <th scope="col" className="px-6 py-3">Distrito</th>
              <th scope="col" className="px-6 py-3">Partida</th>
              <th scope="col" className="px-6 py-3">Titular</th>
              <th scope="col" className="px-6 py-3">Arrendatario</th>
              <th scope="col" className="px-6 py-3">Superficie</th>
              <th scope="col" className="px-6 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((parce) => (
              <tr key={parce.idParcela} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4">{parce.idParcela}</td>
                <td className="px-6 py-4">{parce.codigoDepartamento}</td>
                <td className="px-6 py-4">{parce.codigoDistrito}</td>
                <td className="px-6 py-4">{parce.partida}</td>
                <td className="px-6 py-4">{parce.titular}</td>
                <td className="px-6 py-4">{parce.arrendatario}</td>
                <td className="px-6 py-4">{parce.superficieRiego}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleNavigation(`ver-parcela/${parce.idParcela}`)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="text-green-500 hover:text-green-700"
                      onClick={() => handleNavigation(`editar-parcela/${parce.idParcela}`)}
                    >
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginación */}
        <div className="flex justify-center mt-4">
          <ul className="inline-flex items-center -space-x-px">
            {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number + 1)}
                  className={`px-3 py-2 leading-tight ${
                    currentPage === number + 1 ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                  } border border-gray-300 hover:bg-gray-200`}
                >
                  {number + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Parcelas;
