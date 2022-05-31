import { useState } from "react";

export function MenuDropdown({ menu, icon, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {/* Menu link */}
      <a className="block mt-2 lg:inline-block lg:mt-0 text-black text-base box-border lg:h-5 h-10   w-full hover:text-red-400 mr-4  border-red-400 lg:text-center p-2 lg:p-0 hover:bg-slate-100 lg:hover:bg-white rounded-md">
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

export function MenuDropdownItem({ children, icon, ...rest }) {
  return (
    <a {...rest} className="px-5 py-1 cursor-pointer hover:text-red-400 hover:bg-slate-100 rounded-md">
      <i className={`${icon || "pi pi-user"} mr-2`}></i> {children}
    </a>
  );
}

export function MenuSimple({ children, icon, href="/" }) {
  return (
    <div>
      <a className="block mt-2 lg:inline-block lg:mt-0 text-black text-base box-border lg:h-5 h-10   w-full hover:text-red-400 mr-4  border-red-400 lg:text-center p-2 lg:p-0 hover:bg-slate-100 lg:hover:bg-white rounded-md" 
      href={href}>
        <i className={`${icon || "pi pi-user"} mr-2`}></i> {children}
      </a>
    </div>
  );
}
