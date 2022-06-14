import { AUTHENTICATION_ACTION } from "../../../configs/constant"
import session from "../../../configs/session"
import { post } from "../../../helpers/ApiHelper"

export function authSignup(user, onSuccess, onError) {
    return async (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.AUTHENTICATION_PROCESSING, payload: true })

        try {
            const { data: resp } = await post("/api/org-auth/signup", user)

            if (resp.success) {
                onSuccess(resp.data)
            } else {
                onError(resp)
            }
        } catch (e) {
            onError(e)
        } finally {
            dispatch({ type: AUTHENTICATION_ACTION.AUTHENTICATION_PROCESSING, payload: false })
        }
    }
}
