<script setup>
    import { useRoute } from 'vue-router'
    import { useUserStore } from '~~/stores/UserStore'
    import { getDestination } from '~~/js/destinationRequests'
    import { getReviewsForDestination, reviewDestination } from '~~/js/reviewRequests'

    const userStore = useUserStore()
    const route = useRoute()
    let destination = ref(null)
    let reviews = ref(null)

    onBeforeMount(async () => {
        await userStore.init()
        await getDest()
        await getReviews()
        
    })

    async function getDest() {
        try {
            const response = await getDestination(route.params.destinationId)
            destination.value = response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function getReviews() {
        try {
            const response = await getReviewsForDestination(destination.value.id)
            reviews.value = response.data
            destination.value.averageRating = 0
            if (reviews.value === null) {
                destination.value.reviewCount = 0
            }
            else {
                for (let i = 0; i < reviews.value.length; i++) destination.value.averageRating += reviews.value[i].starRating
                destination.value.reviewCount = reviews.value.length
                destination.value.averageRating = destination.value.averageRating/destination.value.reviewCount
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    async function postReview(review) {
        try {
            const response = await reviewDestination(destination.value.id, review)
        }
        catch (error) {
            console.log(error)
        }
        await getDest()
        await getReviews()
    }
</script>

<template>        
    <div class="h-full mt-0">
        <NuxtLayout name="default" class="flex flex-col h-full">
            <Destination class="mx-auto h-1/2 flex mt-16 w-full mb-0"
            v-if="destination"
            :destination="destination" />
            <ReviewAdder @post-review="postReview" class="mx-auto my-6"/>
            <div class="flex flex-wrap justify-evenly">
                <Review v-if="reviews !== null" v-for="review in reviews" :review="review"
                class="m-4" />
            </div>
        </NuxtLayout>       
     </div>

</template>