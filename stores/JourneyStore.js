import { useUserStore } from "~/stores/UserStore"
import { defineStore } from "pinia"
import { getJourneyRecommendations, getJourneysByUser, createJourney } from "~~/js/journeyRequests"

export const useJourneyStore = defineStore('journeyStore', {
  state: () => {
    return {
        journeys: null,
        loggedUserJourneys: null
    }
  },

  actions: {
    async getJourneyRecommendations() {
      const userStore = useUserStore()
      try {
          const response = await getJourneyRecommendations(userStore.user.username)
          this.journeys = response.data
      }
      catch (error) {
          console.log(error)
      }
    },

    async getJourneysByLogged() {
      const userStore = useUserStore()
      try {
          const response = await getJourneysByUser(userStore.user.username)
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
        this.getJourneysByLogged() // update own profile page
        return response.data
      }
      catch (error) {
        console.log(error)
      }
    }
  }
})