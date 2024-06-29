import { Outlet } from "react-router-dom";
import AppTopBar from "./includes/appTopBar";
import AppFooter from "./includes/appFooter";

const AppLayout = () => {
  return (<div>
    <AppTopBar />
    <Outlet />
    <AppFooter />
  </div>
  )
}

export default AppLayout;