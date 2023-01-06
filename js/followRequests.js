import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

export async function sendFollowRequest(recieverUsername) {
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/users/" + recieverUsername + "/follow-requests",
        null,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
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
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function respondToFollowRequest(requesterUsername, approve) {
    const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/users/" + userStore.getLocalStorageUsername() + "/follow-requests/" + requesterUsername,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            },
            params: {
                response: approve
            }
        }
    )
    return response
}

export async function unfollow(recieverUsername) {
    const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/users/" + userStore.getLocalStorageUsername() + "/followers/" + recieverUsername,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getReceivedFollowRequests() {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/users/" + userStore.getLocalStorageUsername() + "/follow-requests/received",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getSentFollowRequests() {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/users/" + userStore.getLocalStorageUsername() + "/follow-requests/sent",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getFollowers(username) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/users/" + username + "/followers",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getFollowing(username) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/users/" + username + "/following",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getFriends(username) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/users/" + username + "/friends",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}
