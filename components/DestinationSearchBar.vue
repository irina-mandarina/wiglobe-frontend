<script setup>
    import { searchDestinations, getDestination } from '~~/js/destinationRequests'

    let destinationKeyword = ref(null)
    let destinationSearchResults = ref(null)
    let chosenDestination = ref(null)
    const emits = defineEmits(['chooseDestination'])

    async function findDestinations() {
        try {
            const response = await searchDestinations(destinationKeyword.value)
            destinationSearchResults.value = response.data
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

</script>
<template>
    <div>
        <span v-if="chosenDestination === null || chosenDestination === undefined">
            <input v-model="destinationKeyword"
            class="mx-auto px-4 border-b-2 border-dark-blue p-2 rounded-full focus:outline-none"
            placeholder="Destination"
            type="search"
            @keypress.enter="findDestinations()"/>    
            <DestinationSearchResult class="absolute z-50" v-if="destinationSearchResults !== null"
                @close-search-results="{destinationSearchResults = null; destinationKeyword = null}"
                @choose-destination="chooseDestination"
                :destination-search-results="destinationSearchResults" />
        </span>
        
        <span v-else>
            <DestinationMini :destination="chosenDestination" />
        </span>    
    </div>
    
</template>