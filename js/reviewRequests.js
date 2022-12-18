import axios from 'axios'

export async function getReviewsForDestination(username, destinationId) {
    const response = await axios.get("http://localhost:8080/destinations/" + destinationId + "/reviews",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function reviewDestination(username, destinationId, review) {
    const response = await axios.post("http://localhost:8080/destinations/" + destinationId + "/reviews",
        review,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function editReview(username, destinationId, review) {
    const response = await axios.put("http://localhost:8080/destinations/" + destinationId + "/reviews/" + review.id,
        review,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function deleteReview(username, destinationId, reviewId) {
    const response = await axios.delete("http://localhost:8080/destinations/" + destinationId + "/reviews/" + reviewId,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

// get single review maybe??