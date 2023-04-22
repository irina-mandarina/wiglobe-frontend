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
        <div class="text-center text-3xl font-droid p-6">
            Friends make the journey of life worth every mile.
        </div>
        <div v-if="friends && friends?.length > 0" class="flex flex-wrap justify-evenly">
            <UserDetails v-for="friend in friends" :user="friend" class="w-1/4 bg-white"/>
        </div>
        <div v-else class="text-center font-droid text-xl">
            You do not have any friends yet.
        </div>
    </NuxtLayout>
</template>