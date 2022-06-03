import { useState } from "react";
import { Link } from "react-router-dom";

export function MenuDropdown({ menu, icon, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Menu link */}
      <span className="menu">
        <i className={`${icon || "pi pi-user"} mr-2`}></i> {menu}
      </span>

      {/* Dropdown menu items */}
      <div
        className={`flex-col z-10 py-5 shadow-sm rounded-sm absolute bg-white w-36 lg:w-36 rounded-md left-1 ${
          show ? "flex" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export function MenuDropdownLink({ children, icon, href = "/", ...rest }) {
  const myIcon = <i className={`${icon || "pi pi-user"} mr-2`}></i>;

  return (
    <Link to={{ pathname: href }} {...rest} className="dropdown">
      {myIcon} {children}
    </Link>
  );
}

export function MenuDropdownButton({ children, icon, onClick }) {
  const myIcon = <i className={`${icon || "pi pi-user"} mr-2`}></i>;

  return (
    <span onClick={onClick} className="dropdown">
      {myIcon} {children}
    </span>
  );
}


export function MenuSimple({ children, icon, href = "/" }) {
  const myIcon = <i className={`${icon || "pi pi-user"} mr-2`}></i>;

  return (
    <div>
      <Link
        to={{
          pathname: href,
        }}
        className="menu"
      >
        {myIcon} {children}
      </Link>
    </div>
  );
}

