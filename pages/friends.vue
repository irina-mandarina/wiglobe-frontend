<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'

    const userStore = useUserStore()
    const followStore = useFollowStore()

    const friends = computed(() => followStore.followers)

    onBeforeMount(async () => {
        await userStore.init()
        await followStore.getFriends()
    })

    onMounted(() => {
    })
</script>

<template>
    <NuxtLayout name="default">
        <UserDetails v-if="friends !== null" v-for="friend in friends" />
    </NuxtLayout>
</template>