import { DRINK_ACTION } from "../../../configs/constant"

const initialState = {
    datatable: {},
    action: ""
}

const drinkReducer = (state = initialState, action) => {
    switch (action.type) {
        case DRINK_ACTION.DRINK_DATATABLE_SUCCESS:
            return {
                ...state,
                datatable: action.payload,
                action: action.type
            }
        default:
            return state
    }
}

export default drinkReducer