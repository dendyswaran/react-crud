import { useState } from "react"

export function MenuDropdown({ menu, icon, children }) {
    const [show, setShow] = useState(false)

    return (
        <div className="relative"
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}>

            {/* Menu link */}
            <a className='text-black mx-3 cursor-pointer font-medium hover:text-gray-600'>
                <i className={`${icon || 'pi pi-user'} mr-2`}></i> {menu}
            </a>

            {/* Dropdown menu items */}
            <div className={`flex-col z-10 py-5 shadow-sm rounded-sm absolute bg-white lg:w-36 right-1 ${show ? 'flex' : 'hidden'}`}>
                {children}
            </div>
        </div>
    )
}

export function MenuDropdownItem({ children, ...rest }) {
    return (
        <a {...rest} className="px-5 py-1 cursor-pointer hover:text-gray-600">{children}</a>
    )
}