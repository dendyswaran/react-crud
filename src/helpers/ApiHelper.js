import axios from "axios"
import session from "../configs/session"

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"
const headers = {
    'Content-Type': 'application/json'
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {*} config 
 */
export const get = (url, withToken = false) => {
    const headerConfig = buildHeader(withToken)

    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}${sanitizeUrl(url)}`, { headers: headerConfig })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error))
    })
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {Boolean} withToken 
 * @returns 
 */
export const post = (url, data = {}, withToken = false) => {    
    const headerConfig = buildHeader(withToken)

    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}${sanitizeUrl(url)}`, JSON.stringify(data), { headers: headerConfig })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error))
    })
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {*} config 
 */
export const put = (url, data = {}, withToken = false) => {
    const headerConfig = buildHeader(withToken)

    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}${sanitizeUrl(url)}`, JSON.stringify(data), { headers: headerConfig })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error))
    })
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {*} config 
 */
export const del = (url, withToken = false) => {
    const headerConfig = buildHeader(withToken)

    return new Promise((resolve, reject) => {
        axios.delete(`${API_URL}${sanitizeUrl(url)}`, { headers: headerConfig })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error))
    })
}

/**
 * 
 * @param {Boolean} withToken 
 * @returns 
 */
const buildHeader = (withToken = false) => {
    return withToken ? { ...headers, 'Authorization': `Bearer ${session.getAccessToken()}` } : headers
}

/**
 * 
 * @param {String} url 
 */
const sanitizeUrl = (url) => {
    if (!url.startsWith("/")) {
        return `/${url}`
    }

    return url
}