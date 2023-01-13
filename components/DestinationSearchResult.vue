<script setup>
    defineProps({
        destinationSearchResults: Array
    })
</script>
<template>
    <div class="absolute my-2">
        <div class="absolute fixed px-2 text-rose-500 hover:text-red-700 duration-300 z-[51]" @click="$emit('closeSearchResults')">
                X
        </div>
        <ul class="relative max-h-44 max-w-[100%] overflow-y-scroll rounded-md bg-white border border-gray-300 z-50">
            <li v-if="destinationSearchResults === null || destinationSearchResults.length === 0" class="py-2 px-6 text-md">
                Destination was not found.
            </li>
            <li v-if="destinationSearchResults !== null && destinationSearchResults.length > 0"
                v-for="destination in destinationSearchResults"
                @click="$emit('chooseDestination', destination.destinationId)"
                class="p-2 text-md border-b border-gray-400">
                <span class="pl-4 pr-1 w-max">
                    {{ destination.name }},
                </span>
                <span class="pr-2">
                    {{ destination.country }}
                </span>
                <span class="pl-2 pr-1 float-right align-middle font-droid text-sm font-oblique truncate max-w-[20%]">
                    {{ destination.featureCode }}
                </span>
            </li>
        </ul>
    </div>
</template>