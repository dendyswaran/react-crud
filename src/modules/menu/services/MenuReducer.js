import { MENU_ACTION } from "../../../configs/constant";

const initialState = {
  menus: [],
  menu_navigation: [],
  click_event_map: [],
  message: undefined,
  isReady: false,
  action: "",
};

const menuReducer = (state = initialState, action) => {
  switch (action.type) {
    case MENU_ACTION.MENU_LIST_SUCCESS:
      return {
        ...state,
        menus: action.payload,
        isReady: false,
        action: action.type,
      };
    case MENU_ACTION.MENU_NAVIGATION_SUCCESS:
      return {
        ...state,
        menu_navigation: action.payload,
        click_event_map: action.eventMapping,
        isReady: true,
        action: action.type,
      };
    case MENU_ACTION.MENU_NAVIGATION_ERROR:
      return {
        ...state,
        message: action.payload,
        isReady: false,
        action: action.type,
      };
    default:
      return state;
  }
};

export default menuReducer;
