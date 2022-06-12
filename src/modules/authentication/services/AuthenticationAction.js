import { AUTHENTICATION_ACTION } from "../../../configs/constant"
import session from "../../../configs/session"
import { post } from "../../../helpers/ApiHelper"

/**
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns 
 */
export function authSignin(username, password, onSuccess, onError) {
    return async (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.AUTHENTICATION_PROCESSING, payload: true })

        try {
            const { data: resp } = await post("/api/org-auth/signIn", {
                username,
                password
            })

            if (resp.success) {
                const { username, email, id, token, message } = resp.data
                const user = {
                    username,
                    email,
                    id
                }

                /** save to state */
                await dispatch({
                    type: AUTHENTICATION_ACTION.AUTHENTICATION_SIGNIN_SUCCESS,
                    payload: user
                })

                /** save access token */
                session.create(token, user)

                /** callback success */
                onSuccess(resp)
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

export function authSignup(username, email, password, onSuccess, onError) {
    return async (dispatch) => {
        dispatch({ type: AUTHENTICATION_ACTION.AUTHENTICATION_PROCESSING, payload: true })

        try {
            const { data: resp } = await post("/api/auth/signup", {
                username,
                password,
                email
            })

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

/**
 * 
 * @param {Function} onSuccess 
 * @returns 
 */
export function authSignout(onSuccess) {
    return async (dispatch) => {
        await dispatch({ type: AUTHENTICATION_ACTION.AUTHENTICATION_SIGNOUT })

        /** delete access token from session  */
        session.delete()
        onSuccess()
    }
}