import axios from 'axios'

export async function getDestinations(username) {
    const response = await axios.get("http://localhost:8080/destinations",
        {
            headers: {
                'Content-Type': 'application/json',
                username: localStorage.getItem('username')
            }
        }
    )
    return response
}
// not yet impl
export async function getDestination() {
    const response = await axios.get("http://localhost:8080/destinations",
        {
            headers: {
                'Content-Type': 'application/json',
                username: localStorage.getItem('username')
            }
        }
    )
    return response
}