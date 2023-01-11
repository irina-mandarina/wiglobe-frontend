import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

export async function searchDestinations(search) {
    const response = await axios.get("http://localhost:8080/destinations",
        {
            params: {
                search
            },
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response
}

export async function getDestination(id) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/destinations/" + id,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}