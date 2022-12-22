<script setup>
    import { useRoute } from 'vue-router'
    import { getDestination } from '~~/js/destinationRequests';

    const route = useRoute()
    let destination = ref(null)

    onBeforeMount(async() => {
        console.log(route.params)
        try {
            const response = await getDestination(route.params.destinationId) 
            destination.value = response.data
        }
        catch (error) {
            console.log(error)
        }
    })
</script>

<template>
    <NuxtLayout name="default">
        <Destination class="mx-auto w-5/6" :destination="destination" />
    </NuxtLayout>
</template>