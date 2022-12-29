<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { deleteFollowRequest, respondToFollowRequest } from '~~/js/followRequests'
    
    const userStore = useUserStore()
    const followStore = useFollowStore()
    let requestTypeSent = ref(false)
    
    onBeforeMount(async () => {
        if (followStore.receivedFollowRequests === null) {
            followStore.getReceivedFollowRequests()
        }
        
        if (followStore.sentFollowRequests === null) {
            followStore.getSentFollowRequests()
        }
    })

    async function respondWith(requester, isApproved) {
        try {
            const response = await respondToFollowRequest(requester, isApproved)
            // console.log(response.data)
            followStore.getReceivedFollowRequests()
        }
        catch (error) {
            console.log(error)
        }
    }

    async function cancel(receiver) {
        try {
            const response = await deleteFollowRequest(receiver)
            followStore.getSentFollowRequests()
        }
        catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <NuxtLayout name="default">

        <nav>
            <ul class="flex w-full">
                <li @click="requestTypeSent = !requestTypeSent" class="text-center px-8 text-lg py-2 duration-300 border-b" :class="{
                    'active': !requestTypeSent
                }">
                    Recieved
                </li>
                <li @click="requestTypeSent = !requestTypeSent" class="text-center px-8 text-lg py-2 duration-300 border-b" :class="{
                    'active': requestTypeSent
                }">
                    Sent
                </li>
            </ul>
        </nav>
        
        <div v-if="!requestTypeSent" class="mx-auto flex flex-wrap justify-evenly">
            <FollowRequest v-for="req in followStore.receivedFollowRequests" :follow-request="req" @respond-to-follow-request-with="respondWith"/>
            <div v-if="followStore.receivedFollowRequests === null || followStore.receivedFollowRequests.length === 0" class="p-20">
                You haven't received any follow requests.
            </div>
        </div>
        <div v-if="requestTypeSent" class="mx-auto flex flex-wrap justify-evenly">
            <SentFollowRequest v-for="req in followStore.sentFollowRequests" :follow-request="req" @cancel-follow-request="cancel"/>
            <div v-if="followStore.sentFollowRequests === null || followStore.sentFollowRequests.length === 0" class="p-20">
                You haven't sent any follow requests which haven't been approved yet.
            </div>
        </div>
        
    </NuxtLayout>
</template>

<style scoped>
    .active {
        color: var(--khaki);
        font-weight: bold;
        border-color: var(--brown);
    }
</style>