import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

export async function signup(user) {
    const userStore = useUserStore()
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
    const userStore = useUserStore()
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
    const userStore = useUserStore()
    const response = await axios.post("http://localhost:8080/users/logout",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}

export async function getUserDetails(other) {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/users/" + other,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}

export async function deleteAccount() {
const userStore = useUserStore()
    const response = await axios.delete("http://localhost:8080/users/" + userStore.username(), // fix this in the backend later
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}

export async function editBio(bio) {
const userStore = useUserStore()
    const response = await axios.put("http://localhost:8080/users/" + userStore.username() + "/bio", // fix this in the backend later
        bio,
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.username()
            }
        }
    )
    return response
}