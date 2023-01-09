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
    <div class="shadow-md rounded-lg w-4/5 mx-auto m-6 overflow-hidden">
        
        <div class="flex">

            <!-- Journey picture (left) -->
            <div class="w-1/2 relative h-full overflow-hidden float-left" @click="navigateTo('/journeys/' + journey.id)">
                <img class="h-[40rem]" src="https://picsum.photos/1000"/>
                <!-- <div class="absolute h-full w-full journey-image"></div> -->
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
                
                <!-- date -->
                <p class="text-center p-6">
                    From {{ new Date(journey.startDate).toLocaleDateString() }} to {{ new Date(journey.endDate).toLocaleDateString() }} at:
                </p>

                <!-- destination -->
                <MiniDestination class="z-100" :destination="journey.destination" />


                <!-- Journey description -->
                <p class="my-6 p-10 first-letter:font-bold first-letter:text-3xl first-letter-font-droid">&nbsp; &nbsp; &nbsp; {{ journey.description }}</p>


                <!-- activities -->
                <div class="flex h-max justify-evenly p-4" v-if="journey.activities && journey.activities !== undefined && journey.activities.length !== 0">
                    <div class="h-full float-left bg-rose-500 overflow-hidden" @click="showPreviousActivity()">
                        <i class="fa fa-chevron-left p-96 " />
                    </div>
                    <Activity :activity="journey.activities[activityOnDisplayId]"/>
                    <div class="h-full float-right bg-gray-200 overflow-hidden" @click="showNextActivity()">
                        <i class="fa fa-chevron-right p-96" />
                    </div>
                </div>
            </div>
               
        </div>
        
    </div>
</template>
<style scoped>
    .journey-image {
        background-image: url('https://picsum.photos/1000');
    }

    .first-letter-font-droid::first-letter {
        font-family: Droid;
    }
</style>