<script setup>
    defineProps({
        review: Object
    })
</script>

<template>
    <div class="shadow-xl rounded-lg w-1/4 bg-white p-4">
        <!-- Review options -->
        <div class="float-right relative">
            <span class="absolute right-2">
                ...
            </span>
        </div>
        <!-- Review user -->
        <div class="w-full text-center">
            <NuxtLink :to="'profile/' + review.userNames.username">
                <img class="flex mx-auto" src="https://picsum.photos/50"/>
                <span class="mx-auto"> 
                    <p class="p-1 font-heebo">{{ review.userNames.firstName }} {{ review.userNames.lastName }}</p>
                </span>
                <p class="mx-auto mb-2 font-metrophobic text-gray-900">@{{ review.userNames.username }}</p>  
            </NuxtLink>
        </div>
        <!-- date -->
        <div>
            <p class="italic font-droid text-sm text-center text-khaki p-4">{{ new Date(review.reviewedDate).toDateString() }}</p>
        </div>

        <!-- Review star rating -->
        <div class="w-full text-center">
            <i class="fa fa-star duration-300"
                :class="{
                    'text-fawn': review.starRating >= 1
                }"/>
            <i class="fa fa-star duration-300"
                :class="{
                    'text-fawn': review.starRating >= 2
                }"/>
            <i class="fa fa-star duration-300"
                :class="{
                    'text-fawn': review.starRating >= 3
                }"/>
            <i class="fa fa-star duration-300"
                :class="{
                    'text-fawn': review.starRating >= 4
                }"/>
            <i class="fa fa-star duration-300"
                :class="{
                    'text-fawn': review.starRating >= 5
                }"/>
        </div>
        <!-- Review body -->
        <div class="w-full text-center">
            <p class="p-2 pb-8 m-2 font-droid">
                {{ review.title }}
            </p>
            <p class="p-2 pb-8 m-2 font-heebo">
                {{ review.content }}    
            </p>
        </div>
    </div>
</template>