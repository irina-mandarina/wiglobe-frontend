<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    
    const UserStore = useUserStore()
    const followStore = useFollowStore()
    onBeforeMount(async () => {
        if (followStore.receivedFollowRequests === null) {
            followStore.getReceivedFollowRequests()
        }
    })
</script>

<template>
    <NuxtLayout name="default">
        <div class="mx-auto flex flex-wrap justify-evenly">
            <FollowRequest v-for="req in followStore.receivedFollowRequests" :follow-request="req"/>
        </div>
    </NuxtLayout>
</template>