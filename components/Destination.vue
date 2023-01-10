<script setup>
    defineProps({
        destination: Object
    })
</script>

<template>
    <div class="shadow-xl overflow-hidden bg-white">
        <!-- Destination Header -->
        <div class="w-full text-center">
            <div class="text-center w-full">
                <h1 class="font-bold font-heebo tracking-wider w-full py-8 text-xl text-white bg-img text-drop-shadow">
                    {{ destination.name }}
                </h1>
            </div>
        </div>
        <!-- Destination info -->
        <div class="w-full text-green-900 p-6 text-center relative">
            <div class="mx-auto w-full font-droid">
                <span>* * * * *</span>
                <p v-if="destination.averageRating >= 0 && destination.reviewCount >= 0">
                    Average rating: {{ destination.averageRating }} ({{ destination.reviewCount }} reviews)
                </p>
                <p>7049 visits</p>
            </div>
            <div class="flex w-full justify-evenly my-4">
                <span>Category: {{ destination.featureClass }}</span>
                <span>Class: {{ destination.featureCode }}</span>
                <span class="flex">Location: {{ destination.country.countryName }}, {{ destination.country.continent }} <img class="w-16 px-2" :src="'https://flagcdn.com/20x15/' + destination.country.countryCode.toLowerCase() + '.png'" /></span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .text-drop-shadow {
        text-shadow: 0 0 20px black;
    }

    .box-drop-shadow {
        filter: drop-shadow(0 0 5px rgb(0, 31, 16))
    }

    .bg-img {
        background-image: url('https://picsum.photos/1000/300');
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>