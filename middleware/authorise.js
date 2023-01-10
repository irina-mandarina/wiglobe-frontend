import { useUserStore } from "~~/stores/UserStore"
export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    if (userStore.user === null) {
        if (userStore.loggedUsername === null) {
            return navigateTo('/login')
        }
        // this must get changed when security is implemented!
        else userStore.getUserDetails()
        // return navigateTo('/login')
    }
})