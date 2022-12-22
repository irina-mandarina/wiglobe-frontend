<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'
import { respondToFollowRequest } from '~~/js/followRequests';
    
    const UserStore = useUserStore()
    const followStore = useFollowStore()
    onBeforeMount(async () => {
        if (followStore.receivedFollowRequests === null) {
            followStore.getReceivedFollowRequests()
        }
    })

    async function respondWith(requester, isApproved) {
        try {
            const response = await respondToFollowRequest(requester, isApproved)
            console.log(response.data)
            followStore.getReceivedFollowRequests()
        }
        catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <NuxtLayout name="default">
        <div class="mx-auto flex flex-wrap justify-evenly">
            <FollowRequest v-for="req in followStore.receivedFollowRequests" :follow-request="req" @respond-to-follow-request-with="respondWith"/>
        </div>
    </NuxtLayout>
</template>