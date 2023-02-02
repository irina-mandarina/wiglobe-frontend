import axios from 'axios'
import { getTokenFromLocalStorage } from './localStorageUtil'

export async function addActivityToJourney(journeyId, activityReruest) {
    const response = await axios.post("http://localhost:8080/journeys/" + journeyId + "/activities",
        activityReruest,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function getActivitiesForJourney(journeyId) {
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/activities",
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function editActivityForJourney(journeyId, activity) {
    const response = await axios.put("http://localhost:8080/journeys/" + journeyId + "/activities/" + activity.id,
        activity,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function deleteActivityFromJourney(journeyId, activityId) {
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId + "/activities/" + activityId,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
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
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}