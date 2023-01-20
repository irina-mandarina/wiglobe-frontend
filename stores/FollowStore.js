import { getReceivedFollowRequests, getSentFollowRequests, getFriends, getFollowers, getFollowing } from "~~/js/followRequests"
import { getLocalStorageUsername } from "~~/js/localStorageUtil"
import { defineStore } from "pinia"

export const useFollowStore = defineStore('followStore', {
    state: () => {
        return {
            friends: [],
            followers: [],
            following: [],
            receivedFollowRequests: [],
            sentFollowRequests: []
        }
    },

    actions: {
        async getFriends() {
            try {
                const response = await getFriends(getLocalStorageUsername())
                this.friends = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getReceivedFollowRequests() {
            try {
                const response = await getReceivedFollowRequests(getLocalStorageUsername())
                this.receivedFollowRequests = response.data
            }
            catch (error) {
                console.log(error)
            }
        },
        
        async getSentFollowRequests() {
            try {
                const response = await getSentFollowRequests(getLocalStorageUsername())
                this.sentFollowRequests = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowing() {
            try {
                const response = await getFollowing(getLocalStorageUsername())
                this.following = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowers() {
            try {
                const response = await getFollowers(getLocalStorageUsername())
                this.followers = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        init() {
            this.getFriends()
            this.getFollowers()
            this.getFollowing()
            this.getSentFollowRequests()
            this.getReceivedFollowRequests()
        }
    }      
    
})