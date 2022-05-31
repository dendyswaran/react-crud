import { getByTestId } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authSignout } from "../modules/authentication/services/AuthenticationAction";
import useAuthentication from "../modules/authentication/services/AuthenticationState";
import { MenuDropdown, MenuDropdownItem, MenuSimple } from "./NavbarMenu";
import { React, useState } from "react";
import IohLogo from "./IohLogo";

export default function Navbar() {
  // const hidden = true;
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
    hiddenStr + " w-full block flex-grow lg:flex lg:items-center lg:w-auto";

  // const navigate = useNavi gate();

  return (
    <nav className="bg-white w-full">
      <div className="container flex items-center justify-between flex-wrap p-6 w-full mx-auto">
        <div className="flex items-center flex-shrink-0 mr-6">
          <div className="md:flex ">
            <IohLogo />
          </div>
        </div>
        {/* Mobile Menu Button, TODO: to be moved into component*/}
        <div className="block lg:hidden">
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
          <div className="text-sm lg:flex-grow lg:inline-flex">
            <MenuSimple children="Tasklist" icon="pi pi-file"></MenuSimple>
            <MenuSimple
              children="Enquiry"
              icon="pi pi-info-circle"
            ></MenuSimple>
            <MenuSimple children="File Upload" icon="pi pi-upload"></MenuSimple>
            <MenuSimple
              children="User Management"
              icon="pi pi-users"
            ></MenuSimple>
          </div>
          <div>
            <MenuDropdown
              className="flex-1"
              menu={"Hi admin, " + user.username}
            >
              <MenuDropdownItem
                onClick={() => navigate("/")}
                icon="pi pi-user-edit"
              >
                Profile
              </MenuDropdownItem>
              <MenuDropdownItem onClick={handleSignout} icon="pi pi-sign-out">
                Log out
              </MenuDropdownItem>

            </MenuDropdown>
          </div>
        </div>
      </div>
    </nav>
  );
}
