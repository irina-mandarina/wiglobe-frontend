import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

export async function addActivityToJourney(username, journeyId, activity) {
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/journeys/" + journeyId + "/activities",
        activity,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getActivitiesForJourney(username, journeyId) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/activities",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function editActivityForJourney(username, journeyId, activity) {
    const userStore = useUserStore()
    const response = await axios.put("http://localhost:8080/journeys/" + journeyId + "/activities/" + activity.id,
        activity,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function deleteActivityFromJourney(username, journeyId, activityId) {
    const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId + "/activities/" + activityId,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.getLocalStorageUsername()
            }
        }
    )
    return response
}

export async function getAllActivityTypes() {
    const response = await axios.get("http://localhost:8080/activities",
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    )
    return response
}