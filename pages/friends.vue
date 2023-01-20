<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'

    const userStore = useUserStore()
    const followStore = useFollowStore()


    onBeforeMount(async () => {
        await userStore.init()
        await followStore.getFriends()
    })

    const friends = computed(() => followStore.followers)
    onMounted(() => {
    })
</script>

<template>
    <NuxtLayout name="default">
        <UserDetails v-if="friends !== null" v-for="friend in friends" :user="friend"/>
    </NuxtLayout>
</template>