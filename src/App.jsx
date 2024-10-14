import { Outlet } from "react-router-dom"
import DashboardView from "./components/dashboardView/DashboardView"
import Header from "./components/header/Header"
import Sidebar from "./components/sidebar/Sidebar"

function App() {


  return (
    <>
      <div className="flex">
        <div className="basis-[18%]">
          <Sidebar />
        </div>
        <div className="basis-[82%]">
          <div className="w-100">
            <Header />
          </div>
          <div>
            {/* <DashboardView /> */}
            <div>
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
