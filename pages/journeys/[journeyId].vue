<script setup>
    import { getJourney } from '~~/js/journeyRequests'
    import { useRoute } from 'vue-router'

    let journey = ref(null)
    onBeforeMount(async () => {
        journey.value = await getJourney(localStorage.getItem('user'), useRoute().params.journeyId)
    })
</script>

<template>
    <NuxtLayout name="default">
        <Journey :journey="journey" />        
    </NuxtLayout>
</template>