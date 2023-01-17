import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

export async function createJourney(journeyRequest) {
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/journeys",
        journeyRequest,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function deleteJourney(journeyId) {
    const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}


export async function editJourney(journey) {
    const userStore = useUserStore()
    const response = await axios.put("http://localhost:8080/journeys/" + journey.id,
        journey,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getJourney(journeyId) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getJourneyRecommendations() {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/journeys",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getJourneysByUser(username) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/" + username + "/journeys",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getJourneyDrafts(username) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/" + username + "/journeys/drafts",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}