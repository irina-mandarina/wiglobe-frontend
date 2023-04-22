<script setup>
    import { deleteJourney, editJourney } from '~~/js/journeyRequests'
    import { useUserStore } from '~~/stores/UserStore'
    import { getProfilePicturePath } from '~~/js/userPictures'
    import DestinationSearchBar from "~/components/DestinationSearchBar.vue";

    const userStore = useUserStore()
    const router = useRouter()

    const props = defineProps({
        journey: Object
    })

    let editingJourney = ref(false)

    async function deleteJ() {
        try {
            const response = await deleteJourney(props.journey.id)
            navigateTo(router.go(-1))
        }
        catch (error) {
            console.log(error)
        }
    } 

    let profilePicturePath = computed(() =>
        getProfilePicturePath(props?.journey?.userNames?.profilePicture, props?.journey?.userNames?.gender)
    )

    let postedOnText = computed(() => {
      const date = new Date(props.journey?.postedOn)
      if (date.getDate() === new Date().getDate()) {
        return `Posted today at ${date.toLocaleTimeString()}`
      }
      else return `Posted on ${date.toDateString()} at ${date.toLocaleTimeString()}`
    })

    let showVisibilityOptions = ref(false)

    let editedJourney = ref(props.journey)
    editedJourney.value.destinationId = props.journey?.destination?.id

    let editingDestination = ref(false)

    async function saveChanges() {
        try {
            const response = await editJourney(editedJourney.value)
            editingJourney.value = false
        }
        catch(error) {
            console.log(error)
        }
    }
</script>
<template>
    <div v-if="journey"
    class="shadow-xl bg-white rounded-lg w-4/5 mx-auto relative overflow-hidden max-h-screen text-md flex flex-col">

        <div class="flex h-full">

            <!-- Journey info (left) -->
            <div class="w-1/2 relative h-full overflow-hidden float-left flex flex-col"
            @click="navigateTo('/journeys/' + journey?.id)">

                <div class="absolute top-4 left-4">
                    <JourneyMenu
                    v-if="!editingJourney"
                    @edit-journey="editingJourney = true"
                    :visibility="journey?.visibility"
                    :edit-permission="journey?.userNames.username === userStore.username"
                     />
                </div>

                <div v-if="editingJourney"
                class="absolute top-2 left-2 text-black">
                    <i class="fa fa-unlock p-2"
                    :class="{
                            'text-slate-400': editedJourney.visibility !== 'PUBLIC',
                            'text-slate-900': editedJourney.visibility === 'PUBLIC',
                    }"
                    @click="editedJourney.visibility='PUBLIC'" />

                    <i class="fa fa-lock p-2"
                    :class="{
                        'text-slate-400': editedJourney.visibility !== 'PRIVATE',
                        'text-slate-900': editedJourney.visibility === 'PRIVATE',
                    }"
                    @click="editedJourney.visibility='PRIVATE'" />

                    <i class="fa fa-file p-2"
                    :class="{
                            'text-slate-400': editedJourney.visibility !== 'DRAFT',
                            'text-slate-900': editedJourney.visibility === 'DRAFT',
                    }"
                    @click="editedJourney.visibility='DRAFT'" />

                    <i class="fa fa-users p-2"
                    :class="{
                        'text-slate-400': editedJourney.visibility !== 'FRIEND_ONLY',
                        'text-slate-900': editedJourney.visibility === 'FRIEND_ONLY',
                    }"
                    @click="editedJourney.visibility='FRIEND_ONLY'" />
                </div>


                <!-- User info -->
                <div class="w-full text-center p-6 h-1/6">
                    <NuxtLink :to="'/profile/' + journey?.userNames.username"
                    class="w-full flex flex-col">
                        <img class="mx-auto w-1/5" :src="profilePicturePath"/>
                        <span class="mx-auto">
                            <p class="p-1 font-heebo">{{ journey?.userNames.firstName }} {{ journey?.userNames.lastName }}</p>
                        </span>
                        <p class="mx-auto font-heebo">@{{ journey?.userNames.username }}</p>
                    </NuxtLink>
                </div>

                <!-- date -->
                <p v-if="!editingJourney && (journey?.startDate !== undefined && journey?.startDate !== null && journey?.endDate !== undefined && journey?.endDate !== null)"
                class="w-full text-center p-4 h-1/12">
                    From {{ new Date(journey?.startDate).toLocaleDateString() }} to {{ new Date(journey?.endDate).toLocaleDateString() }} at:
                </p>

                <p v-if="editingJourney"
                   class="w-full text-center p-4 h-1/12">
                    From
                    <input v-model="editedJourney.startDate" type="date" class="p-2 h-2/3 border-b-2 border-dark-blue rounded-lg focus:outline-none"/>
                    to
                    <input v-model="editedJourney.endDate" type="date" class="p-2 h-2/3 border-b-2 border-dark-blue rounded-lg focus:outline-none"/>
                    at:
                </p>

                <!-- destination -->
                <div
                    class="h-1/12 flex">

                    <DestinationMini
                        v-if="!editingJourney || !editingDestination"
                        :destination="journey?.destination" />

                    <i class="fa fa-times inline p-3"
                       v-if="editingJourney && !editingDestination && journey.destination"
                       @click="editingDestination = true"/>

                </div>

                <DestinationSearchBar
                v-if="(editingDestination || !(journey.destination)) && editingJourney"
                class="mx-auto"
                @choose-destination="(val) => {debugger; editedJourney.destinationId = val.id}" />

                <!-- Journey description -->
                <p v-if="!editingJourney"
               class="h-1/3 p-4 first-letter:font-bold first-letter:text-3xl first-letter-font-droid text-ellipsis overflow-hidden">
                    {{ journey?.description }}
                </p>

                <textarea v-if="editingJourney"
                v-model="editedJourney.description"
                class="px-4 py-2 flex border-b-2 border-dark-blue resize-none rounded-lg w-3/4 h-min shadow-inner focus:outline-none mx-auto my-4">
                </textarea>

              <div class="font-oblique text-sm font-droid h-1/6 p-2 bg-white px-4 select-none">
                {{ postedOnText }}
              </div>
            </div>

            <!-- Pictures and activities (right) -->
            <div class="w-1/2 h-full flex-col">
                <JourneyAttachments
                v-if="journey?.activities || journey?.images"
                :activities="journey?.activities" :images="journey?.images" />
            </div>
            <div v-if="editingJourney"
                 class="absolute right-6 top-6">
                <button class="bg-slate-600 text-white rounded-lg hover:bg-slate-700 duration-75 p-2 m-2 cursor-pointer"
                        @click="saveChanges()">
                    Save
                </button>
                <button class="bg-slate-200 rounded-lg hover:bg-slate-300 duration-75 p-2 m-2 cursor-pointer"
                        @click="editingJourney = false; editingDestination = false">
                    Cancel
                </button>
            </div>

        </div>

    </div>
</template>

<style scoped>
    .first-letter-font-droid::first-letter {
        font-family: Droid;
    }
</style>