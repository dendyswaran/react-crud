// import { Sidebar } from "primereact/sidebar";
// import { useState } from "react";
import Navbar from "./Navbar";
import NavPath from "./NavigationPath/NavPath";
import { Outlet } from "react-router-dom";
export default function Layout({ children }) {
  // const [visible, setVisible] = useState(true);

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
