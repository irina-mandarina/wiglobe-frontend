<script setup>
    const props = defineProps({
        destination: Object
    })
</script>

<template>
    <div @click="navigateTo('/destinations/' + destination.id)" class="rounded-2xl border w-5/6 mx-auto">
        <div class="text-center font-heebo p-2 font-medium">
            <i class="fa fa-map-pin px-2" />
            {{ destination.name }}, {{ destination.country.countryName }}
        </div>
    </div>
</template>