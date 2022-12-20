<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { reviewDestination } from '~~/js/reviewRequests'

    const userStore = useUserStore()

    let username = ref(null)
    let firstName = ref(null)
    let lastName = ref(null)
    let content = ref(null)
    let title = ref(null)
    let starRating = ref(null)

    onBeforeMount(() => {
        if (userStore.user === null) {
            userStore.getUserDetails()
        }

        username.value = userStore.user.username
        firstName.value = userStore.user.firstName
        lastName.value = userStore.user.lastName
    })
</script>

<template>
    <div class="shadow-md rounded-lg w-1/3">
        <!-- Review user -->
        <div class="w-full text-center">
            <NuxtLink to="/">
                <img class="mx-auto" src="https://picsum.photos/50"/>
                <span class="mx-auto"> 
                    <p class="p-1 font-heebo">{{ firstName }} {{ lastName }}</p>
                </span>
                <p class="mx-auto mb-2 font-metrophobic text-gray-900">@{{ username }}</p>  
            </NuxtLink>
        </div>

        <!-- Review star rating -->
        <div class="w-full text-center">
            <i class="fa fa-star" />
            <i class="fa fa-star" />
            <i class="fa fa-star" />
            <i class="fa fa-star" />
            <i class="fa fa-star" />
        </div>

        <!-- Review body -->
        <div class="w-full text-center">
            <input v-model="title" />
            <textarea v-model="content" class="p-2 pb-8 m-4 font-droid font-oblique resize-none"></textarea>
        </div>
    </div>
</template>