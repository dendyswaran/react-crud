import { useState } from "react";
import { Link } from "react-router-dom";

export function MenuDropdown({ menu, icon, width = "w-40", children }) {
  const [show, setShow] = useState(false);

  const right = <i className="pl-2 pi pi-angle-right"></i>;
  const down = <i className="pl-2 pi pi-angle-down"></i>;

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Menu link */}
      <span className={`menu mx-2`}>
        <i className={`${icon || "pi pi-user"} mr-2`}></i> {menu}
        {show ? down : right}
      </span>

      {/* Dropdown menu items */}
      <div
        className={`flex-col z-10 py-5 shadow-md rounded-sm absolute bg-white lg:w-40 rounded-md right-0 items-center ${
          show ? "flex" : "hidden"
        } ${width}`}
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
        className="menu mx-2"
      >
        {myIcon} {children}
      </Link>
    </div>
  );
}
