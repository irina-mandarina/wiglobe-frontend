<script setup>
    import { useJourneyStore } from '~~/stores/JourneyStore'
    
    const journeyStore = useJourneyStore()
    let journeys = computed(() => journeyStore.journeyRecommendations)

    onBeforeMount(async () => {
        journeyStore.getJourneyRecommendations()
    })
</script>

<template>
    <NuxtLayout name="default">
        <JourneyAdder />
        <Journey v-for="journey in journeys" :journey="journey" class="my-10" />
    </NuxtLayout>
</template>