import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

export async function getReviewsForDestination(destinationId) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/destinations/" + destinationId + "/reviews",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

export async function reviewDestination(destinationId, review) {
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/destinations/" + destinationId + "/reviews",
        review,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

export async function editReview(destinationId, review) {
    const userStore = useUserStore()
    const response = await axios.put("http://localhost:8080/destinations/" + destinationId + "/reviews/" + review.id,
        review,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

export async function deleteReview(destinationId, reviewId) {
    const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/destinations/" + destinationId + "/reviews/" + reviewId,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}

// get single review maybe??