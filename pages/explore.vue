<script setup>
    import { getDestinationRecommendations } from '~~/js/destinationRequests'
    let destinationRecommendations = ref([])
    let firstDisplayedDestIndex = ref(0)
    let destinationsOnDisplayCount = 3
    let pageSize = 5
    let pageNumber = 1
    let searchStr = ref(null)

    onBeforeMount(async () => {
        await getDestinations()
    })

    async function getDestinations() {
        try {
            console.log("pageNumber = "+pageNumber)
            const response = await getDestinationRecommendations(pageNumber, pageSize)
            destinationRecommendations.value = [...destinationRecommendations.value, ...response.data]
            console.log(destinationRecommendations.value)
        }
        catch (error) {
            console.log(error)
        }
    }

    let destinationsOnDisplay = computed(() => {
        if (destinationRecommendations.value?.length - 1 <= firstDisplayedDestIndex.value + destinationsOnDisplayCount) {
            pageNumber++
            console.log("!!!!!!pageNumber = "+pageNumber)
            getDestinations()
        }
        console.log(destinationRecommendations.value?.slice(firstDisplayedDestIndex.value, firstDisplayedDestIndex.value + destinationsOnDisplayCount))
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
        <SearchBar />

        <!-- container -->
        <div v-if="destinationRecommendations?.length > 0" class="w-full flex flex-col h-1/2 relative">
            <p class="font-heebo font-bold text-3xl p-6">
                We think you'd like
            </p>
            <!-- carousel -->
            <div v-if="destinationsOnDisplay !== undefined" class="flex h-full justify-between w-full">
                <div
                    class="bg-gray-900/[.2] rounded-r-lg flex h-full w-[3%] px-2 cursor-pointer">
                  <i @click="previousDestination()"
                     class="fa fa-chevron-left my-auto font-bold text-white"/>
                </div>

                <Destination :destination="destinationsOnDisplay[0]" class="w-1/4 rounded-md" />
                <Destination :destination="destinationsOnDisplay[1]" class="w-1/3 rounded-md" />
                <Destination :destination="destinationsOnDisplay[2]" class="w-1/4 rounded-md" />

              <div
              class="bg-gray-900/[.2] rounded-l-lg flex h-full w-[3%] px-2 cursor-pointer">
                <i @click="firstDisplayedDestIndex++"
                class="fa fa-chevron-right my-auto font-bold text-white"/>
              </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<style scoped>
    .bg-peach:hover{
        background-color: var(--fawn);
    }
</style>