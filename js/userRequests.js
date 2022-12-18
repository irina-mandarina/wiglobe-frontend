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

export async function logout(username) {
    const response = await axios.post("http://localhost:8080/users/logout",
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function getUserDetails(username, other) {
    const response = await axios.get("http://localhost:8080/users/" + other,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function deleteAccount(username) {
    const response = await axios.delete("http://localhost:8080/users/" + username, // fix this in the backend later
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}

export async function editBio(username, bio) {
    const response = await axios.put("http://localhost:8080/users/" + username + "/bio", // fix this in the backend later
        bio,
        {
            headers: {
                'Content-Type': 'application/json',
                username
            }
        }
    )
    return response
}