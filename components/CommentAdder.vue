<script setup>
    import { useUserStore } from '~~/stores/UserStore'

    const emits = defineEmits([
        'postComment'
    ])

    const userStore = useUserStore()

    let user = computed(() => userStore.user)
    let content = ref(null)

    function emitPost() {
        emits('postComment', content.value)
    }
</script>

<template>
    <div class="shadow-md rounded-xl w-1/3 p-6">
        <!-- Comment options -->
        <div class="float-right">
            <span class="p-2">
                ...
            </span>
        </div>
        <!-- Comment user -->
        <div class="p-2">
            <NuxtLink to="/">
                <img class="p-2 ml-2 float-left" src="https://picsum.photos/50"/>
                <span class="flex mb-0">  
                    <p class="p-1 font-droid"> {{ user.firstName }} {{ user.lastName }}</p>
                </span>
                <p class="flex p-2 pt-0 mt-0">@{{ user.username }}</p>  
            </NuxtLink>
        </div>
        <!-- Comment body -->
        <div class="w-full">
            <p class="py-2 px-6 text-sm italic">
                {{ new Date().toDateString() }}
            </p>
            <input class="p-2 w-full pb-8 m-4 rounded-lg focus:outline-[#7EA172]"
                v-model="content"
                placeholder="Add a new comment"
            />
            <button @click="emitPost()" class="bg-asparagus px-6 py-2 text-white rounded-full hover:text-gray-200 focus:outline-none mx-auto flex">
                Post comment
            </button>
        </div>
    </div>
</template>