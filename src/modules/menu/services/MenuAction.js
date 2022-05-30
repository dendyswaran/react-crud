import { Link } from "react-router-dom"
import { MENU_ACTION } from "../../../configs/constant"
import session from "../../../configs/session"
import { get } from "../../../helpers/ApiHelper"

export function fetchMenuParents(useLocalStorage = false) {
    return async (dispatch) => {
        let menu;
        
        if (!useLocalStorage || !session.getMenu()) {
            const { data: resp } = await get(`/api/menus/parents`, true)
            if (resp.success) {
                menu = resp.data

                // save into local storage
                session.persistMenu(menu)
            }
        } else {
            menu = session.getMenu()        
        }

        await dispatch({ type: MENU_ACTION.MENU_LIST_SUCCESS, payload: menu })
        await dispatch(constructMenuNavigation(menu))
    }
}

/**
 * 
 * @param {Array} menus 
 */
export function constructMenuNavigation(menus) {
    return async (dispatch) => {
        const baseMenu = await renderBaseMenu(menus)
            .catch(_err => dispatch({ type: MENU_ACTION.MENU_NAVIGATION_ERROR, payload: _err.message }))

        dispatch({ type: MENU_ACTION.MENU_NAVIGATION_SUCCESS, payload: baseMenu })
    }

}

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
    let submenu = []
    menus.forEach(async (_menu, _idx) => {
        const _subMenuItems = await renderSubMenu(_menu.id)

        submenu.push({
            key: String(_menu.id),
            label: _menu.name,
            data: _menu.name,
            url: _menu.href,
            items: _subMenuItems,
            children: _subMenuItems
        })
    })

    return [
        {
            key: "1-manage",
            label: 'Manage',
            data: "Manage",
            icon: 'pi pi-fw pi-box',
            items: submenu,   // this field is used when rendering the top navbar
            children: submenu // this field is used when rendering the tree view
        },
        {
            key: "2-settings",
            label: 'Settings',
            data: "Settings",
            icon: 'pi pi-fw pi-cog',
            items: [
                {
                    label: 'Menu',
                    template: <Link to={"/settings/menu"} className="p-menuitem-link">Menu</Link>
                },
                {
                    label: 'Manage User',
                    template: <Link to={"/manage-user/user-list"} className="p-menuitem-link">Manage User</Link>
                }
            ]
        }
    ]
}

/**
 * A helper function to render the sub menus (only if exists)
 * 
 * @param {Number} _parentId 
 * @returns 
 */
async function renderSubMenu(_parentId) {
    const { data: resp } = await get(`/api/menus/parents/${_parentId}`, true)

    if (!resp.success || resp.data.length === 0) {
        return
    }

    let submenu = []

    resp.data.forEach(async (_menu) => {
        const _submenuItems = await renderSubMenu(_menu.id)

        if (!_submenuItems || _submenuItems.length == 0) {
            submenu.push({
                key: String(_menu.id),
                data: _menu.name,
                label: _menu.name,
                template: <Link to={_menu.href || "/"} className="p-menuitem-link">{_menu.name}</Link>
            })
        } else {
            submenu.push({
                key: String(_menu.id),
                data: _menu.name,
                label: _menu.name,
                items: _submenuItems,   // this field is used when rendering the top navbar
                children: _submenuItems // this field is used when rendering the tree view
            })
        }

    })

    return submenu

}