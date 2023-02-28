import axios from 'axios'
import { getTokenFromLocalStorage } from './localStorageUtil'

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

export async function getUserDetails(other) {
    const response = await axios.get("http://localhost:8080/users/" + other,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function deleteAccount() {
    const response = await axios.delete("http://localhost:8080/users/" + getLocalStorageUsername(),
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function editBio(bio) {
    debugger
    const response = await axios.put("http://localhost:8080/users/" + getLocalStorageUsername() + "/bio",
        bio,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    // const res = await axios({
    //     method: 'put',
    //     url: "http://localhost:8080/users/" + getLocalStorageUsername() + "/bio",
    //     data: {
    //         bio
    //     },
        
    //     headers: {
    //             'Content-Type': 'application/json',
    //             'Authentication': 'Bearer ' + getTokenFromLocalStorage()
    //         }
        
    // })
    console.log(response)
    return response
}

export async function editGender(gender) {
    const response = await axios.put("http://localhost:8080/users/" + getLocalStorageUsername() + "/gender",
        gender,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function editResidence(destinationId) {
    const response = await axios.put("http://localhost:8080/users/" + getLocalStorageUsername() + "/residence",
        destinationId,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function editBirthdate(birthdate) {
    const response = await axios.put("http://localhost:8080/users/" + getLocalStorageUsername() + "/birthdate",
        birthdate,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}

export async function authenticateWithGoogle(token, googlePayload) {
    const response = await axios.post("http://localhost:8080/users/login/google",
        googlePayload,
        {
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + token
            }
        }
    )
    return response
}

export async function searchUsers(keyword, pageNumber, pageSize) {
    const response = await axios.get("http://localhost:8080/users/search",
        {
            params: {
                keyword, pageNumber, pageSize
            },
            headers: {
                'Content-Type': 'application/json',
                'Authentication': 'Bearer ' + getTokenFromLocalStorage()
            }
        }
    )
    return response
}