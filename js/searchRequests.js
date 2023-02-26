import axios from 'axios'
import { getTokenFromLocalStorage } from '~~/js/localStorageUtil'

export async function searchAll(keyword) {
    const response = await axios.get("http://localhost:8080/search",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            },
            params: {
                keyword
            }
        }
    )
    return response
}