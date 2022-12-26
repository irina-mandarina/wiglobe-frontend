<script setup>
    import { useRoute } from 'vue-router'
    import { getDestination } from '~~/js/destinationRequests'
    import { getReviewsForDestination, reviewDestination } from '~~/js/reviewRequests'

    const route = useRoute()
    let destination = ref(null)
    let reviews = ref(null)

    onBeforeMount(async() => {
        console.log(route.params)
        try {
            const response = await getDestination(route.params.destinationId) 
            destination.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        getReviews()
        destination.value.averageRating = 0
        if (reviews.value === null) {
            destination.value.reviewCount = 0
        }
        else {
            for (let review in reviews.value) destination.value.averageRating += review.starRating
            destination.value.averageRating /= reviews.value.length
            destination.value.reviewCount = reviews.value.length    
        }
        
    })

    async function getReviews() {
        try {
            const response = await getReviewsForDestination(destination.value.id)
            reviews.value = response.data
            console.log(reviews.value)
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
        getReviews()
    }
</script>

<template>        <div class="bg-khaki mt-0">

    <NuxtLayout name="default">
        <Destination class="mx-auto w-full mb-0" v-if="destination !== null" :destination="destination" />
            <ReviewAdder @post-review="postReview" class="mx-auto my-8"/>
            <div class="flex flex-wrap justify-evenly">
                <Review v-if="reviews !== null" v-for="review in reviews" :review="review" class="m-6" />
            </div>    
    </NuxtLayout>        </div>

</template>