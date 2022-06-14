import { MANAGE_USER_ACTION } from "../configs/ManageUser.constant";
import { put, get } from "../../../helpers/ApiHelper";
import { genFetchDatatable } from "../../../commons/GenericAction";

const manageUserDatatable = () => {
    return async (dispatch) => {

    }
}

const editUser = (user, onSuccess, onError) => {
    return async (dispatch) => {
        dispatch({ type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: true })

        try {
            const { data: resp } = await put('api/org-user/edit/' + user.id, user, true)
            if (resp.success) {
                onSuccess(resp.data);
            }
        } catch (e) {
            onError(e);
        } finally {
            dispatch({ type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: false });
        }
    };
}

const fetchUserDatatable = (tableParams, filters, onSuccess, onError) => {
    return async (dispatch) => {
        dispatch({ type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: true });
        try {
            const { data: resp } = await genFetchDatatable(
                "/api/manage-user/datatable/users",
                {
                    tableParams,
                    dtSearch: filters ? filters : null
                },
                MANAGE_USER_ACTION.MANAGE_USER_SUCCESS);
            if (resp.success) {
                onSuccess(resp.data);
            }
        } catch (e) {
            onError(e);
        } finally {
            dispatch({ type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: false })
        }
    };
}

const getUserList = (onSuccess, onError) => {
    return async (dispatch) => {
        dispatch({ type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: true });
        try {
            const { data: resp } = await get("/api/org-user/user-list", true);
            if (resp.success) {
                onSuccess(resp.data);
            }
        } catch (e) {
            onError(e);
        } finally {
            dispatch({ type: MANAGE_USER_ACTION.MANAGE_USER_PROCESSING, payload: false })
        }
    };
}

export { manageUserDatatable, editUser, fetchUserDatatable, getUserList };