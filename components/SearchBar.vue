<script setup>
import { searchAll } from '~~/js/searchRequests';


    let keyword = ref(null)
    let results = ref(null)

    watch(keyword, () => {
        if (!keyword.value) {
            results.value = null
        }
    })

    let displayedEntities = ref(null)

    async function search() {
        try {
            const response = await searchAll(keyword.value)
            results.value = response.data
            console.log(results.value)
            if (results.value?.users) {
                displayedEntities.value = "users"
            }
            else if (results.value?.destinations) {
                displayedEntities.value = "destinations"
            }
            else if (results.value?.journeys) {
                displayedEntities.value = "journeys"
            }
        }
        catch (error) {
            console.log(error)
        }
    }

</script>

<template>
    <!-- search bar -->
    <div class="w-1/2 mx-auto flex my-10">
        <input type="search" v-model="keyword" @keyup.enter="search()" class="w-11/12 mr-3 border-b rounded-lg borde-slate-300 p-3 focus:outline-none focus:border-slate-700" placeholder="Search for anything"/>
        <button @click="search()" class="w-1/12 p-2 bg-peach duration-100 rounded-full">
            <i class="fa-solid fa-magnifying-glass" />
        </button>
    </div>
    <!-- nav -->
    <div v-if="results !== null" class="relative flex text-center w-2/3 mx-auto">
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
    <div v-if="displayedEntities === 'users'" class="w-11/12 mx-auto bg-slate-100 p-2 rounded-sm">
        <NuxtLink v-for="user in results.users" :to="'/profile/' + user.username" class="rounded-sm shadow-sm my-1 bg-white flex p-2">
            <span class="pl-4 pr-10">
                @{{ user.username }}
            </span>
            <span class="pr-2">
                {{ user.firstName }} {{ user.lastName }}
            </span>
        </NuxtLink>
    </div>
    
    <div v-if="displayedEntities === 'destinations'" class="w-11/12 mx-auto bg-slate-100 p-2 rounded-sm h-max">
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
    </div>
    
    <div v-if="displayedEntities === 'journeys'" class="w-11/12 mx-auto bg-slate-100 p-2 rounded-sm">
        <NuxtLink v-for="journey in results.journeys" :to="'/journeys/' + journey.id" class="rounded-sm shadow-sm my-1 bg-white">
            {{ journey }}
        </NuxtLink>
    </div>
</template>
