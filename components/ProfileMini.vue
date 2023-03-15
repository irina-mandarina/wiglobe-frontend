<script setup>
    import { getUserDetails } from '~~/js/userRequests'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { getProfilePicturePath } from '~~/js/userPictures'

    const props = defineProps({
        username: String
    })

    let user = ref(null)
    let relation = ref('')

    onBeforeMount(async () => {
        try {
            const response = await getUserDetails(props.username)
            user.value = response.data
        }
        catch (error) {
            console.log(error)
        }

        const followStore = useFollowStore()
        // debugger
        if (followStore.friends.filter((f) => f.username === user.value.username).length > 0) {
            relation.value = "You are friends"
        }
        else if (followStore.following.filter((f) => f.username === user.value.username).length > 0) {
            relation.value = "You are following"
        }
        else if (followStore.followers.filter((f) => f.username === user.value.username).length > 0) {
            relation.value = "They are following you"
        }
    })

    let profilePicturePath = computed(() => getProfilePicturePath(user.value.profilePicture, user.value.gender))
</script>

<template>
    <div class="shadow-md rounded-md bg-white text-dark-blue text-center">
        <!-- image -->
        <div class="profile-picture">
            <img class="p-2 mx-auto mt-4" :src="profilePicturePath" alt="">
        </div>

        <!-- names -->
        <div class="p-2">
            {{ user?.firstName }} {{ user?.lastName }}
        </div>

        <div>
            @{{ user?.username }}
        </div>

        <div class="pt-2 pb-6">
            {{ relation }}
        </div>
    </div>
</template>