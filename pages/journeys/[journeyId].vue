<script setup>
    import { getJourney } from '~~/js/journeyRequests'
    import { useRoute } from 'vue-router'
    import { useUserStore } from '~~/stores/UserStore'
    const userStore = useUserStore()

    let journey = ref(null)
    onBeforeMount(async () => {
        journey.value = await getJourney(userStore.loggedUsername, useRoute().params.journeyId)
    })
</script>

<template>
    <NuxtLayout name="default">
        <Journey :journey="journey" />        
    </NuxtLayout>
</template>