<script setup>
    let approveText = ref(false)
    let declineText = ref(false)

    const props = defineProps ({
        followRequest: Object
    })
</script>

<template>
    <div class="rounded-full m-10 mt-32 shadow-lg w-1/4 overflow-hidden">
        <div class="mx-auto mt-0 m-4 px-4 py-20 profile-picture">
        </div>
        <div class="mx-auto text-center">
            <p class="p-2 pt-4">
                {{ followRequest.requester.firstName }} {{ followRequest }}
            </p>
            <p class="p-2 pb-4">
                sent you a friend request 15 hours ago
            </p>
        </div>
        <div class="w-fit mx-auto flex pb-10">
            <div @mouseenter="approveText = true" @mouseleave="approveText = false"
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

            <div @mouseenter="declineText = true" @mouseleave="declineText = false"
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
        transition: all 1s ease-in-out;
    }

    .show {
        transform: translateX(-50%);
        transition: all 1s ease-in-out;
    }

    .approve-icon:not(.show),
    .decline-icon:not(.show),
    .approve-text:not(.show),
    .decline-text:not(.show) {
        transform: translateX(20%);
        transition: all 1s ease-in-out;
    }
</style>