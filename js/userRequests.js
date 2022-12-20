import axios from 'axios'

export async function signup(user) {
    const response = await axios.post("http://localhost:8080/users/signup",
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response
}

export async function login(user) {
    const response = await axios.post("http://localhost:8080/users/login",
        user,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    return response
}

export async function logout() {
    const response = await axios.post("http://localhost:8080/users/logout",
        {
            headers: {
                'Content-Type': 'application/json',
                username: localStorage.getItem('username')
            }
        }
    )
    return response
}

export async function getUserDetails(other) {
    const response = await axios.get("http://localhost:8080/users/" + other,
        {
            headers: {
                'Content-Type': 'application/json',
                username: localStorage.getItem('username')
            }
        }
    )
    return response
}

export async function deleteAccount() {
    const response = await axios.delete("http://localhost:8080/users/" + localStorage.getItem('username'), // fix this in the backend later
        {
            headers: {
                'Content-Type': 'application/json',
                username: localStorage.getItem('username')
            }
        }
    )
    return response
}

export async function editBio(bio) {
    const response = await axios.put("http://localhost:8080/users/" + localStorage.getItem('username') + "/bio", // fix this in the backend later
        bio,
        {
            headers: {
                'Content-Type': 'application/json',
                username: localStorage.getItem('username')
            }
        }
    )
    return response
}