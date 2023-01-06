<script setup>
    const props = defineProps({
        journey: Object
    })
    let activityOnDisplayId = ref(0)

    function showPreviousActivity() {
        if (activityOnDisplayId.value === 0) {
            activityOnDisplayId.value = props.journey.activities.length - 1
        }
        else {
            activityOnDisplayId.value--
        }
        console.log(props.journey.activities)
    }

    function showNextActivity() {
        if (activityOnDisplayId.value === props.journey.activities.length - 1) {
            activityOnDisplayId.value = 0
        }
        else {
            activityOnDisplayId.value++
        }
    }
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
                    <NuxtLink :to="'/profile/' + journey.usernames.username">
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
                <div class="flex justify-evenly" v-if="journey.activities !== null && journey.activities !== undefined && journey.activities.length !== 0">
                    <div class="h-full float-left" @click="showPreviousActivity()">
                        -
                    </div>
                    <Activity :activity="journey.activities[activityOnDisplayId]"/>
                    <div class="h-full float-right" @click="showNextActivity()">
                        +
                    </div>
                </div>
            </div>
               
        </div>
        
    </div>
</template>