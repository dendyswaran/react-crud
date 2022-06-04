import {get} from '../../../helpers/ApiHelper';


const getUserList = (onSuccess, onError) => {
    return async(dispatch) => {
        try {
            const {data:resp} = await get('/user-list');
            if(resp.error) {
                onError(resp)
            }
            else{
                onSuccess(resp)
            }
        }catch(e) {
            onError(e)
        }
    }
}