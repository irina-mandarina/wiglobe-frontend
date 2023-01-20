import { defineStore } from "pinia"
import { getLocalStorageUsername } from "~~/js/localStorageUtil"
import { getJourneyRecommendations, getJourneysByUser, createJourney } from "~~/js/journeyRequests"

export const useJourneyStore = defineStore('journeyStore', {
  state: () => {
    return {
        journeyRecommendations: null,
        loggedUserJourneys: null
    }
  },

  actions: {
    async getJourneyRecommendations() {
      try {
          const response = await getJourneyRecommendations(getLocalStorageUsername())
          this.journeyRecommendations = response.data
      }
      catch (error) {
          console.log(error)
      }
    },

    async getLoggedUserJourneys() {
      try {
          const response = await getJourneysByUser(getLocalStorageUsername())
          this.loggedUserJourneys = response.data
      }
      catch (error) {
          console.log(error)
      }
    },

    async postJourney(journeyRequest) {
      try {
        const response = await createJourney(journeyRequest)
        console.log(response.data)
        this.getLoggedUserJourneys() // update own profile page
        return response.data
      }
      catch (error) {
        console.log(error)
      }
    },

    // async init() {
    //   await getJourneyRecommendations()
    //   await this.getLoggedUserJourneys() 
    // }
  }
})