import axios from 'axios'
import { getLocalStorageUsername } from './localStorageUtil'

export async function getReviewsForDestination(destinationId) {
    const response = await axios.get("http://localhost:8080/destinations/" + destinationId + "/reviews",
        {
            headers: {
                'Content-Type': 'application/json',
                username: loggedUsername
            }
        }
    )
    return response
}

export async function reviewDestination(destinationId, review) {
    const response = await axios.post("http://localhost:8080/destinations/" + destinationId + "/reviews",
        review,
        {
            headers: {
                'Content-Type': 'application/json',
                username: loggedUsername
            }
        }
    )
    return response
}

export async function editReview(destinationId, review) {
    const response = await axios.put("http://localhost:8080/destinations/" + destinationId + "/reviews/" + review.id,
        review,
        {
            headers: {
                'Content-Type': 'application/json',
                username: loggedUsername
            }
        }
    )
    return response
}

export async function deleteReview(destinationId, reviewId) {
    const response = await axios.delete("http://localhost:8080/destinations/" + destinationId + "/reviews/" + reviewId,
        {
            headers: {
                'Content-Type': 'application/json',
                username: loggedUsername
            }
        }
    )
    return response
}

// get single review maybe??