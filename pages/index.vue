<script setup>
    import { useJourneyStore } from '~~/stores/JourneyStore'
    definePageMeta ({
        middleware: 'authorise'
    })

    const journeyStore = useJourneyStore()
    let journeys = computed(() => journeyStore.journeys)
    onBeforeMount(() => {
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