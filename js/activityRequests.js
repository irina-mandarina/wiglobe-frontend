import axios from 'axios'

export async function addActivityToJourney(username, journeyId, activity) {
    const response = await axios.post("http://localhost:8080/journeys/" + journeyId + "/activities",
        activity,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function getActivitiesForJourney(username, journeyId) {
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId + "/activities",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function editActivityForJourney(username, journeyId, activity) {
    const response = await axios.put("http://localhost:8080/journeys/" + journeyId + "/activities/" + activity.id,
        activity,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function deleteActivityFromJourney(username, journeyId, activityId) {
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId + "/activities/" + activityId,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}