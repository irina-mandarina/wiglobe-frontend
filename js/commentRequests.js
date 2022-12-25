import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

export async function getCommentsForJourney(journeyId) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/comments",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

export async function commentJourney(journeyId, comment) {
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/journeys/" + journeyId + "/comments",
        comment,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

export async function editComment(journeyId, comment) {
    const userStore = useUserStore()
    const response = await axios.put("http://localhost:8080/journeys/" + journeyId + "/comments",
        comment,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

export async function deleteComment(journeyId, commentId) {
    const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId + "/comments/" + commentId,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

export async function getComments(journeyId, commentId) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/comments/" + commentId, // fix later in the backend
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}