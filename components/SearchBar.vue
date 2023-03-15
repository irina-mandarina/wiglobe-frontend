<script setup>
    import { searchDestinations } from '~~/js/destinationRequests';
    import { searchJourneys } from '~~/js/journeyRequests'
    import { searchUsers } from '~~/js/userRequests'


    let keyword = ref(null)
    let results = ref({destinations: null, users: null, journeys: null})
    let displayedEntities = ref(null)
    let waiting = ref(false)
    let usersPage = ref(1)
    let destinationsPage = ref(1)
    let journeysPage = ref(1)
    const pageSize = 5

    watch(keyword, () => {
        if (!keyword.value) {
            results.value = null
            displayedEntities.value = null
        }
    })

    async function search() {
        waiting.value = true
        try {
            const response = await searchForDestinations(1)
            results.value.destinations = response.data
        }
        catch (error) {
            console.log(error)
        }
        try {
            const response = await searchForUsers(1)
            results.value.users = response.data
        }
        catch (error) {
            console.log(error)
        }
        try {
            const response = await searchForJourneys(1)
            results.value.journeys = response.data
        }
        catch (error) {
            console.log(error)
        }

        if (results.value?.users?.length > 0) {
            displayedEntities.value = "users"
        }
        else if (results.value?.destinations?.length > 0) {
            displayedEntities.value = "destinations"
        }
        else if (results.value?.journeys?.length > 0) {
            displayedEntities.value = "journeys"
        }

        console.log(results.value)
        waiting.value = false
    }

    async function searchForUsers(pageNumber) {
        try {
            usersPage.value = pageNumber
            const response = await searchUsers(keyword.value, pageNumber, pageSize)
            results.value.users = response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function searchForDestinations(pageNumber) {
        try {
            const response = await searchDestinations(keyword.value, pageNumber, pageSize)

            if (response.data?.length > 0) {
                results.value.destinations = response.data
                destinationsPage.value = pageNumber
            }
            console.log(results.value)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function searchForJourneys(pageNumber) {
        try {
            destinationsPage.value = pageNumber
            const response = await searchJourneys(keyword.value, pageNumber, pageSize)
            results.value.journeys = response.data
        }
        catch (error) {
            console.log(error)
        }
    }

</script>

<template>
    <!-- search bar -->
    <div class="w-1/2 mx-auto flex my-10">
        <input type="search" v-model="keyword" @keyup.enter="search()" 
        class="w-11/12 mr-3 border-b-2 border-slate-700 rounded-lg borde-slate-300 p-3 bg-transparent focus:outline-none focus:border-slate-700" 
        placeholder="Search for anything"/>
        <button @click="search()" class="w-1/12 p-2 bg-peach duration-100 rounded-full">
            <i class="fa-solid fa-magnifying-glass" />
        </button>
    </div>
    <!-- nav -->
    <div v-if="results?.destinations?.length > 0 || results?.users?.length > 0 || results?.journeys?.length > 0" class="relative flex text-center w-2/3 mx-auto">
        <div @click="displayedEntities = 'users'" class="w-1/3 p-2 mb-4 border-slate-600" :class="{
            'border-b': displayedEntities === 'users'
        }">
            Users
        </div>
        <div @click="displayedEntities = 'destinations'" class="w-1/3 p-2 mb-4 border-slate-600" :class="{
            'border-b': displayedEntities === 'destinations'
        }">
            Destinations
        </div>
        <div @click="displayedEntities = 'journeys'" class="w-1/3 p-2 mb-4 border-slate-600" :class="{
            'border-b': displayedEntities === 'journeys'
        }">
            Journeys
        </div>
    </div>
    <!-- results -->
    <div v-if="waiting" class="w-11/12 mx-auto bg-slate-100 p-2 rounded-sm">
        Searching for "{{ keyword }}" ...
    </div>

    <div v-else-if="displayedEntities === 'users'" class="w-11/12 mx-auto bg-slate-100 p-2 rounded-sm">
        <div v-if="results.users?.length > 0">
            <NuxtLink v-for="user in results.users" :to="'/profile/' + user.username" class="rounded-sm shadow-sm my-1 bg-white flex p-2">
                <span class="pl-4 pr-10">
                    @{{ user.username }}
                </span>
                <span class="pr-2">
                    {{ user.firstName }} {{ user.lastName }}
                </span>
            </NuxtLink>
            <Paginator :page-number="usersPage" :page-size="pageSize" @prev-page="searchForUsers" @next-page="searchForUsers" 
            class="p-2"/>
        </div>
        <div v-else>
            There are not any users matching your search.
        </div>
    </div>
    
    <div v-else-if="displayedEntities === 'destinations'" class="w-11/12 mx-auto bg-slate-100 p-2 rounded-sm h-max">
        <div v-if="results.destinations?.length > 0">
            <NuxtLink v-for="destination in results.destinations" :to="'/destinations/' + destination.destinationId" class="rounded-sm shadow-sm my-1 bg-white p-2 w-full flex">
                <span class="pl-4 pr-1">
                    {{ destination.name }},
                </span>
                <span class="pr-2">
                    {{ destination.country }}
                </span>
                <span class="pl-2 pr-1 float-right align-middle font-droid text-sm font-oblique truncate">
                    {{ destination.featureCode }}
                </span>
            </NuxtLink>
            <Paginator :page-number="destinationsPage" :page-size="pageSize" @prev-page="searchForDestinations" @next-page="searchForDestinations" 
            class="p-2"/>
        </div>
            
        <div v-else>
            There are not any destinations matching your search.
        </div>
    </div>
    
    <div v-else-if="displayedEntities === 'journeys'" class="w-11/12 mx-auto bg-slate-100 p-2 rounded-sm">
        <div v-if="results.journeys?.length > 0">
            <NuxtLink v-for="journey in results.journeys" :to="'/journeys/' + journey.id" class="rounded-sm shadow-sm my-1 bg-white">
                <span class="pl-4 pr-1">
                    @{{ journey.user.username }},
                </span>
                <span class="pr-2">
                    At {{ journey.destination?.name }}, {{ journey.destination?.country?.countryName }}
                </span>
                <span class="pl-2 pr-1 float-right align-middle font-droid text-sm font-oblique truncate">
                    on {{ journey.postedOn }}
                </span>
            </NuxtLink>
            <Paginator  :page-number="journeysPage" :page-size="pageSize" @prev-page="searchForJourneys" @next-page="searchForJourneys" 
            class="p-2"/>
        </div>
        
        <div v-else>
            There are not any journeys matching your search.
        </div>
    </div>
</template>
