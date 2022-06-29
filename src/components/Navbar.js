import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import useMenuAction from "../modules/menu/services/MenuState";
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
  const location = useLocation();
  const { menus } = useMenuAction();
  const { menu_navigation } = useMenuAction();
  // const res = constructNavMenu(menus); // TODO: to be removed

  const handleSignout = () => {
    dispatch(
      authSignout(() => {
        window.location = "/auth/signin";
      })
    );
  };

  const [hidden, setHidden] = useState(true);

  // flip hidden flag
  const flipHideHandler = () => {
    setHidden(!hidden);
  };

  useEffect(() => {
    setHidden(true);
  }, [location]);

  // TODO: also at NavMenu --> show arrow open and close conditionally !!!

  const hiddenStr = hidden ? "hidden" : "";
  const myClass =
    hiddenStr + " w-full block flex-grow xl:flex xl:items-center xl:w-auto";

  console.log("menus: ", menus);

  return (
    <nav className="bg-white w-full fixed z-50 drop-shadow-lg">
      <div className="container flex items-center justify-between flex-wrap p-6 w-full mx-auto">
        <div className="block xl:hidden">
          <button
            onClick={flipHideHandler}
            className="flex items-center px-3 py-2 border rounded text-gray-400 border-gray-400 hover:text-primary hover:border-primary"
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
        <div className="flex mx-auto flex-shrink-0 xl:mr-6 md:flex">
          <IohLogo />
        </div>
        <div className="block xl:hidden">
          <MenuDropdown>
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

        <div className={myClass}>
          <div className="text-sm xl:flex-grow xl:inline-flex text-left">
            {/* <MenuSimple children="Home" icon="pi pi-home"></MenuSimple>

            <MenuDropdownp
              icon="pi pi-list"
              className="flex-1"
              menu={"Task List"}'
              width="w-full"
            >
              <MenuDropdownLink href="/ioh-tasklist-old" icon="pi pi-file">
                IOH (OLD)
              </MenuDropdownLink>
              <MenuDropdownLink href="/ioh-tasklist" icon="pi pi-file">
                IOH
              </MenuDropdownLink>
              <MenuDropdownLink href="/decom-tasklist" icon="pi pi-file">
                DECOM
              </MenuDropdownLink>
              <MenuDropdownLink href="/scrap-tasklist" icon="pi pi-file">
                SCRAP
              </MenuDropdownLink>
              <MenuDropdownLink href="/oem-tasklist" icon="pi pi-file">
                OEM
              </MenuDropdownLink>
              <MenuSimple>OEM</MenuSimple>
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
            /> */}

            {menu_navigation}
          </div>

          <div className="hidden xl:block">
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

//-------------------------------------
// PRIVATE
//-------------------------------------

/**
 * This function is used to construct individual navbar item conditionally.
 */

// TODO: step 1: make a non async menu construct work --> then switch to asynchronus implementations
// To be removed after finalised --> this function has been moved into redux action!!!
const constructNavMenu = (menuItems = [], isRoot = true, res = []) => {
  menuItems.forEach((item) => {
    // if menu do not have a child
    if (!item.children.length) {
      // TODO: create an icon field for the icons
      // TODO: change menu "children" field to "name" field.
      res.push(
        <MenuSimple
          key={item.id}
          href={item.href}
          children={item.name}
          icon="pi pi-users" // TODO: this field is to be updated.
        />
      );
    } else {
      const children = constructNavMenu(item.children, false);
      res.push(
        <MenuDropdown
          key={item.id}
          icon="pi pi-list"
          className="flex-1"
          menu={item.name}
          padding="0"
          isRoot={isRoot}
          width="w-full"
        >
          {children}
        </MenuDropdown>
      );
    }
  });
  return res;
};

// TODO: Render submenu invoke multiple API calls using recursion for all menu items until all submenu have been pulled from backend
// This approach can be improved by preformat the Menu items into a DTO first and perform a single API call.
// Thus the code below are supporting functions for that

// /**
//  * A helper function to render the sub menus (only if exists)
//  *
//  * @param {Number} _parentId
//  * @returns
//  */
// async function renderSubMenu(_parentId) {
//     const { data: resp } = await get(`/api/menus/parents/${_parentId}`, true)

//     if (!resp.success || resp.data.length === 0) {
//         return
//     }

//     let submenu = []

//     resp.data.forEach(async (_menu) => {
//         const _submenuItems = await renderSubMenu(_menu.id)

//         if (!_submenuItems || _submenuItems.length == 0) {
//             submenu.push({
//                 key: String(_menu.id),
//                 data: _menu.name,
//                 label: _menu.name,
//                 template: <Link to={_menu.href || "/"} className="p-menuitem-link">{_menu.name}</Link>
//             })
//         } else {
//             submenu.push({
//                 key: String(_menu.id),
//                 data: _menu.name,
//                 label: _menu.name,
//                 items: _submenuItems,   // this field is used when rendering the top navbar
//                 children: _submenuItems // this field is used when rendering the tree view
//             })
//         }

//     })

//     return submenu

// }
