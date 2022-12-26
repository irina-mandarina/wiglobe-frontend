import { getReceivedFollowRequests, getSentFollowRequests, getFriends, getFollowers, getFollowing } from "~~/js/followRequests"
import { defineStore } from "pinia"

export const useFollowStore = defineStore('followStore', {
    state: () => {
        return {
            friends: null,
            followers: null,
            following: null,
            receivedFollowRequests: null,
            sentFollowRequests: null
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
        },
        
        async getSentFollowRequests() {
            try {
                const response = await getSentFollowRequests()
                this.sentFollowRequests = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowing() {
            try {
                const response = await getFollowing()
                this.following = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowers() {
            try {
                const response = await getFollowers()
                this.followers = response.data
            }
            catch (error) {
                console.log(error)
            }
        },
    }      
    
})