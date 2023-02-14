import { getLocalStorageUsername } from "~~/js/localStorageUtil"
import { useUserStore } from "~~/stores/UserStore"

export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.path === '/login' && getLocalStorageUsername() !== null) {
        if (useUserStore().username === null) {
            await useUserStore().init()
            console.log(useUserStore().username)
        }
        if (useUserStore().username !== null) {
            console.log("found")
            return navigateTo('/')
        }
    }
  })
  