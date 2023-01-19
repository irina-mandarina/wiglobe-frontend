<script setup>
    import { getJourneyDrafts } from '~~/js/journeyRequests'
    import { useUserStore } from '~~/stores/UserStore'
    
    const userStore = useUserStore()
    let journeys = ref(null)
    
    onBeforeMount(async () => {
        await userStore.init()
        try{
            journeys.value = (await getJourneyDrafts()).data
        }
        catch (error) {
            console.log(error)
        }
    })
</script>

<template>
    <NuxtLayout name="default">
        <div v-if="journeys !== undefined && journeys !== null && journeys.length !== 0">
            <div class="text-center my-20 font-bold text-3xl text-droid">
                Your drafts
            </div>
            <Journey v-for="journey in journeys" :journey="journey" class="my-10" />
        </div>
        <div v-else class="text-center my-40 font-bold text-3xl text-droid">
            You do not have any drafts.
        </div>
    </NuxtLayout>
</template>