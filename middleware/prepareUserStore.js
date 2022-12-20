import { useUserStore } from "~~/stores/UserStore"

export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore()
    if (userStore.user === null) {
        return navigateTo('/login')
    }
    return true
})