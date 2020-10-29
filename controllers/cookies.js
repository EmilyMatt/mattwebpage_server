module.exports = {
    getCookie(cookie, param) {
        if (!cookie || cookie.indexOf(param) == -1)
            return false

        return cookie.split("; ").filter( element => {
            return element.split("=").indexOf(param) != -1
        })[0].split("=")[1]
    }
}