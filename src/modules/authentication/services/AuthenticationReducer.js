import { AUTHENTICATION_ACTION } from "../../../configs/constant"

const initialState = {
    action: "",
    user: undefined,
    isLoading: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATION_ACTION.AUTHENTICATION_PROCESSING:
            return {
                ...state,
                isLoading: action.payload
            }
        case AUTHENTICATION_ACTION.AUTHENTICATION_SIGNIN_SUCCESS:            
            return {
                ...state,
                isLoading: false,
                user: action.payload,
                action: action.type
            }
        case AUTHENTICATION_ACTION.AUTHENTICATION_SIGNIN_FAILED:
            return {
                ...state,
                isLoading: false,
                action: action.type
            }
        case AUTHENTICATION_ACTION.AUTHENTICATION_SIGNIN_RESET:
           return {
               ...state,
               isLoading: false,
               action: ""
           }
        default:
            return state
    }
}

export default authReducer