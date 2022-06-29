import { useState } from "react";
import { Link } from "react-router-dom";

const menuStyling = `
                    xl:mt-0
                    text-black
                    text-base
                    box-border
                    xl:h-5
                    h-10
                    w-full
                    hover:text-primary
                    ml-4
                    text-left
                    p-2 lg:p-0
                    hover:bg-slate-100
                    lg:hover:bg-white
                    rounded-md`;


export function MenuDropdown({
  menu,
  icon,
  padding = "0",
  width = "w-40", // poor design, need improvement
  isRoot = true,
  children,
}) {
  const [show, setShow] = useState(false);

  const right = <i className="pl-2 pi pi-angle-right"></i>;
  const down = <i className="pl-2 pi pi-angle-down"></i>;

  // "isRoot" allow for distinctive styling for root menu and non root elements.
  const absoluteOrRelative = isRoot ? "absolute" : "relative";

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Menu link */}
      <span className={menuStyling}>
        <i className={`${icon || "pi pi-user"} mr-2`}></i> {menu}
        {show ? down : right}
      </span>

      {/* Dropdown menu items */}
      <div
        className={`flex-col z-10 py-5 shadow-md rounded-sm ${absoluteOrRelative} bg-white lg:w-40 right-0 rounded-md ${
          show ? "flex" : "hidden"
        } ${width}`}
      >
        {children}
      </div>
    </div>
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
        className={menuStyling}
      >
        {myIcon} {children}
      </Link>
    </div>
  );
}



// Not needed! 

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

// export function MenuDropdown({ menu, icon, padding="0", width = "w-40", children }) {
//   const [show, setShow] = useState(false);

//   const right = <i className="pl-2 pi pi-angle-right"></i>;
//   const down = <i className="pl-2 pi pi-angle-down"></i>;

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setShow(true)}
//       onMouseLeave={() => setShow(false)}
//     >
//       {/* Menu link */}
//       <span className={`menu mx-2`}>
//         <i className={`${icon || "pi pi-user"} mr-2`}></i> {menu}
//         {show ? down : right}
//       </span>

//       {/* Dropdown menu items */}
//       <div
//         className={`flex-col z-10 py-5 shadow-md rounded-sm absolute bg-white lg:w-40 rounded-md left-${padding} items-center ${
//           show ? "flex" : "hidden"
//         } ${width}`}
//       >
//         {children}
//       </div>
//     </div>
//   );
// }
