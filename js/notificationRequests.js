import axios from 'axios'
import { getTokenFromLocalStorage } from './localStorageUtil'

export async function getNotifications() {
    const response = await axios.get("http://localhost:8080/notifications",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}