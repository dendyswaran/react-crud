import { GENERIC_ACTION } from "../configs/constant"

const initialState = {
    isLoading: false
}

const genReducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERIC_ACTION.GEN_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}

export default genReducer