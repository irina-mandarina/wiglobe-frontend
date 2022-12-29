<script setup>
    import { respondToFollowRequest } from '~~/js/followRequests'

    let approveText = ref(false)
    let declineText = ref(false)
    let disappear = ref(false)
    let timeIntervalString = ref("")


    const props = defineProps ({
        followRequest: Object
    })

    onBeforeMount(() => {
        let hours = parseInt(( new Date().getTime() - new Date(props.followRequest.requestDate).getTime()) / (1000*60*60))
        if (hours >= 24) {
            timeIntervalString.value = "on " + new Date(props.followRequest.requestDate)
        }
        else {
            timeIntervalString.value = hours + " hours ago"
        }
    })
    const emit = defineEmits(['respondToFollowRequestWith'])

    function respondToFollowRequestWith(username, isApproved) {
        emit('respondToFollowRequestWith', username, isApproved)
        disappear.value = true
    }
</script>

<template>
    <Transition>
        <div v-if="followRequest !== null && followRequest !== undefined" class="rounded-full m-10 mt-32 shadow-lg w-1/4 overflow-hidden">
            <div class="mx-auto mt-0 m-4 px-4 py-20 profile-picture">
            </div>
            <div class="mx-auto text-center">
                <NuxtLink :to="'profile/' + followRequest.requester.username" class="p-2 pt-4">
                    {{ followRequest.requester.firstName }} {{ followRequest.requester.lastName }}
                </NuxtLink>
                <p class="p-2 pb-4">
                    sent you a friend request {{ timeIntervalString }}
                </p>
            </div>
            <div class="w-fit mx-auto flex pb-10">
                <div @mouseenter="approveText = true" @mouseleave="approveText = false" @click="respondToFollowRequestWith(followRequest.requester.username, true)"
                    class="rounded-full bg-asparagus m-4 p-2 w-20 overflow-hidden flex block text-clip approve">
                    <p :class="{
                        'show': approveText
                        }"
                    class="relative approve-text text-clip whitespace-nowrap">
                        <i class="fa fa-check py-2 hover:scale-110 duration-300 approve-icon"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        approve
                    </p>
                </div>

                <div @mouseenter="declineText = true" @mouseleave="declineText = false" @click="respondToFollowRequestWith(followRequest.requester.username, false)"
                    class="rounded-full bg-red-600 m-4 p-2 w-20 hover:bg-red-700 overflow-hidden flex block text-clip decline">
                    <p :class="{
                        'show': declineText
                        }"
                    class="relative decline-text text-clip whitespace-nowrap">
                        <i class="fa fa-times py-2 hover:scale-110 duration-300 decline-icon"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        decline
                    </p>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    .bg-asparagus:hover {
        background-color: var(--khaki);
    }

    .profile-picture {
        background-image: url("https://picsum.photos/500");
    }

    .approve:hover,
    .decline:hover {
        /* transform: scaleX(1.3); */
        transition: all 0.7s ease-in-out;
    }

    .show {
        transform: translateX(-50%);
        transition: all 0.7s ease-in-out;
    }

    .approve-icon:not(.show),
    .decline-icon:not(.show),
    .approve-text:not(.show),
    .decline-text:not(.show) {
        transform: translateX(20%);
        transition: all 0.7s ease-in-out;
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
        transition-delay: 0.7s;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>