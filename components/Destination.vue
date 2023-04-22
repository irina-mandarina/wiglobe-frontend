<script setup>
    defineProps({
        destination: Object
    })
</script>

<template>
    <div v-if="destination"
    class="shadow-xl h-full flex flex-col overflow-hidden bg-white">
        <!-- Destination Header -->
        <NuxtLink :to="'/destinations/' + destination?.id"
        class="w-full text-center h-1/2 cursor-pointer">
            <div class="text-center w-full h-full bg-img flex"
                :style="{ 'background-image': 'url(https://flagcdn.com/w640/' + destination?.country?.countryCode?.toLowerCase() + '.png)' }">
                <h1 class="font-bold font-heebo tracking-wider w-full my-auto max-h-full text-3xl text-white text-stroke">
                    {{ destination.name }}
                </h1>
            </div>
        </NuxtLink>
        <!-- Destination info -->
        <div class="w-full text-green-900 p-2 text-center relative overflow-hidden h-1/2">
            <div class="mx-auto w-full font-droid">
                <span v-if="destination.reviewCount > 0"
                class="relative">
                    <i class="fa fa-star text-fawn"
                    v-for="star in (destination.averageRating - destination.averageRating % 1)"/>
                    <i class="fa fa-star"
                    v-for="star in 5 - (destination.averageRating - destination.averageRating % 1)"/>
                </span>
                <p v-if="destination.reviewCount > 0">
                    Average rating: {{ destination.averageRating }} ({{ destination.reviewCount }} reviews)
                </p>
                <NuxtLink :to="'/destinations/' + destination?.id + '/journeys'">
                    {{ destination.visitCount }} visits
                </NuxtLink>
            </div>
            <div class="flex w-full justify-evenly p-2">
                <span>Category: {{ destination.featureClass }}</span>
                <span>Class: {{ destination.featureCode }}</span>
                <span class="flex h-min">
                    Location: {{ destination.country.countryName }}, {{ destination.country.continent }}
                </span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .text-stroke {
        color: white;
        text-shadow:
            -1px -1px 0 #000,  
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
    }

    .box-drop-shadow {
        filter: drop-shadow(0 0 5px rgb(0, 31, 16))
    }

    .bg-img {
        background-size: 100%;
        backdrop-filter: blur(100px);
        background-repeat: no-repeat;
        background-position: center;
    }
</style>