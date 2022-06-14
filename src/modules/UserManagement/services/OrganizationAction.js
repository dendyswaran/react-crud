import { get } from "../../../helpers/ApiHelper";
import { GENERIC_ACTION } from "../../../configs/constant";

const getOrganizationsList = (onSuccess, onError) => {
    return async (dispatch) => {
        dispatch({ type: GENERIC_ACTION.GEN_IS_LOADING, payload: true })
        try {
            const {data: resp} = await get('api/org/list', true);
            if(resp.success) {
                onSuccess(resp.data);
            }
        }catch(e) {
            onError(e);
        }finally {
            dispatch({ type: GENERIC_ACTION.GEN_IS_LOADING, payload: false })
        }
    };
}

const getOrganizationById = (id, onSuccess, onError) => {

}

export {getOrganizationsList, getOrganizationById};
