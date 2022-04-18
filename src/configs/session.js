import SecureLS from "secure-ls"
import { LOCALSTORAGE } from "./constant"

class Session {

    constructor() {
        this.instance = null
        this.ls = new SecureLS()
    }

    /**
     * 
     * @param {String} accessToken 
     * @param {*} user 
     */
    create(accessToken, { email, username, id }) {
        this.ls.set(LOCALSTORAGE.ACCESS_TOKEN, accessToken)
        this.ls.set(LOCALSTORAGE.USER, {
            email,
            username,
            id
        })
    }

    delete() {
        this.ls.remove(LOCALSTORAGE.ACCESS_TOKEN)
        this.ls.remove(LOCALSTORAGE.USER)
    }

    /**
     * 
     * @returns {String}
     */
    getAccessToken() {
        return this.ls.get(LOCALSTORAGE.ACCESS_TOKEN)
    }

    /**
     * 
     * @returns 
     */
    getUser() {
        return this.ls.get(LOCALSTORAGE.USER)
    }

    /**
     * 
     * @returns {Boolean}
     */
    isLoggedIn() {
        const accessToken = this.getAccessToken()
        if (accessToken)
            return true

        return false
    }

    /**
     * 
     * @returns {Session}
     */
    static getInstance() {
        if (!this.instance)
            this.instance = new Session()

        return this.instance
    }
}

const session = Session.getInstance()
export default session

