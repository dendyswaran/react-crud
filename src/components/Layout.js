// import { Sidebar } from "primereact/sidebar";
// import { useState } from "react";
import Navbar from "./Navbar";


export default function Layout({ children }) {
  // const [visible, setVisible] = useState(true);

  return (
    <div className="flex-col w-full h-full">
      <Navbar></Navbar>
      <br />

      {/* <Sidebar
        visible={false}
        onHide={() => setVisible(false)}
        closeOnEscape
      ></Sidebar> */}

      <div className="flex container mx-auto">
        {/* Content */}
        <div className="flex w-full">
          {/* Side menu */}
          <div className="flex flex-col w-1/12"></div>
          {/* Children */}
          <div className="flex flex-col w-10/12">{children}</div>
        </div>
      </div>
      {/* <select name="" id="" disabled="disabled"></select> */}
    </div>
  );
}
