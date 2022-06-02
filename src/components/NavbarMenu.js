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
      <a className="menu">
        <i className={`${icon || "pi pi-user"} mr-2`}></i> {menu}
      </a>

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

// NOTE: this is with anchor, can work with onClick but is inefficient as it reloads page.

// export function MenuDropdownItem({ children, icon, ...rest }) {
//   return (
//     <a
//       {...rest}
//       className="dropdown"
//     >
//       <i className={`${icon || "pi pi-user"} mr-2`}></i> {children}
//     </a>
//   );
// }

// NOTE: This is with Link only, cannot work with onClick properly

// export function MenuDropdownItem({ children, icon, ...rest }) {
//   return (
//     <Link {...rest} className="dropdown">
//       <i className={`${icon || "pi pi-user"} mr-2`}></i> {children}
//     </Link>
//   );
// }

export function MenuDropdownItem({ children, icon, href = "/", ...rest }) {
  const myIcon = <i className={`${icon || "pi pi-user"} mr-2`}></i>;

  // Use anchor if there is an onClick event
  if ("onClick" in { ...rest }) {
    return (
      <a {...rest} className="dropdown">
        {myIcon} {children}
      </a>
    );
  }

  // otherwise, for any path redirect don't reload page and use Link component instead.
  return (
    <Link to={{ pathname: href }} {...rest} className="dropdown">
      {myIcon} {children}
    </Link>
  );
}

// NOTE: this is old menusimple
export function MenuSimple({ children, icon, href = "/" }) {
  return (
    <div>
      <Link
        to={{
          pathname: href,
        }}
        className="menu"
      >
        <i className={`${icon || "pi pi-user"} mr-2`}></i> {children}
      </Link>
    </div>
  );
}

// Approach 1, use anchor href to navigate --> PROBLEM: will trigger unnecessary page reload (bad practice)
// Approach 2, use Link to navigate --> PROBLEM: cannot onClick() properly, will always navigate
// Approach 3, use anchor and onClick event to navigate and use useNavigate to navigate between components. (best?)
