<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { getNotifications } from '~~/js/notificationRequests'

    const userStore = useUserStore()
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
        <div class="my-10">
            <Notification
                v-if="notifications?.length > 0"
                v-for="notification in notifications"
                :notification="notification" />
            <div v-else class="text-center text-xl p-6">
                You have not received any notifications.
            </div>
        </div>

    </NuxtLayout>
</template>