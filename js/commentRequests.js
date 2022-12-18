import axios from 'axios'

export async function getCommentsForJourney(username, journeyId) {
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/comments",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function commentJourney(username, journeyId, comment) {
    const response = await axios.post("http://localhost:8080/journeys/" + journeyId + "/comments",
        comment,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function editComment(username, journeyId, comment) {
    const response = await axios.put("http://localhost:8080/journeys/" + journeyId + "/comments",
        comment,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function deleteComment(username, journeyId, commentId) {
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId + "/comments/" + commentId,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function getComments(username, journeyId, commentId) {
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/comments/" + commentId, // fix later in the backend
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}