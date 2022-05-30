import {MANAGE_USER_ACTION} from "../configs/ManageUser.constant";

const initialState = {
    datatable: {},
    action: ""
}

const manageUserReducer = (state = initialState, action) => {
    switch(action.type) {
        case MANAGE_USER_ACTION.MANAGE_USER_SUCCESS:
            return {
                ...state,
                datatable: action.payload,
                action: action.type
            }
        default:
            return state;
    }
}
export default manageUserReducer;

