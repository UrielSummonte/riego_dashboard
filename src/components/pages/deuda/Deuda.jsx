import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

const Deuda = () => {
  const [data, setData] = useState([]);
  // Estados para almacenar los datos del formulario
  const [departamento, setDepartamento] = useState("");
  const [distrito, setDistrito] = useState("");
  const [partida, setPartida] = useState("");
  const [titular, setTitular] = useState("");
  const [arrendatario, setArrendatario] = useState("");
  const [supRiego, setSupRiego] = useState(0);
  const [baja, setBaja] = useState("");
  const [totalImporte, setTotalImporte] = useState(0); // Estado para el total del importe

  const navigate = useNavigate();
  const { idParcela } = useParams();

  // Función para manejar la redirección
  const handleNavigation = (href) => {
    if (href) {
      navigate(href);
    }
  };

  useEffect(() => {
    fetch(`http://localhost:8080/parcelas/deuda/${idParcela}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        // Calcular la suma de todos los importesVencimiento
        const total = data.reduce(
          (acc, item) => acc + (item.importeVencimiento || 0),
          0
        );
        setTotalImporte(total); // Actualizar el total en el estado
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [idParcela]);

  useEffect(() => {
    if (data.length > 0 && data[0]?.unaParcela) {
      setDepartamento(
        `${data[0].unaParcela.unDepartament.codigoDepartamento} - ${data[0].unaParcela.unDepartament.nombreDepartamento}`
      );
      setDistrito(
        `${data[0].unaParcela.unDistrito.codigoDistrito} - ${data[0].unaParcela.unDistrito.nombreDistrito}`
      );
      setPartida(data[0].unaParcela.partida);
      setTitular(data[0].unaParcela.titular);
      setArrendatario(data[0].unaParcela.arrendatario);
      setSupRiego(data[0].unaParcela.superficieRiego);
      setBaja(data[0].unaParcela.baja);
    }
  }, [data]);

  console.log(data);

  return (
    <div>
      <div>
        <h1 className="text-center text-3xl font-bold mt-7">
          Deuda de Parcela
        </h1>
      </div>
      <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
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
              value={departamento}
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
              value={distrito}
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
          <div className="mb-5 w-4/12">
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
          <div className="mb-5 w-4/12">
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
          <div className="mb-5 w-1/12">
            <label
              htmlFor="supRiego"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Sup. de Riego
            </label>
            <input
              type="text"
              id="supRiego"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={supRiego}
              readOnly
              disabled
            />
          </div>
          <div className="mb-5 w-1/12">
            <label
              htmlFor="baja"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Baja
            </label>
            <input
              type="text"
              id="baja"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              value={baja}
              readOnly
              disabled
            />
          </div>
        </div>
      </div>
      <div className="mt-11 w-[90%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Periodo
              </th>
              <th scope="col" className="px-6 py-3">
                Importe Base
              </th>
              <th scope="col" className="px-6 py-3">
                Interes
              </th>
              <th scope="col" className="px-6 py-3">
                Importe Final
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((deuda) => (
              <tr
                key={deuda.idDeuda}
                className="bg-white border-b hover:bg-gray-50"
              >
                <td className="px-6 py-4">{deuda.periodo}</td>
                <td className="px-6 py-4">{deuda.importeVencimiento}</td>
                <td className="px-6 py-4">0.00</td>
                <td className="px-6 py-4">0.00</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-11 w-[100%] mx-auto relative overflow-x-auto border shadow-md sm:rounded-lg p-8">
          <div className="flex items-center justify-around">
            <label htmlFor="">{`Total sin Intereses ${totalImporte}`}</label>
            <label htmlFor="">{`Total Intereses ${departamento}`}</label>
            <label htmlFor="">{`Total con Intereses ${departamento}`}</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Deuda;
