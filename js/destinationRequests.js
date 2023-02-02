import axios from 'axios'
import { getTokenFromLocalStorage } from './localStorageUtil'

export async function searchDestinations(search) {
    const response = await axios.get("http://localhost:8080/destinations",
        {
            params: {
                search
            },
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function getDestination(id) {
    const response = await axios.get("http://localhost:8080/destinations/" + id,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}