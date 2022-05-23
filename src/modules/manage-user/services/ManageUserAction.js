import {MANAGE_USER_ACTION} from "../configs/ManageUser.constant";
import {put} from "../../../helpers/ApiHelper";

const manageUserDatatable = () => {
    return async (dispatch) => {
        /**
         * Code here for custom action for module
         */
    }
}

const editUser = (username, email, password, onSuccess, onError) => {
        return async(dispatch) => {
            dispatch({type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: true})

            try {
                const {data:resp} = await put('api/auth/', {
                    username,
                    email,
                    password,
                })
                if(resp.success) {
                    onSuccess(resp.data);
                }
            }catch (e) {
                onError(e);
            }finally {
                dispatch({type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: false});
            }
        };
}

export {manageUserDatatable, editUser};