import { getReceivedFollowRequests, getSentFollowRequests, getFriends, getFollowers, getFollowing } from "~~/js/followRequests"
import { useUserStore } from "./UserStore"
import { defineStore } from "pinia"
const userStore = useUserStore()

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
                const response = await getFriends(userStore.getLocalStorageUsername())
                this.friends = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getReceivedFollowRequests() {
            try {
                const response = await getReceivedFollowRequests(userStore.getLocalStorageUsername())
                this.receivedFollowRequests = response.data
            }
            catch (error) {
                console.log(error)
            }
        },
        
        async getSentFollowRequests() {
            try {
                const response = await getSentFollowRequests(userStore.getLocalStorageUsername())
                this.sentFollowRequests = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowing() {
            try {
                const response = await getFollowing(userStore.getLocalStorageUsername())
                this.following = response.data
            }
            catch (error) {
                console.log(error)
            }
        },

        async getFollowers() {
            try {
                const response = await getFollowers(userStore.getLocalStorageUsername())
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