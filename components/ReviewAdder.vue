<script setup>
    import { useUserStore } from '~~/stores/UserStore'

    const emits = defineEmits([
        'postReview'
    ])

    const userStore = useUserStore()

    let username = computed(() => userStore.username)
    let firstName = computed(() => userStore.firstName)
    let lastName = computed(() => userStore.lastName)
    let title = ref("")
    let content = ref("")
    let starRating = ref(0)

    function emitPost() {
        emits('postReview', {
            content: content.value,
            title: title.value,
            starRating: starRating.value
        })
        content.value = ''
        title.value = ''
        starRating.value = 0
    }
</script>

<template>
    <div class="shadow-md rounded-lg w-1/3 bg-white p-6 ">
        <!-- Review user -->
        <div v-if="username !== null" class="w-full text-center">
            <NuxtLink :to="'/profile/' + username">
                <img class="mx-auto" src="https://picsum.photos/50"/>
                <span class="mx-auto"> 
                    <p class="p-1 font-heebo">{{ firstName }} {{ lastName }}</p>
                </span>
                <p class="mx-auto mb-2 font-metrophobic text-gray-900">@{{ username }}</p>  
            </NuxtLink>
        </div>

        <!-- Review star rating -->
        <div class="w-full text-center">
            <i class="fa fa-star duration-300" 
                @click="starRating = 1"
                :class="{
                    'text-fawn': starRating >= 1
                }"/>
            <i class="fa fa-star duration-300" 
                @click="starRating = 2"
                :class="{
                    'text-fawn': starRating >= 2
                }"/>
            <i class="fa fa-star duration-300" 
                @click="starRating = 3"
                :class="{
                    'text-fawn': starRating >= 3
                }"/>
            <i class="fa fa-star duration-300" 
                @click="starRating = 4"
                :class="{
                    'text-fawn': starRating >= 4
                }"/>
            <i class="fa fa-star duration-300" 
                @click="starRating = 5"
                :class="{
                    'text-fawn': starRating >= 5
                }"/>
        </div>

        <!-- Review body -->
        <div class="w-full text-center p-4">
            <input v-model="title" placeholder="Review title"  class="p-2 my-4 mx-auto focus:outline-none focus:border-b duration-300 rounded-lg"/>
            <textarea v-model="content" class="flex p-2 my-4 mx-auto resize-none focus:outline-none focus:bg-gray-100 rounded-lg font-heebo" placeholder="Review content"></textarea>
            <button @click="emitPost()" class="bg-asparagus px-6 py-2 text-white rounded-full hover:text-gray-200 focus:outline-none mx-auto flex">
                Post comment
            </button>
        </div>

    </div>
</template>

<style scoped>
</style>