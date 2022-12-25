import { getReceivedFollowRequests, getFriends, getFollowers, getFollowing } from "~~/js/followRequests"
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
                console.log(this.friends)
            }
            catch (error) {
                console.log(error)
            }
        },

        async getReceivedFollowRequests() {
            try {
                const response = await getReceivedFollowRequests()
                this.receivedFollowRequests = response.data
                console.log(this.receivedFollowRequests)
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowing() {
            try {
                const response = await getFollowing()
                this.following = response.data
                console.log(this.following)
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowers() {
            try {
                const response = await getFollowers()
                this.followers = response.data
                console.log(this.followers)
            }
            catch (error) {
                console.log(error)
            }
        },
    }      
    
})