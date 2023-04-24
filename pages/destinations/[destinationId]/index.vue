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

            <div v-if="destination"
            class="flex pt-20 relative select-none">

                <div class="h-full w-full absolute blur-xl bg-cover bg-center z-[-3]"
                :style="{ 'background-image': 'url(https://flagcdn.com/w640/' + destination?.country?.countryCode?.toLowerCase() + '.png)' }">>
                </div>

                <div class="h-full w-full absolute bg-white/60 blur-xl z-[-2]">
                </div>

                <!-- Destination Header -->
                <NuxtLink :to="'/destinations/' + destination?.id"
                class="w-1/2 p-6 text-center cursor-pointer">
<!--                    flag-->
                    <div class="text-center shadow-md text-center rounded-md w-full bg-center bg-img flex py-32 bg-cover"
                    :style="{ 'background-image': 'url(https://flagcdn.com/w640/' + destination?.country?.countryCode?.toLowerCase() + '.png)' }">
                        <h1
                        class="font-bold font-heebo mx-auto my-auto tracking-wider text-3xl text-white text-stroke">
                            {{ destination.name }}
                        </h1>
                    </div>
                </NuxtLink>

                <!-- Destination info -->
                <div class="w-1/2 h-full flex flex-col text-green-900 p-8 relative justify-items-center">
                    <div class="mx-auto w-full font-droid">
<!--                        stars-->
                        <span v-if="destination.reviewCount > 0"
                        class="relative text-3xl">
                            <i class="fa fa-star text-fawn"
                           v-for="star in (destination.averageRating - destination.averageRating % 1)"/>
                            <i class="fa fa-star text-slate-300"
                           v-for="star in 5 - (destination.averageRating - destination.averageRating % 1)"/>
                        </span>

                        <p v-if="destination.reviewCount > 0"
                        class="mt-6">
                            Average rating: {{ destination.averageRating }} ({{ destination.reviewCount }} reviews)
                        </p>

                        <NuxtLink :to="'/destinations/' + destination?.id + '/journeys'"
                        class="mt-4">
                            {{ destination.visitCount }} visits

                            <button
                            class="font-metrophobic text-sm bg-khaki text-white mx-2 p-2 rounded-full">
                                See journeys to {{ destination.name }}
                                <i class="fa fa-arrow-right pr-4 hover:scale-x-125 duration-75 origin-left" />
                            </button>
                        </NuxtLink>
                    </div>
                    <div class="w-full text-start mt-2">
<!--                        <div>-->
<!--                            Category: {{ destination.featureClass }}-->
<!--                        </div>-->
                        <div>
                            Class: {{ destination.featureCode }}
                        </div>
                        <div class="">
                            Country: {{ destination.country.countryName }}, {{ destination.country.continent }}
                        </div>
                    </div>
                </div>
            </div>


            <ReviewAdder @post-review="postReview" class="mx-auto my-6"/>
            <div class="flex flex-wrap justify-evenly">
                <Review v-if="reviews !== null" v-for="review in reviews" :review="review"
                class="m-4" />
            </div>
        </NuxtLayout>       
     </div>

</template>
<style scoped>

    .text-stroke {
        color: white;
        text-shadow:
            -1px -1px 0 #000,
            1px -1px 0 #000,
            -1px 1px 0 #000,
            1px 1px 0 #000;
    }
</style>