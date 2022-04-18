import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "../modules/authentication/services/AuthenticationReducer";
import drinkReducer from "../modules/drink/services/DrinkReducer";

const rootReducer = combineReducers({
    authReducer,
    drinkReducer
})

let store = createStore(rootReducer, applyMiddleware(thunk))
export default store;