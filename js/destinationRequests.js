import axios from 'axios'
import { getTokenFromLocalStorage } from './localStorageUtil'

export async function searchDestinations(search) {
    const response = await axios.get("http://localhost:8080/destinations/search",
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

export async function getDestinationRecommendations(pageNumber, pageSize) {
    const response = await axios.get("http://localhost:8080/destinations",
        {
            params: {
                pageNumber, 
                pageSize
            },
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}