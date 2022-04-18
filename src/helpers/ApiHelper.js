import axios from "axios"

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
 export const get = (url) => {
    return new Promise((resolve, reject) => {
        axios.get(`${API_URL}${sanitizeUrl(url)}`, { headers })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error) )
    })
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {*} config 
 */
export const post = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.post(`${API_URL}${sanitizeUrl(url)}`, JSON.stringify(data), { headers })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error) )
    })
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {*} config 
 */
 export const put = (url, data = {}) => {
    return new Promise((resolve, reject) => {
        axios.put(`${API_URL}${sanitizeUrl(url)}`, JSON.stringify(data), { headers })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error) )
    })
}

/**
 * 
 * @param {String} url 
 * @param {*} data 
 * @param {*} config 
 */
 export const del = (url) => {
    return new Promise((resolve, reject) => {
        axios.delete(`${API_URL}${sanitizeUrl(url)}`, { headers })
            .then(_result => resolve(_result))
            .catch(_error => reject(_error) )
    })
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