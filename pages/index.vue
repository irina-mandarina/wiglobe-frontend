<script setup>
    import { useJourneyStore } from '~~/stores/JourneyStore'
    import { useUserStore } from '~~/stores/UserStore'

    const userStore = useUserStore()
    const journeyStore = useJourneyStore()
    let journeys = computed(() => journeyStore.journeys)
    onBeforeMount(async () => {
        // await userStore.init()
        journeyStore.getJourneyRecommendations()
        // journeys.value = journeyStore.journeys
    })
</script>

<template>
    <NuxtLayout name="default">
        <JourneyAdder />
        <Journey v-for="journey in journeys" :journey="journey" class="my-10" />
    </NuxtLayout>
</template>