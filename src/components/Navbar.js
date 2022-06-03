import { useState } from "react";
import { getByTestId } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSignout } from "../modules/authentication/services/AuthenticationAction";
import useAuthentication from "../modules/authentication/services/AuthenticationState";
import {
  MenuDropdown,
  MenuDropdownLink,
  MenuDropdownButton,
  MenuSimple,
} from "./NavbarMenu";
import IohLogo from "./IohLogo";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useAuthentication();

  const handleSignout = () => {
    dispatch(
      authSignout(() => {
        window.location = "/auth/signin";
      })
    );
  };

  const [hidden, setHidden] = useState(true);

  // flip hidden flag
  const hideHandler = () => {
    setHidden(!hidden);
  };

  const hiddenStr = hidden ? "hidden" : "";
  const myClass =
    hiddenStr + " w-full block flex-grow xl:flex xl:items-center xl:w-auto";

  return (
    <nav className="bg-white w-full fixed z-50 drop-shadow-lg">
      <div className="container flex items-center justify-between flex-wrap p-6 w-full mx-auto">
        <div className="flex items-center flex-shrink-0 mr-6">
          <div className="md:flex ">
            <IohLogo />
          </div>
        </div>
        {/* Mobile Menu Button, TODO: to be moved into component*/}
        <div className="block xl:hidden">
          <button
            onClick={hideHandler}
            className="flex items-center px-3 py-2 border rounded text-gray-400 border-gray-400 hover:text-red-400 hover:border-red-400"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        {/* TODO: switch anchor to react Link, maybe no need*/}
        <div className={myClass}>
          <div className="text-sm xl:flex-grow xl:inline-flex text-left">
            <MenuSimple children="Home" icon="pi pi-home"></MenuSimple>

            <MenuDropdown
              icon="pi pi-list"
              className="flex-1"
              menu={"Task List"}
            >
              <MenuDropdownLink href="/ioh-tasklist" icon="pi pi-file">
                IOH
              </MenuDropdownLink>
              <MenuDropdownLink href="/decom-tasklist-detail" icon="pi pi-file">
                DECOM
              </MenuDropdownLink>
            </MenuDropdown>

            <MenuSimple children="File Upload" icon="pi pi-upload" />
            <MenuSimple children="Assignment" icon="pi pi-check-square" />
            <MenuSimple
              children="Site Status Enquiry"
              icon="pi pi-info-circle"
            />
            <MenuSimple
              href="/user-management"
              children="User Management"
              icon="pi pi-users"
            />
          </div>
          <div>
            <MenuDropdown
              className="flex-1"
              menu={"Hi admin, " + user.username}
            >
              <MenuDropdownButton
                // onClick={test}
                icon="pi pi-user-edit"
              >
                Profile
              </MenuDropdownButton>

              <MenuDropdownButton onClick={handleSignout} icon="pi pi-sign-out">
                Log out
              </MenuDropdownButton>
            </MenuDropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
