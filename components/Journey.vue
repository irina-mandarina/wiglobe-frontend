<script setup>
    const props = defineProps({
        journey: Object
    })
</script>

<template>
    <div class="shadow-md rounded-lg w-2/3 mx-auto m-6 overflow-hidden">
        <div class="flex">

            <!-- Journey picture (left) -->
            <div class="w-1/2 h-fit float-left" @click="navigateTo('/journeys/' + journey.id)">
                <img class="h-full" src="https://picsum.photos/1000"/>
            </div>

            <!-- Journey info (right) -->
            <div class="w-1/2 float-right h-full">
                 <!-- User info -->
                <div class="w-1/2 text-center m-6">
                    <NuxtLink to="/profile">
                        <img class="mx-auto" src="https://picsum.photos/50"/>
                        <span class="mx-auto"> 
                            <p class="p-1 font-heebo">{{ journey.usernames.firstName }} {{ journey.usernames.lastName }}</p>
                        </span>
                        <p class="mx-auto mb-2 font-heebo">@{{ journey.usernames.username }}</p>  
                    </NuxtLink>
                </div>
                
                <MiniDestination class="z-100" :destination="journey.destination" />

                <!-- Journey description -->
                <p class="my-6 p-4">{{ journey.description }}</p>
            </div>
               
        </div>
        
    </div>
</template>