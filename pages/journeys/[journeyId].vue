<script setup>
    import { getJourney } from '~~/js/journeyRequests'
    import { useRoute } from 'vue-router'
    import { useUserStore } from '~~/stores/UserStore'
    import {commentJourney, deleteComment, getCommentsForJourney} from '~~/js/commentRequests'

    const userStore = useUserStore()
    const route = useRoute()
    let journey = ref(null)
    let comments = ref(null)
    
    onBeforeMount(async () => {
        await userStore.init()
        try {
            const response = await getJourney(route.params.journeyId)
            journey.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        await getComments()
    })

    async function getComments() {
        try {
            const response = await getCommentsForJourney(journey.value.id)
            comments.value = response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function postComment(content) {
        try {
            const response = await commentJourney(journey.value.id, {content})
        }
        catch (error) {
            console.log(error)
        }
        await getComments()
    }

    async function deleteCom(id) {
      try {
        const response = await deleteComment(journey.value.id, id)
        await getComments()
      }
      catch(error) {
        console.log(error)
      }

    }
</script>

<template>
    <NuxtLayout name="default"
    class="w-full h-full">
      
        <Journey v-if="journey"
        :journey="journey" class="mt-6" />

        <CommentAdder class="mx-auto my-6"
        @post-comment="postComment"/>

        <div class="p-6 justify-items-center">
            <Comment
                v-if="comments !== null"
                v-for="comment in comments"
                @delete-com="deleteCom"
                :comment="comment"
                class="mx-auto my-4 " />
        </div>

    </NuxtLayout>
</template>