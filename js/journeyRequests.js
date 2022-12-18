import axios from 'axios'

export async function createJourney(username, journey) {
    const response = await axios.post("http://localhost:8080/journeys",
        journey,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function deleteJourney(username, journeyId) {
    const response = await axios.delete("http://localhost:8080/journeys/" + journeyId,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}


export async function editJourney(username, journey) {
    const response = await axios.put("http://localhost:8080/journeys/" + journey.id,
        journey,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function getJourney(username, journeyId) {
    const response = await axios.get("http://localhost:8080/journeys/" + journeyId,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function getJourneyRecommendations(username) {
    const response = await axios.get("http://localhost:8080/journeys",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}
