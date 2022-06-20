// import { AUTHENTICATION_ACTION } from "../../../configs/constant";
import { TASKLIST_DETAIL, TASKLIST } from "../../../configs/constant";

const initialState = {
  id: null,
  tasklistIsLoading: false,
  isLoading: true,
  tasklists: [],
  tasklist: {},
  details: [],
};

const tasklistReducer = (state = initialState, action) => {
  switch (action.type) {
    case TASKLIST.TASKLIST_SUCCESS:
      return {
        ...state,
        tasklistIsLoading: false,
        tasklists: action.tasklists,
      };
    case TASKLIST_DETAIL.TASKLIST_DETAIL_LOADING:
      return {
        // id: state.id,
        ...state,
        isLoading: true,
        // data: action.payload,
      };
    case TASKLIST_DETAIL.TASKLIST_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        tasklist: action.tasklist,
        details: action.details,
      };
    case TASKLIST_DETAIL.TASKLIST_DETAIL_FAILED:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default tasklistReducer;
