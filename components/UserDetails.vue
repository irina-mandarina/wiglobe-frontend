<script setup>
    import { getProfilePicturePath } from '~~/js/userPictures'
    const props = defineProps({
        user: Object
    })
    let profilePicturePath = computed(() => getProfilePicturePath(props?.user?.profilePicture, props?.user?.gender))
</script>

<template>
    <NuxtLink :to="'/profile/' + user?.username" class="rounded-md shadow-lg h-fit">
        <div class="profile-picture">
            <img class="p-8 mx-auto mt-4" :src="profilePicturePath" alt="Profile picture">
        </div>
        <div class="text-center font-heebo p-6">
            {{ user?.firstName }} {{ user?.lastName }}
        </div>
    </NuxtLink>
</template>