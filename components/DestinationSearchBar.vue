<script setup>
    import { searchDestinations, getDestination } from '~~/js/destinationRequests'

    let destinationKeyword = ref(null)
    let destinationSearchResults = ref(null)
    let chosenDestination = ref(null)
    const emits = defineEmits(['chooseDestination'])
    const pageSize = 10000000
    let pageNumber = ref(1)

    async function findDestinations() {
        try {
            const response = await searchDestinations(destinationKeyword.value, pageNumber.value, pageSize)
            if (response.data?.length > 0) {
                // there aren't any results on the page requested
                destinationSearchResults.value = response.data
                if (pageNumber.value !== 1) {
                    // if the page is turned and there are not any results, stay on prev page
                    pageNumber.value --
                }
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    async function chooseDestination(destinationId) {
        try {
            chosenDestination.value = (await getDestination(destinationId)).data
            emits('chooseDestination', chosenDestination.value)
        }
        catch (error) {
            console.log(error)
        }
        
    }

    async function nextPage() {
        pageNumber.value ++
        await findDestinations()
    }

    async function prevPage() {
        if (pageNumber.value > 1) {
            pageNumber.value --
            await findDestinations()
        }
    }

</script>
<template>
    <div class="z-50">
        <span v-if="chosenDestination === null || chosenDestination === undefined">
            <input v-model="destinationKeyword"
            class="mx-auto px-4 border-b-2 border-dark-blue p-2 rounded-full focus:outline-none"
            placeholder="Destination"
            type="search"
            @keypress.enter="findDestinations()"/>    
            <DestinationSearchResult class="absolute z-50" v-if="destinationSearchResults !== null"
                @close-search-results="{destinationSearchResults = null; destinationKeyword = null}"
                @choose-destination="chooseDestination"
                :destination-search-results="destinationSearchResults" 
                @next-page="nextPage" prev-page="prevPage" />
        </span>
        
        <span v-else>
            <DestinationMini :destination="chosenDestination" />
        </span>    
    </div>
    
</template>