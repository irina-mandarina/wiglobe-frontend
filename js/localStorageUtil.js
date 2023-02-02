export function getLocalStorageUsername() {
    if (typeof window !== 'undefined') {
        if ( localStorage.getItem('username') !== null && localStorage.getItem('username') !== undefined && localStorage.getItem('username').length > 0) {
            return localStorage.getItem('username')
        }
    }
    return null
}

export function getTokenFromLocalStorage() {
    if (typeof window !== 'undefined') {
        if ( localStorage.getItem('jwt') !== null && localStorage.getItem('jwt') !== undefined && localStorage.getItem('jwt').length > 0) {
            return localStorage.getItem('jwt')
        }
    }
    return null
}

export function cleanLocalStorage() {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt')
        localStorage.removeItem('username')
    }
    return null
}
// clean ls