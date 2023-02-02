import axios from 'axios'
import { getTokenFromLocalStorage, getLocalStorageUsername } from '~~/js/localStorageUtil'

export async function sendFollowRequest(recieverUsername) {
    const response = await axios.post("http://localhost:8080/users/" + recieverUsername + "/follow-requests",
        null,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function deleteFollowRequest(recieverUsername) {
    const response = await axios.delete("http://localhost:8080/users/" + recieverUsername + "/follow-requests",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function respondToFollowRequest(requesterUsername, approve) {
    const response = await axios.delete("http://localhost:8080/users/" + getLocalStorageUsername() + "/follow-requests/" + requesterUsername,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            },
            params: {
                response: approve
            }
        }
    )
    return response
}

export async function unfollow(recieverUsername) {
    const response = await axios.delete("http://localhost:8080/users/" + getLocalStorageUsername() + "/followers/" + recieverUsername,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function getReceivedFollowRequests() {
    const response = await axios.get("http://localhost:8080/users/" + getLocalStorageUsername() + "/follow-requests/received",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function getSentFollowRequests() {
    const response = await axios.get("http://localhost:8080/users/" + getLocalStorageUsername() + "/follow-requests/sent",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function getFollowers(username) {
    const response = await axios.get("http://localhost:8080/users/" + username + "/followers",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function getFollowing(username) {
    const response = await axios.get("http://localhost:8080/users/" + username + "/following",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function getFriends(username) {
    const response = await axios.get("http://localhost:8080/users/" + username + "/friends",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}
