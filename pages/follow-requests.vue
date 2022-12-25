<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { respondToFollowRequest } from '~~/js/followRequests'
    
    const UserStore = useUserStore()
    const followStore = useFollowStore()
    let requestTypeSent = ref(false)
    
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
        </div>
        <div v-if="requestTypeSent" class="mx-auto flex flex-wrap justify-evenly">
            <FollowRequest v-for="req in followStore.receivedFollowRequests" :follow-request="req" @respond-to-follow-request-with="respondWith"/>
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