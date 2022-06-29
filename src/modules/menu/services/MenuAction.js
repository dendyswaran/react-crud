import { Link } from "react-router-dom";
import { MENU_ACTION } from "../../../configs/constant";
import session from "../../../configs/session";
import { get } from "../../../helpers/ApiHelper";
import { MenuDropdown } from "../../../components/NavbarMenu";
import { MenuSimple } from "../../../components/NavbarMenu";
import { Route } from "react-router-dom";
import RequireAuth from "../../../components/RequireAuth";
import { ROUTES } from "./MenuMappingConstants";

export function fetchMenuParents(useLocalStorage = false) {
  return async (dispatch) => {
    let menu;

    if (!useLocalStorage || !session.getMenu()) {
      const { data: resp } = await get(`/api/menus/get`, true);
      if (resp.success) {
        menu = resp.data;

        // save into local storage
        session.persistMenu(menu);
      }
    } else {
      menu = session.getMenu();
    }

    await dispatch({ type: MENU_ACTION.MENU_LIST_SUCCESS, payload: menu });
    await dispatch(constructMenuNavigation(menu));
    const { navMenu, clickEventMappingStr } = processMenu(menu);

    // convert string mapping into json
    const clickEventMapping = `{${clickEventMappingStr.slice(0, -2)}}`;

    await dispatch({
      type: MENU_ACTION.MENU_NAVIGATION_SUCCESS,
      payload: navMenu,
      eventMapping: JSON.parse(clickEventMapping),
    });

    // console.log("processedMenu: ", navMenu);
    console.log("appRoutes: ", JSON.parse(clickEventMapping));
  };
}

/**
 *
 * @param {Array} menus
 */
export function constructMenuNavigation(menus) {
  return async (dispatch) => {
    const baseMenu = await renderBaseMenu(menus).catch((_err) =>
      dispatch({
        type: MENU_ACTION.MENU_NAVIGATION_ERROR,
        payload: _err.message,
      })
    );

    dispatch({ type: MENU_ACTION.MENU_NAVIGATION_SUCCESS, payload: baseMenu });
  };
}

//----------------------
// PRIVATE FUNCTIONS
//----------------------

// Process menu
const processMenu = (
  menuItems,
  parentPath = "",
  isRoot = true,
  href = "",
  clickEventMapping = "",
  menus = [],
  routes = [],
  test = []
) => {
  menuItems.forEach((item) => {
    // if menu do not have a child
    // or have hidden child --> in case of user management form and main page.
    if (!item.children.length) {
      // TODO: create an icon field for the icons
      // TODO: change menu "children" field to "name" field.
      menus.push(
        <MenuSimple
          key={item.id}
          href={item.href}
          children={item.name}
          icon="pi pi-users" // TODO: this field is to be updated.
        />
      );
      clickEventMapping += `"${item.href}": "${item.clickEvent}", `;
    } else {
      // perform recursion on children menu items
      const { navMenu, clickEventMappingStr } = processMenu(
        item.children,
        item.pathname,
        false
      );

      // TODO: if breadcrumb link is not generated at the front-end --> we can
      // store the breadcrumb link to each individual menu item and display that instead?
      menus.push(
        <MenuDropdown
          key={item.id}
          icon="pi pi-list"
          className="flex-1"
          menu={item.name}
          padding="0"
          isRoot={isRoot}
          width="w-full"
        >
          {navMenu}
        </MenuDropdown>
      );
      clickEventMapping +=
        clickEventMappingStr + `"${item.href}": "${item.clickEvent}", `;
    }
  });
  return {
    navMenu: menus,
    clickEventMappingStr: clickEventMapping,
  };
};

//----------------------
// PRIVATE FUNCTIONS
//----------------------

/**
 * A helper function to render the initial menu data (parent menus)
 *
 * @param {Array} menus
 * @returns
 */
async function renderBaseMenu(menus) {
  let submenu = [];
  menus.forEach(async (_menu, _idx) => {
    const _subMenuItems = await renderSubMenu(_menu.id);

    submenu.push({
      key: String(_menu.id),
      label: _menu.name,
      data: _menu.name,
      url: _menu.href,
      items: _subMenuItems,
      children: _subMenuItems,
    });
  });

  return [
    {
      key: "1-manage",
      label: "Manage",
      data: "Manage",
      icon: "pi pi-fw pi-box",
      items: submenu, // this field is used when rendering the top navbar
      children: submenu, // this field is used when rendering the tree view
    },
    {
      key: "2-settings",
      label: "Settings",
      data: "Settings",
      icon: "pi pi-fw pi-cog",
      items: [
        {
          label: "Menu",
          template: (
            <Link to={"/settings/menu"} className="p-menuitem-link">
              Menu
            </Link>
          ),
        },
        {
          label: "Manage User",
          template: (
            <Link to={"/manage-user/user-list"} className="p-menuitem-link">
              Manage User
            </Link>
          ),
        },
      ],
    },
  ];
}

/**
 * A helper function to render the sub menus (only if exists)
 *
 * @param {Number} _parentId
 * @returns
 */
async function renderSubMenu(_parentId) {
  const { data: resp } = await get(`/api/menus/parents/${_parentId}`, true);

  if (!resp.success || resp.data.length === 0) {
    return;
  }

  let submenu = [];

  resp.data.forEach(async (_menu) => {
    const _submenuItems = await renderSubMenu(_menu.id);

    if (!_submenuItems || _submenuItems.length == 0) {
      submenu.push({
        key: String(_menu.id),
        data: _menu.name,
        label: _menu.name,
        template: (
          <Link to={_menu.href || "/"} className="p-menuitem-link">
            {_menu.name}
          </Link>
        ),
      });
    } else {
      submenu.push({
        key: String(_menu.id),
        data: _menu.name,
        label: _menu.name,
        items: _submenuItems, // this field is used when rendering the top navbar
        children: _submenuItems, // this field is used when rendering the tree view
      });
    }
  });

  return submenu;
}

/**
 *
 *
 * Processing menu into wanted formats with dynamic mappings.
 *
 * @param {*} menuItems
 * @param {*} parentPath
 * @param {*} isRoot
 * @param {*} href
 * @param {*} menus
 * @param {*} routes
 * @param {*} test
 * @returns
 */
const processMenuWithDymamicRegister = (
  menuItems,
  parentPath = "",
  isRoot = true,
  href = "",
  menus = [],
  routes = [],
  test = []
) => {
  menuItems.forEach((item) => {
    // if menu do not have a child
    // or have hidden child --> in case of user management form and main page.
    if (!item.children.length) {
      // TODO: create an icon field for the icons
      // TODO: change menu "children" field to "name" field.
      menus.push(
        <MenuSimple
          key={item.id}
          href={item.href}
          children={item.name}
          icon="pi pi-users" // TODO: this field is to be updated.
        />
      );

      //TODO: feed the breadcrumb element here
      routes.push(
        <Route
          key={item.id}
          path={item.pathname} // TODO: this href is supposed to non processed href i.e. "pathname" field in excel instead.
          element={<RequireAuth>{ROUTES[item.code]}</RequireAuth>}
        />
      );

      test.push("no child: " + item.pathname);
    } else {
      // perform recursion on children menu items
      const { navMenu, appRoutes } = processMenu(
        item.children,
        item.pathname,
        false
      );

      // TODO: if breadcrumb link is not generated at the front-end --> we can
      // store the breadcrumb link to each individual menu item and display that instead.

      menus.push(
        <MenuDropdown
          key={item.id}
          icon="pi pi-list"
          className="flex-1"
          menu={item.name}
          padding="0"
          isRoot={isRoot}
          width="w-full"
        >
          {navMenu}
        </MenuDropdown>
      );

      //TODO: feed the breadcrumb element here
      routes.push(
        <Route
          key={item.id}
          path={item.pathname}
          element={<RequireAuth>{ROUTES[item.code]}</RequireAuth>}
        >
          {appRoutes}
        </Route>
      );
    }

    test.push("have children: " + item.pathname);
    console.log(parentPath, "/", item.pathname);
  });

  console.log("test: ", test);
  // put into redux store.
  return {
    navMenu: menus,
    appRoutes: routes,
  };
};
