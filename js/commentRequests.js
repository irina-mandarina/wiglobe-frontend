import axios from 'axios'
import { getLocalStorageUsername } from './localStorageUtil'

export async function getCommentsForJourney(journeyId) {
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/comments",
        {
            headers: {
                'Content-Type': 'application/json',
                username: getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function commentJourney(journeyId, comment) {
    const response = await axios.post("http://localhost:8080/journeys/" + journeyId + "/comments",
        comment,
        {
            headers: {
                'Content-Type': 'application/json',
                username: getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function editComment(journeyId, comment) {
    const response = await axios.put("http://localhost:8080/journeys/" + journeyId + "/comments",
        comment,
        {
            headers: {
                'Content-Type': 'application/json',
                username: getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function deleteComment(journeyId, commentId) {
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId + "/comments/" + commentId,
        {
            headers: {
                'Content-Type': 'application/json',
                username: getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getComments(journeyId, commentId) {
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/comments/" + commentId, // fix later in the backend
        {
            headers: {
                'Content-Type': 'application/json',
                username: getLocalStorageUsername()
            }
        }
    )
    return response
}