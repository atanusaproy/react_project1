import { Outlet } from "react-router-dom";
import AppTopBar from "./includes/appTopBar";

const AppLayout = () => {
  return (<div>
    <AppTopBar />
      <Outlet />
    Footer
  </div>
  )
}

export default AppLayout;