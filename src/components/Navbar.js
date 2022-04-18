import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { authSignout } from "../modules/authentication/services/AuthenticationAction"
import useAuthentication from "../modules/authentication/services/AuthenticationState"
import { MenuDropdown, MenuDropdownItem } from "./NavbarMenu"

export default function Navbar() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useAuthentication()

    const handleSignout = () => {
        dispatch(authSignout(() => {
            window.location = "/auth/signin"
        }))
    }

    return (
        <div className='lg:flex md:flex items-center'>
            <MenuDropdown menu={'Manage'} icon={'pi pi-box'}>
                <MenuDropdownItem onClick={() => navigate("/drink")}>Drink</MenuDropdownItem>
            </MenuDropdown>
            <MenuDropdown menu={user.username}>
                <MenuDropdownItem onClick={() => navigate("/")}>Profile</MenuDropdownItem>
                <MenuDropdownItem onClick={handleSignout}>Log out</MenuDropdownItem>
            </MenuDropdown>
        </div>
    )
}