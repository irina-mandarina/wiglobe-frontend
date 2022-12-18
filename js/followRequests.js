import axios from 'axios'
// fix this in the backend
export async function sendFollowRequest(username, recieverUsername) {
    const response = await axios.post("http://localhost:8080/users/" + recieverUsername + "/follow-requests",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function deleteFollowRequest(username, recieverUsername) {
    const response = await axios.delete("http://localhost:8080/users/" + recieverUsername + "/follow-requests",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function getFollowRequests(username, journeyId) {
    const response = await axios.get("http://localhost:8080/users/" + username + "/follow-requests",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function respondToFollowRequest(username, requesterUsername, approve) {
    const response = await axios.post("http://localhost:8080/users/" + username + "/follow-requests/" + requesterUsername,
        approve,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}
