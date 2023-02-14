<script setup>
import { getDestination } from '~~/js/destinationRequests';
import { getJourneysByDestination } from '~~/js/journeyRequests';
    const route = useRoute()
    let journeys = ref(null)
    let destination = ref(null)
    onBeforeMount(async () => {
        try {
            const response = await getJourneysByDestination(route.path.split('/')[2])
            journeys.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        try {
            const response = await getDestination(route.path.split('/')[2])
            destination.value = response.data
        }
        catch(error) {
            console.log(error)
        }
    })
</script>

<template>
    <NuxtLayout name="default">
        <Destination :destination="destination" />
        <div class="text-center text-3xl font-droid font-bold my-10">
            Journeys to {{ destination.name }}
        </div>
        <Journey v-for="journey in journeys" :journey="journey" class="my-10" />
    </NuxtLayout>
</template>