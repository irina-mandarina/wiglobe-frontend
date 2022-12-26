<script setup>
    defineProps({
        user: Object
    })
</script>

<template>
    <NuxtLink :to="'/profile/' + user.username" class="rounded-md shadow-lg h-fit">
        <div class="profile-picture">
            <img class="p-8 mx-auto mt-4" src="https://picsum.photos/400" alt="">
        </div>
        <div class="text-center font-heebo p-6">
            {{ user.firstName }} {{ user.lastName }}
        </div>
    </NuxtLink>
</template>