<script setup>
    import { getDestinationRecommendations } from '~~/js/destinationRequests'
    let destinationRecommendations = ref(null)
    let firstDisplayedDestIndex = ref(0)
    let destinationsOnDisplayCount = 3
    let pageSize = 5
    let pageNumber = 1

    onBeforeMount(async () => {
        await getDestinations()
    })

    async function getDestinations() {
        try {
            console.log("pageNumber = "+pageNumber)
            const response = await getDestinationRecommendations(pageNumber, pageSize)
            destinationRecommendations.value = response.data
            console.log(destinationRecommendations.value)
        }
        catch (error) {
            console.log(error)
        }
    }

    let destinationsOnDisplay = computed(async () => {
        console.log(destinationRecommendations.value?.size)
        if (destinationRecommendations.value?.size - 1 <= firstDisplayedDestIndex.value + destinationsOnDisplayCount) {
            pageNumber++
            console.log("!!!!!!pageNumber = "+pageNumber)
            await getDestinations()
        }
        return destinationRecommendations.value?.slice(firstDisplayedDestIndex.value, firstDisplayedDestIndex.value + destinationsOnDisplayCount)
    })

    function previousDestination() {
        if (firstDisplayedDestIndex.value !== 0) {
            firstDisplayedDestIndex.value--
        }
    }
</script>

<template>
    <NuxtLayout name="default">
        <!-- container -->
        <div class="w-full relative">
            <!-- carousel -->
            <p class="font-heebo font-bold text-3xl p-6">
                We think you'd like
            </p>
            <div class="flex justify-evenly w-full">
                <i @click="previousDestination()" class="fa fa-chevron-left bg-gray-200 w-10 py-6 px-2"/>

                <Destination v-for="destination in destinationRecommendations" :destination="destination" class="w-1/3 rounded-md m-4" />

                <i @click="firstDisplayedDestIndex++" class="fa fa-chevron-right bg-gray-200 w-10 py-6 px-2"/>
            </div>
        </div>

        <!-- container -->
        <div class="w-full relative">
            <!-- carousel -->
            <p class="font-heebo font-bold text-3xl p-6">
                We think you'd like
            </p>
            <div class="flex justify-evenly w-full">
                <i @click="previousDestination()" class="fa fa-chevron-left bg-gray-200 w-10 py-6 px-2"/>

                <Destination v-for="destination in destinationsOnDisplay" :destination="destination" class="w-1/3 rounded-md m-4" />

                <i @click="firstDisplayedDestIndex++" class="fa fa-chevron-right bg-gray-200 w-10 py-6 px-2"/>
            </div>
        </div>
    </NuxtLayout>
</template>