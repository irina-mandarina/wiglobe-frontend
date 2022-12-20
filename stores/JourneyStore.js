import { useUserStore } from "~/stores/UserStore"
import { defineStore } from "pinia"
import { getJourneyRecommendations } from "~~/js/journeyRequests"

export const useJourneyStore = defineStore('journeyStore', {
  state: () => {
    return {
        journeys: null
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
    }
  }
})