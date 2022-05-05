import { Menubar } from 'primereact/menubar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authSignout } from "../modules/authentication/services/AuthenticationAction"
import { fetchMenuParents } from '../modules/menu/services/MenuAction'
import { MenuDropdown, MenuDropdownItem } from "./NavbarMenu"

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { menu_navigation } = useSelector(state => state.menuReducer)

    const handleSignout = () => {
        dispatch(authSignout(() => {
            window.location = "/auth/signin"
        }))
    }

    useEffect(() => {
      return () => dispatch(fetchMenuParents(true))
    }, [])

    return (
        <div className='lg:flex md:flex items-center justify-start flex-1'>

            <Menubar
                className="border-0 bg-transparent"
                model={menu_navigation}
            />

            <MenuDropdown menu={"Account"}>
                <MenuDropdownItem onClick={() => navigate("/")}>Profile</MenuDropdownItem>
                <MenuDropdownItem onClick={handleSignout}>Log out</MenuDropdownItem>
            </MenuDropdown>
        </div>
    )
}
