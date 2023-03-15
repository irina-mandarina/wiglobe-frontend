<script setup>
    import { deleteJourney } from '~~/js/journeyRequests'
    import { useUserStore } from '~~/stores/UserStore'
    import { getProfilePicturePath } from '~~/js/userPictures'

    const userStore = useUserStore()
    const router = useRouter()

    const props = defineProps({
        journey: Object
    })

    let manageJourney = ref(false)

    async function deleteJ() {
        try {
            const response = await deleteJourney(props.journey.id)
            navigateTo(router.go(-1))
        }
        catch (error) {
            console.log(error)
        }
    } 

    let profilePicturePath = computed(() => getProfilePicturePath(props?.journey?.userNames?.profilePicture, props?.journey?.userNames?.gender))

</script>
<template>
    <div class="shadow-xl bg-white rounded-lg w-4/5 mx-auto relative overflow-hidden text-md">
        <JourneyManager v-if="manageJourney" :visibility="journey.visibility" :posted-on="journey?.postedOn" @delete-journey="deleteJ" />
        <div class="flex">

            <!-- Journey info (left) -->
            <div class="w-1/2 relative h-full overflow-hidden float-left" @click="navigateTo('/journeys/' + journey.id)">
                <div class="absolute top-4 left-4">
                    <JourneyMenu @manage-journey="manageJourney = !manageJourney" :visibility="journey.visibility" :edit-permission="journey.userNames.username === userStore.username" />
                </div>
                <div class="">
                    <!-- User info -->
                    <div class="w-full text-center m-6">
                        <NuxtLink :to="'/profile/' + journey.userNames.username">
                            <img class="mx-auto w-1/4" :src="profilePicturePath"/>
                            <span class="mx-auto"> 
                                <p class="p-1 font-heebo">{{ journey.userNames.firstName }} {{ journey.userNames.lastName }}</p>
                            </span>
                            <p class="mx-auto mb-2 font-heebo">@{{ journey.userNames.username }}</p>  
                        </NuxtLink>
                    </div>
                    <div class="font-oblique text-sm text-center font-droid">
                        Posted on {{ journey?.postedOn }}
                    </div>
                    <!-- date -->
                    <p v-if="journey.startDate !== undefined && journey.startDate !== null && journey.endDate !== undefined && journey.endDate !== null" class="w-full text-center py-6 m-6">
                        From {{ new Date(journey.startDate).toLocaleDateString() }} to {{ new Date(journey.endDate).toLocaleDateString() }} at:
                    </p>
                </div>

                <!-- destination -->
                <DestinationMini v-if="journey.destination !== undefined && journey.destination !== null" class="z-100 my-4" :destination="journey.destination" />
                
                <!-- Journey description -->
                <p class="my-6 p-10 first-letter:font-bold first-letter:text-3xl first-letter-font-droid">
                    &nbsp; &nbsp; &nbsp; {{ journey.description }}
                </p>
            </div>

            <!-- Pictures and activities (right) -->
            <div class="w-1/2">
                <JourneyAttachments class="" :activities="journey.activities" :images="journey?.images" />
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