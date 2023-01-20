<script setup>
    defineProps({
        visibility: String,
        // date of posting
    })
    let openDeletePopup = ref(false)
</script>

<template>
    <div class="absolute z-50 bg-gray-600/[.5] w-full h-full">
        <div class="w-full text-center mt-36 mb-6 text-lg">
            <div class="my-2 font-bold text-xl border-b border-fawn w-fit mx-auto hover:shadow-md duration-300">
                Details
            </div>
            <div class="my-2"> 
                Posted on:
            </div>
            <div class="my-2">
                Visible by: 
                <span v-if="visibility === 'PUBLIC'">
                    everyone
                </span>
                <span v-if="visibility === 'FRIEND_ONLY'">
                    your friends
                </span>
                <span v-if="visibility === 'PRIVATE'">
                    your followers
                </span>
                <span v-if="visibility === 'DRAFT'">
                    only you
                </span>
            </div>
            
        </div>

        <div class="w-full text-center my-6 font-bold text-xl border-b border-fawn w-fit mx-auto hover:shadow-md duration-300">
            Edit journey
        </div>

        <div class="w-full text-center my-6 font-bold text-xl border-b border-fawn w-fit mx-auto hover:shadow-md duration-300 relative">
            <div v-if="!openDeletePopup" @click="openDeletePopup = true">
                Delete journey
            </div>
            <div v-if="openDeletePopup" class="top-0 bg-gray-200 p-4 rounded-md w-max mx-auto">
                Are you sure?
                <button class="w-1/2 mt-4 hover:text-red-500 duration-300" @click="$emit('deleteJourney')">
                    Yes
                </button>
                <button class="w-1/2 mt-4 hover:text-blue-800 duration-300" @click="openDeletePopup = false">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>