import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

// fix this in the backend
export async function sendFollowRequest(recieverUsername) {
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/users/" + recieverUsername + "/follow-requests",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}

export async function deleteFollowRequest(recieverUsername) {
    const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/users/" + recieverUsername + "/follow-requests",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}

export async function getReceivedFollowRequests() {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/users/" + userStore.username() + "/follow-requests",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}

export async function respondToFollowRequest(requesterUsername, approve) {
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/users/" + userStore.username() + "/follow-requests/" + requesterUsername,
        approve,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}
