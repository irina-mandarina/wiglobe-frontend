export function getLocalStorageUsername() {
    if (typeof window !== 'undefined') {
        if ( localStorage.getItem('username') !== null && localStorage.getItem('username') !== undefined && localStorage.getItem('username').length > 0) {
            return localStorage.getItem('username')
        }
    }
    return null
}
// clean ls