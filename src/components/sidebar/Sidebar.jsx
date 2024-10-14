// import React, { useState } from "react";
// import { BsBank } from "react-icons/bs";
// import { FaAngleRight, FaTachometerAlt, FaUsers, FaHandHoldingWater   } from "react-icons/fa";
// import { GiGreenhouse } from "react-icons/gi";
// import { GoDesktopDownload, GoLaw } from "react-icons/go";
// import { TbCashRegister, TbReceiptDollar } from "react-icons/tb";
// import { FaUserShield, FaGear, FaTreeCity } from "react-icons/fa6"
// import { useNavigate } from "react-router-dom";

// // Componente Submenu
// const Submenu = ({ items, isVisible }) => {
//   return (
//     <div className={`bg-[#f9fafb] rounded-md transition-all duration-300 ${isVisible ? 'h-auto opacity-100' : 'h-0 opacity-0 overflow-hidden'}`}>
//       {items.map((item, index) => (
//         <button
//           key={index}
//           className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 transition"
//           onClick={() => {
//             if (item.href) window.location.href = item.href; // Usamos window.location para la navegación interna
//           }}
//         >
//           {item.label}
//         </button>
//       ))}
//     </div>
//   );
// };

// const Sidebar = () => {
//   const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
//   const navigate = useNavigate();

//   const handleLiquidacionADeuda = () => {
//     console.log("Liquidacion a Deuda clickeado"); // Añadir log para depuración
//     alert("codigo para pasar a deuda")
//   }

//   // Menú y submenús definidos
//   const menuItems = [
//     { icon: <GiGreenhouse />, label: "Parcelas", href: "/parcelas" },
//     { icon: <TbReceiptDollar />, label: "Recibos" },
//     { icon: <TbCashRegister />, label: "Parte Diario" },
//     { icon: <GoLaw />, label: "Intimaciones" },
//     { icon: <GoDesktopDownload />, label: "Descarga Pagos" },
//     {
//       icon: <BsBank />,
//       label: "Facturación",
//       submenu: [
//         { label: "Liquidacion", href: "/liquidacion" },
//         { label: "Liquidacion a Deuda", onClick: handleLiquidacionADeuda },
//         { label: "Facturacion" },
//       ],
//     },
//     {
//       icon: <FaGear />,
//       label: "Gestion",
//       submenu: [
//         { icon: <FaUsers  />, label: "Operadores", href: "/operadores" },
//         { icon: <FaUserShield />, label: "Roles", href: "/roles" },
//         { icon: <FaTreeCity />, label: "Distritos", href: "/distritos" },
//         { icon: <FaHandHoldingWater  />, label: "Servicios", href: "/servicios" },
//       ],
//     },
//     // { icon: <FaUsers  />, label: "Operadores", href: "/operadores" },
//     // { icon: <FaUserShield />, label: "Roles", href: "/roles" },
//   ];

//   // Controla la apertura del menú
//   const toggleMenu = (index) => {
//     setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
//   };

//   // Función para manejar la redirección
//   const handleNavigation = (href) => {
//     if (href) {
//       navigate(href);
//     }
//   };

//   return (
//     <div className="bg-[#4E73DF] min-h-screen h-full px-[25px]">
//       <div className="px-[10px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
//         <h1 className="text-white text-[20px] leading[24px] font-extrabold cursor-pointer">
//           Admin Panel
//         </h1>
//       </div>
//       <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]">
//         <FaTachometerAlt color="white" />
//         <p className="text-[14px] leading-[20px] font-bold text-white">Dashboard</p>
//       </div>

//       <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
//         <ul className="flex gap-2 flex-col py-[15px]">
//           {menuItems.map((item, index) => (
//             <li key={index} className="text-white">
//               <button
//                 className={`w-full flex items-center justify-between py-2 text-white hover:bg-[#5a5c69] transition rounded-lg`}
//                 // onClick={() => {
//                 //   if (item.href) {
//                 //     handleNavigation(item.href);
//                 //   } else if(item.onClick){
//                 //     item.onClick()
//                 //   }else{
//                 //     toggleMenu(index);
//                 //   }
//                 // }}
//                 onClick={() => {
//                   if (item.href) {
//                     handleNavigation(item.href);
//                   } else if (item.onClick) {
//                     console.log("Llamando a handleLiquidacionaDeuda"); // Agrega un log para depuración
//                     item.onClick(); // Asegúrate de que item.onClick está definido
//                   } else {
//                     toggleMenu(index);
//                   }
//                 }}
//               >
//                 <div className="flex items-center">
//                   <span className="w-[30px] h-[30px] flex items-center justify-center rounded-md">
//                     {item.icon}
//                   </span>
//                   <span className="ml-2">{item.label}</span>
//                 </div>
//                 {item.submenu && (
//                   <span className="ml-auto w-[25px] h-[25px] flex items-center justify-center">
//                     <FaAngleRight />
//                   </span>
//                 )}
//               </button>
//               {item.submenu && (
//                 <Submenu
//                   items={item.submenu}
//                   isVisible={openSubmenuIndex === index}
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from "react";
import { BsBank } from "react-icons/bs";
import {
  FaAngleRight,
  FaTachometerAlt,
  FaUsers,
  FaHandHoldingWater,
} from "react-icons/fa";
import { GiGreenhouse } from "react-icons/gi";
import { GoDesktopDownload, GoLaw } from "react-icons/go";
import { TbCashRegister, TbReceiptDollar } from "react-icons/tb";
import { FaUserShield, FaGear, FaTreeCity } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Importa SweetAlert2

// Componente Submenu
const Submenu = ({ items, isVisible }) => {
  return (
    <div
      className={`bg-[#f9fafb] rounded-md transition-all duration-300 ${
        isVisible ? "h-auto opacity-100" : "h-0 opacity-0 overflow-hidden"
      }`}
    >
      {items.map((item, index) => (
        <button
          key={index}
          className="w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-100 transition"
          onClick={() => {
            if (item.onClick) {
              item.onClick(); // Llama a la función onClick
            } else if (item.href) {
              window.location.href = item.href; // Navegación interna
            }
          }}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

const Sidebar = () => {
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const navigate = useNavigate();

  const handleLiquidacionaDeuda = async (e) => {
    alert("Código para pasar a deuda");

    //e.preventDefault();

      try {
        const response = await fetch("http://localhost:8080/deuda/cargar", {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // body: JSON.stringify(datosLiquidacion),
        });

        if (response.ok) {
          Swal.fire({
            icon: "success",
            title: "Deuda cargada correctamente",
            showConfirmButton: false,
            timer: 2000,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error al cargar la Deuda",
            showConfirmButton: false,
            timer: 2000,
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    
  };

  // Menú y submenús definidos
  const menuItems = [
    { icon: <GiGreenhouse />, label: "Parcelas", href: "/parcelas" },
    { icon: <TbReceiptDollar />, label: "Recibos" },
    { icon: <TbCashRegister />, label: "Parte Diario" },
    { icon: <GoLaw />, label: "Intimaciones" },
    { icon: <GoDesktopDownload />, label: "Descarga Pagos" },
    {
      icon: <BsBank />,
      label: "Facturación",
      submenu: [
        { label: "Liquidacion", href: "/liquidacion" },
        { label: "Liquidacion a Deuda", onClick: handleLiquidacionaDeuda },
        { label: "Facturacion" },
      ],
    },
    {
      icon: <FaGear />,
      label: "Gestion",
      submenu: [
        { icon: <FaUsers />, label: "Operadores", href: "/operadores" },
        { icon: <FaUserShield />, label: "Roles", href: "/roles" },
        { icon: <FaTreeCity />, label: "Distritos", href: "/distritos" },
        {
          icon: <FaHandHoldingWater />,
          label: "Servicios",
          href: "/servicios",
        },
      ],
    },
  ];

  // Controla la apertura del menú
  const toggleMenu = (index) => {
    setOpenSubmenuIndex(openSubmenuIndex === index ? null : index);
  };

  // Función para manejar la redirección
  const handleNavigation = (href) => {
    if (href) {
      setOpenSubmenuIndex(null); // Cierra el submenú al navegar
      navigate(href);
    }
  };

  return (
    <div className="bg-[#4E73DF] min-h-screen h-full px-[25px]">
      <div className="px-[10px] py-[30px] flex items-center justify-center border-b-[1px] border-[#EDEDED]/[0.3]">
        <h1 className="text-white text-[20px] leading[24px] font-extrabold cursor-pointer">
          Admin Panel
        </h1>
      </div>
      <div className="flex items-center gap-[15px] py-[20px] border-b-[1px] border-[#EDEDED]/[0.3]">
        <FaTachometerAlt color="white" />
        <p className="text-[14px] leading-[20px] font-bold text-white">
          Dashboard
        </p>
      </div>

      <div className="border-b-[1px] border-[#EDEDED]/[0.3]">
        <ul className="flex gap-2 flex-col py-[15px]">
          {menuItems.map((item, index) => (
            <li key={index} className="text-white">
              <button
                className={`w-full flex items-center justify-between py-2 text-white hover:bg-[#5a5c69] transition rounded-lg`}
                onClick={() => {
                  if (item.href) {
                    handleNavigation(item.href);
                  } else if (item.onClick) {
                    item.onClick();
                  } else {
                    toggleMenu(index);
                  }
                }}
              >
                <div className="flex items-center">
                  <span className="w-[30px] h-[30px] flex items-center justify-center rounded-md">
                    {item.icon}
                  </span>
                  <span className="ml-2">{item.label}</span>
                </div>
                {item.submenu && (
                  <span className="ml-auto w-[25px] h-[25px] flex items-center justify-center">
                    <FaAngleRight />
                  </span>
                )}
              </button>
              {item.submenu && (
                <Submenu
                  items={item.submenu}
                  isVisible={openSubmenuIndex === index}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
