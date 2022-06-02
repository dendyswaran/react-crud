export const AUTHENTICATION_ACTION = {
    AUTHENTICATION_PROCESSING: "AUTHENTICATION_PROCESSING",
    AUTHENTICATION_SIGNIN_SUCCESS: "AUTHENTICATION_SIGNIN_SUCCESS",
    AUTHENTICATION_SIGNIN_FAILED: "AUTHENTICATION_SIGNIN_FAILED",
    AUTHENTICATION_SIGNIN_RESET: "AUTHENTICATION_SIGNIN_RESET",
    AUTHENTICATION_SIGNOUT: "AUTHENTICATION_SIGNOUT"
}

export const ACCOUNT_ACTION = {

}

export const DRINK_ACTION = {
    DRINK_PROCESSING: "DRINK_PROCESSING",
    DRINK_DATATABLE_SUCCESS: "DRINK_DATATABLE_SUCCESS",
    DRINK_SAVE_SUCCESS: "DRINK_SAVE_SUCCESS",
    DRINK_SAVE_FAILED: "DRINK_SAVE_FAILED"
}

export const MENU_ACTION = {
    MENU_LIST_SUCCESS: "MENU_LIST_SUCCESS",
    MENU_NAVIGATION_SUCCESS: "MENU_NAVIGATION_SUCCESS",
    MENU_NAVIGATION_ERROR: "MENU_NAVIGATION_ERROR"
}

export const GENERIC_ACTION = {
    GEN_IS_LOADING: "GEN_IS_LOADING",
    GEN_IS_SUCCESS: "GEN_IS_SUCCESS",
    GEN_IS_FAILED: "GEN_IS_FAILED"
}

export const LOCALSTORAGE = {
    ACCESS_TOKEN: "LOCAL_STORAGE_ACCESS_TOKEN",
    USER: "LOCAL_STORAGE_USER",
    MENU: "LOCAL_STORAGE_MENU"
}

export const FORM_OP = {
    EDIT: "edit",
    CREATE: "create"
}

export const E_MENU_CLICKEVENT = [
    { label: 'Open new tab', value: 'OPEN_NEW_TAB' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Do nothing', value: 'DO_NOTHING' }
];

export const CONTENT_TYPES =
    { APPLICATION_JSON: "application/json" }

export const FILE_UPLOAD_ACTION = {
    FILE_UPLOAD_PROCESSING: "FILE_UPLOAD_PROCESSING",
    FILE_UPLOAD_DATATABLE_SUCCESS: "FILE_UPLOAD_DATATABLE_SUCCESS",
    FILE_UPLOAD_SAVE_SUCCESS: "FILE_UPLOAD_SAVE_SUCCESS",
    FILE_UPLOAD_SAVE_FAILED: "FILE_UPLOAD_SAVE_FAILED"
}