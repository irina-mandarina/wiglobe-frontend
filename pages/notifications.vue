<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { getNotifications } from '~~/js/notificationRequests'

    const userStore = useUserStore()
    const username = computed(userStore.username)
    let notifications = ref(null)

    onBeforeMount(async () => {
        await userStore.init()
        try {
            const response = await getNotifications()
            notifications.value = response.data
        }
        catch(error) {
            console.log(error)
        }
    })
</script>

<template>
    <NuxtLayout name="default">
        <Notification v-for="notification in notifications" :notification="notification" />
    </NuxtLayout>
</template>