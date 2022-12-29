<script setup>
    let cancelText = ref(false)
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
    const emit = defineEmits(['cancelFollowRequest'])

    function cancelFollowRequest(username) {
        emit('cancelFollowRequest', username)
        disappear.value = true
    }
</script>

<template>
    <Transition>
        <div v-if="followRequest !== null && followRequest !== undefined" class="rounded-full m-10 mt-32 shadow-lg w-1/4 overflow-hidden">
            <div class="mx-auto mt-0 m-4 px-4 py-20 profile-picture">
            </div>
            <div class="mx-auto text-center">
                <p class="p-2 pb-4">
                    You sent
                </p>
                <NuxtLink :to="'profile/' + followRequest.receiver.username" class="p-2 pt-4">
                    {{ followRequest.receiver.firstName }} {{ followRequest.receiver.lastName }}
                </NuxtLink>
                <p class="p-2 pb-4">
                    a friend request {{ timeIntervalString }}
                </p>
            </div>
            <div class="w-fit mx-auto flex pb-10">
                <div @mouseenter="cancelText = true" @mouseleave="cancelText = false" @click="cancelFollowRequest(followRequest.receiver.username)"
                    class="rounded-full bg-red-900 text-khaki m-4 p-2 w-20 overflow-hidden flex block text-clip cancel">
                    <p :class="{
                        'show': cancelText
                        }"
                    class="relative cancel-text text-clip whitespace-nowrap">
                        <i class="fa fa-times py-2 hover:scale-110 duration-300 cancel-icon"/>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        cancel
                    </p>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
    .bg-red-900:hover {
        background-color: var(--brown);
    }

    .profile-picture {
        background-image: url("https://picsum.photos/500");
    }

    .cancel:hover {
        /* transform: scaleX(1.3); */
        transition: all 0.5s ease-in-out;
    }

    .show {
        transform: translateX(-50%);
        transition: all 0.5s ease-in-out;
    }

    .cancel-icon:not(.show),
    .cancel-text:not(.show) {
        transform: translateX(20%);
        transition: all 0.5s ease-in-out;
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
        transition-delay: 0.5s;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }
</style>