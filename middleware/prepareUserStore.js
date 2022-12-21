import { useUserStore } from "~~/stores/UserStore"

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    if (userStore.user === null) {
        if (localStorage.getItem('username') === null) {
            return navigateTo('/login')
        }
        // this must get changed when security is implemented!
        return navigateTo('/login')
    }
    return true
})