export function getLocalStorageUsername() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('username')
    }
}
// clean ls