import { get } from "../../../helpers/ApiHelper";
import { GENERIC_ACTION } from "../../../configs/constant";

const getTeamList = (onSuccess, onError) => {
    return async (dispatch) => {
        dispatch({ type: GENERIC_ACTION.GEN_IS_LOADING, payload: true })
        try {
            const {data: resp} = await get('api/org-team/list', true);
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


export {getTeamList};
