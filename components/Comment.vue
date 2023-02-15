<script setup>
import { deleteComment } from '~~/js/commentRequests'
    import { useUserStore } from '~~/stores/UserStore'

    const props = defineProps({
        comment: Object
    })

    const userStore = useUserStore()
    
    let openOptions = ref(false)

    async function deleteCom() {
        try {
            const response = await deleteComment(props.comment.journeyId, props.comment.id)
            
        }
        catch(error) {
            console.log(error)
        }
    }
</script>

<template>
    <div class="shadow-md rounded-xl w-1/3 p-6 relative">
        <!-- Comment options -->
        <div v-if="comment?.userNames.username === userStore?.username" class="float-right">
            <span @click="openOptions = !openOptions" class="p-2">
                ...
            </span>
            <div v-if="openOptions" 
            @click="deleteCom"
            class="absolute whitespace-nowrap bg-peach shadow-sm rounded-sm z-50 m-1 p-4">
                Delete
            </div>
        </div>
        <!-- Comment user -->
        <div class="p-2">
            <NuxtLink  :to="'/profile/' + comment?.userNames.username">
                <img class="p-2 ml-2 float-left" src="https://picsum.photos/50"/>
                <span class="flex mb-0">  
                    <p class="p-1 font-droid"> {{ comment?.userNames.firstName }} {{ comment?.userNames.lastName }}</p>
                </span>
                <p class="flex p-2 pt-0 mt-0">@{{ comment?.userNames.username }}</p>  
            </NuxtLink>
        </div>
        <!-- Comment body -->
        <div class="w-full">
            <p class="py-2 px-6 text-sm italic">
                {{ new Date(comment?.postedOn).toDateString() }}
            </p>
            <p class="p-2 pb-8 m-4">
                {{ comment?.content }}
            </p>
        </div>
    </div>
</template>