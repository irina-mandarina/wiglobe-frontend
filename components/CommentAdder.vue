<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { getProfilePicturePath } from '~~/js/userPictures'

    const emits = defineEmits([
        'postComment'
    ])

    const userStore = useUserStore()

    let username = computed(() => userStore.username)
    let firstName = computed(() => userStore.firstName)
    let lastName = computed(() => userStore.lastName)
    let profilePicture = computed(() => userStore.profilePicture)
    let content = ref(null)

    function emitPost() {
        emits('postComment', content.value)
        content.value = null
    }

    let profilePicturePath = computed(() => getProfilePicturePath(
        profilePicture.value, 
        (computed( () => userStore.gender)).value)
        )
</script>

<template>
    <div class="shadow-md rounded-xl w-1/3 p-6 bg-white">
        <!-- Comment user -->
        <div class="p-2">
            <div>
                <img class="p-2 ml-2 float-left w-1/3" :src="profilePicturePath"/>
                <span class="flex mb-0">  
                    <p class="p-1 font-droid"> {{ firstName }} {{ lastName }}</p>
                </span>
                <p class="flex p-2 pt-0 mt-0">@{{ username }}</p>  
            </div>
        </div>
        <!-- Comment body -->
        <div class="w-full">
            <input class="p-2 w-full mb-4 rounded-lg focus:outline-[#7EA172]"
                @keyup.enter="emitPost()"
                v-model="content"
                placeholder="Add a new comment"
            />
            <button @click="emitPost()" @keyup.enter="emitPost()"
            class="bg-asparagus p-2 text-white rounded-full hover:text-gray-200 focus:outline-none mx-auto flex">
                Post comment
            </button>
        </div>
    </div>
</template>