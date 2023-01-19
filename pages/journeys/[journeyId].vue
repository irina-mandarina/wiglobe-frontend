<script setup>
    import { getJourney } from '~~/js/journeyRequests'
    import { useRoute } from 'vue-router'
    import { useUserStore } from '~~/stores/UserStore'
    import { commentJourney, getCommentsForJourney } from '~~/js/commentRequests'

    const userStore = useUserStore()
    let journey = ref(null)
    let comments = ref(null)
    
    onBeforeMount(async () => {
        await userStore.init()
        try {
            const response = await getJourney(useRoute().params.journeyId)
            journey.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        getComments()
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
        getComments()
    }
</script>

<template>
    <NuxtLayout name="default">
        <Journey v-if="journey !== null" :journey="journey" />
        <CommentAdder  class="mx-auto my-6" @post-comment="postComment"/>
        <Comment v-if="comments !== null" v-for="comment in comments" :comment="comment" class="mx-40 my-6" />   
    </NuxtLayout>
</template>