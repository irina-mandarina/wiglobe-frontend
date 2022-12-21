import axios from 'axios'
import { useUserStore } from '~~/stores/UserStore'

// export async function getDestinations(username) {
//     const response = await axios.get("http://localhost:8080/destinations",
//         {
//             headers: {
//                 'Content-Type': 'application/json',
//                 username: userStore.loggedUsername
//             }
//         }
//     )
//     return response
// }
// not yet impl
export async function getDestination() {
    const userStore = useUserStore()
    const response = await axios.get("http://localhost:8080/destinations",
        {
            headers: {
                'Content-Type': 'application/json',
                username: userStore.loggedUsername
            }
        }
    )
    return response
}