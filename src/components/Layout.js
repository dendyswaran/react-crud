// import { Sidebar } from "primereact/sidebar";
// import { useState } from "react";
import Navbar from "./Navbar";
import NavPath from "./NavigationPath/NavPath";
import { Outlet } from "react-router-dom";
import TimeoutModal from "./Modal/TimeoutModal";
import { useIdleTimer } from "react-idle-timer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignout } from "../modules/authentication/services/AuthenticationAction";

export default function Layout(props, { children }) {
  const timeoutWarn = 20000;
  const timeoutLogout = 12000;
  const [isIdle, setIsIdle] = useState(false);
  const dispatch = useDispatch();

  const handleSignout = () => {
    dispatch(
      authSignout(() => {
        window.location = "/auth/signin";
      })
    );
  };

  // Create Idle timer
  useIdleTimer({
    timeout: timeoutWarn,
    onActive: () => onActiveHandler(),
    onIdle: () => onIdleHandler(),
  });

  const onIdleHandler = () => {
    setIsIdle(true);
    window.logoutCountDown = setTimeout(() => handleSignout(), timeoutLogout);
  };

  const onActiveHandler = () => {
    setIsIdle(false);
    clearTimeout(window.logoutCountDown);
  };

  return (
    <div className="flex-col w-full h-full">
      <Navbar />
      {/* <Sidebar
        visible={false}
        onHide={() => setVisible(false)}
        closeOnEscape
      ></Sidebar> */}

      <div className="flex container mx-auto pt-36 pb-10">
        {/* Content */}

        <div className="flex w-full">
          {/* Side menu */}
          <div className="flex flex-col w-1/12"></div>
          {/* Children */}

          <div className="flex flex-col w-10/12">
            <NavPath />
            <TimeoutModal
              isTimeout={isIdle}
              timeoutLogout={timeoutLogout}
            ></TimeoutModal>
            <br />
            {children}
            <Outlet />
          </div>
        </div>
      </div>
      {/* <select name="" id="" disabled="disabled"></select> */}
    </div>
  );
}
