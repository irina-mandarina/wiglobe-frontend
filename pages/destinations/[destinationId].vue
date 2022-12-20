<script setup>
    import { getDestination } from '~~/js/destinationRequests'
    import { useRoute } from 'vue-router'

    let destination = ref(null)
    onBeforeMount(async () => {
        destination.value = await getDestination()
    })
</script>

<template>
    <NuxtLayout name="default">
        <Destination />
    </NuxtLayout>
</template>