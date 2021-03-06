import { del, get, post, put } from "../helpers/ApiHelper"

export function genGetDataById(url, onSuccess) {
    return async (dispatch) => {
        try {
            const { data: resp } = await get(url, true)

            if (resp.success) {
                onSuccess(resp.data)
            }

        } catch (e) { }
    }
}

/**
 * A generic method to fetch datatables from API
 * 
 * @param {String} url 
 * @param {*} data
 * @param {String} successState When success, the data will be send to the reducer 
 * @returns 
 */
export function genFetchDatatable(url, { tableParams, dtSearch }, successState) {
    return async (dispatch) => {
        try {
            const { data: resp } = await post(url, {
                page: tableParams?.page,
                length: tableParams?.length,
                dtSearch
            }, true)

            if (resp.success) {
                dispatch({
                    type: successState,
                    payload: resp.data
                })
            }

        } catch (e) { }
    }
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {Function} onSuccess 
 * @returns 
 */
export function genCreateData(url, data, onSuccess) {
    return async (dispatch) => {
        try {
            const { data: resp } = await post(url, data, true)
            if (resp.success) {
                onSuccess(resp.data)
            }

        } catch (e) { }
    }
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {Function} onSuccess 
 * @returns 
 */
export function genUpdateData(url, data, onSuccess) {
    return async (dispatch) => {
        try {
            const { data: resp } = await put(url, data, true)
            if (resp.success) {
                onSuccess(resp.data)
            }

        } catch (e) { }
    }
}

/**
 * 
 * @param {String} url 
 * @param {Array} ids 
 * @param {Function} onSuccess 
 * @returns 
 */
export function genBulkDeleteData(url, ids, onSuccess) {
    return async (dispatch) => {
        try {
            const { data: resp } = await post(url, { ids }, true)
            if (resp.success) {
                onSuccess(resp.data)
            }
        } catch (e) {
            console.log(e)
        }
    }
}