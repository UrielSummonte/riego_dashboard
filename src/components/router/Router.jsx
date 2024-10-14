// import React from 'react'
// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import App from '../../App'
// import Main from '../main/Main'
// import Roles from '../pages/roles/Roles'
// import Parcelas from '../pages/parcelas/Parcelas'
// import AltaRol from '../pages/roles/AltaRol'
// import EditRol from '../pages/roles/EditRol'
// import Operadores from '../pages/operadores/Operadores'
// import AltaOperador from '../pages/operadores/AltaOperador'
// import EditOperador from '../pages/operadores/EditOperador'
// import Distritos from '../pages/distritos/Distritos'
// import AltaDistrito from '../pages/distritos/AltaDistrito'
// import EditDistrito from '../pages/distritos/EditDistrito'
// import Servicios from '../pages/servicios/Servicios'
// import AltaServicio from '../pages/servicios/AltaServicio'
// import EditServicio from '../pages/servicios/EditServicio'
// import { VistaParcela } from '../pages/parcelas/VistaParcela'
// import AltaParcela from '../pages/parcelas/AltaParcela'
// import EditParcela from '../pages/parcelas/EditParcela'

// const Router = () => {
//   return (
//     <div>
//         <BrowserRouter>
//             <Routes>
//                 <Route path='/' element={<App />}>
//                     <Route index element={<Main />} />
//                 </Route>
//                 <Route path='/parcelas' element={<App />}>
//                     <Route index element={<Parcelas/>} />
//                 </Route>
//                 <Route path='/parcelas/ver-parcela/:idParcela' element={<App />}>
//                     <Route index element={<VistaParcela/>} />
//                 </Route>
//                 <Route path='/parcelas/alta-parcela' element={<App />}>
//                     <Route index element={<AltaParcela/>} />
//                 </Route>
//                 <Route path='/parcelas/editar-parcela/:idParcela' element={<App />}>
//                     <Route index element={<EditParcela/>} />
//                 </Route>
//                 <Route path='/roles' element={<App />}>
//                     <Route index element={<Roles />} />
//                 </Route>
//                 <Route path='/roles/alta-rol' element={<App />}>
//                     <Route index element={<AltaRol />} />
//                 </Route>
//                 <Route path='/roles/editar-rol/:idRol' element={<App />}>
//                     <Route index element={<EditRol />} />
//                 </Route>
//                 <Route path='/operadores' element={<App />}>
//                     <Route index element={<Operadores />} />
//                 </Route>
//                 <Route path='/operadores/alta-operador' element={<App />}>
//                     <Route index element={<AltaOperador />} />
//                 </Route>
//                 <Route path='/operadores/editar-operador/:idOperador' element={<App />}>
//                     <Route index element={<EditOperador />} />
//                 </Route>
//                 <Route path='/distritos' element={<App />}>
//                     <Route index element={<Distritos />} />
//                 </Route>
//                 <Route path='/distritos/alta-distrito' element={<App />}>
//                     <Route index element={<AltaDistrito />} />
//                 </Route>
//                 <Route path='/distritos/editar-distrito/:idDistrito' element={<App />}>
//                     <Route index element={<EditDistrito />} />
//                 </Route>
//                 <Route path='/servicios' element={<App />}>
//                     <Route index element={<Servicios />} />
//                 </Route>
//                 <Route path='/servicios/alta-servicio' element={<App />}>
//                     <Route index element={<AltaServicio />} />
//                 </Route>
//                 <Route path='/servicios/editar-servicio/:idServicio' element={<App />}>
//                     <Route index element={<EditServicio />} />
//                 </Route>
//             </Routes>
            
//         </BrowserRouter>
//     </div>
//   )
// }

// export default Router


import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from '../../App'
import Main from '../main/Main'
import Roles from '../pages/roles/Roles'
import Parcelas from '../pages/parcelas/Parcelas'
import AltaRol from '../pages/roles/AltaRol'
import EditRol from '../pages/roles/EditRol'
import Operadores from '../pages/operadores/Operadores'
import AltaOperador from '../pages/operadores/AltaOperador'
import EditOperador from '../pages/operadores/EditOperador'
import Distritos from '../pages/distritos/Distritos'
import AltaDistrito from '../pages/distritos/AltaDistrito'
import EditDistrito from '../pages/distritos/EditDistrito'
import Servicios from '../pages/servicios/Servicios'
import AltaServicio from '../pages/servicios/AltaServicio'
import EditServicio from '../pages/servicios/EditServicio'
import { VistaParcela } from '../pages/parcelas/VistaParcela'
import AltaParcela from '../pages/parcelas/AltaParcela'
import EditParcela from '../pages/parcelas/EditParcela'
import LiquidacionServicio from '../pages/liquidacionServicio/LiquidacionServicio'
import Deuda from '../pages/deuda/Deuda'
import Pagos from '../pages/pagos/Pagos'

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          {/* Rutas principales */}
          <Route index element={<Main />} />
          <Route path='parcelas' element={<Parcelas />} />
          <Route path='roles' element={<Roles />} />
          <Route path='operadores' element={<Operadores />} />
          <Route path='distritos' element={<Distritos />} />
          <Route path='servicios' element={<Servicios />} />

          {/* Rutas secundarias */}
          <Route path='parcelas/ver-parcela/:idParcela' element={<VistaParcela />} />
          <Route path='parcelas/alta-parcela' element={<AltaParcela />} />
          <Route path='parcelas/editar-parcela/:idParcela' element={<EditParcela />} />
          <Route path='parcelas/deuda/:idParcela' element={<Deuda />} />

          <Route path='roles/alta-rol' element={<AltaRol />} />
          <Route path='roles/editar-rol/:idRol' element={<EditRol />} />

          <Route path='operadores/alta-operador' element={<AltaOperador />} />
          <Route path='operadores/editar-operador/:idOperador' element={<EditOperador />} />

          <Route path='distritos/alta-distrito' element={<AltaDistrito />} />
          <Route path='distritos/editar-distrito/:idDistrito' element={<EditDistrito />} />

          <Route path='servicios/alta-servicio' element={<AltaServicio />} />
          <Route path='servicios/editar-servicio/:idServicio' element={<EditServicio />} />

          <Route path='liquidacion' element={<LiquidacionServicio />} />

          
          <Route path='pagos/idParcela' element={<Pagos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router
