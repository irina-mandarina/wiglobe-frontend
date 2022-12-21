import { getReceivedFollowRequests } from "~~/js/followRequests"
import { defineStore } from "pinia"

export const useFollowStore = defineStore('followStore', {
    state: () => {
        return {
            friends: null,
            followers: null,
            following: null,
            receivedFollowRequests: null
        }
    },

    actions: {
        async getFriends() {
            try {
                const response = await getFriends()
                this.friends = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getReceivedFollowRequests() {
            try {
                const response = await getReceivedFollowRequests()
                this.receivedFollowRequests = response.data
            }
            catch (error) {
                console.log(error)
            }
        }
    }      
    
})