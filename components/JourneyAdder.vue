<script setup>
    import { useJourneyStore } from '~~/stores/JourneyStore'
    import { useUserStore } from '~~/stores/UserStore'
    import { addActivityToJourney } from '~~/js/activityRequests'
    import { searchDestinations, getDestination } from '~~/js/destinationRequests'
    import { getProfilePicturePath } from '~~/js/userPictures'
    import axios from 'axios'

    const journeyStore = useJourneyStore()
    const userStore = useUserStore()
    
    const firstName = computed(() => userStore.firstName)
    const lastName = computed(() => userStore.lastName)
    const username = computed(() => userStore.username)

    let destinationKeyword = ref(null)
    let chosenDestination = ref(null)
    let destinationSearchResults = ref(null)
    let keywordLength = 0
    let description = ref(null)
    let startDate = ref(null)
    let endDate = ref(null)

    let images = ref([])
    let imageFilenames = ref([])
    let visibility = ref('PUBLIC')
    let showVisibilityOptions = ref(false)
    let activities = ref([])

    let journeyId = null
    let canBePosted = computed(() => {
        return chosenDestination.value != null && startDate.value != null
    })
    let creatorOpen = ref(false)

    async function handleFileUpload(event) {
        const file = event.target.files[event.target.files?.length - 1]
        images.value.push(file)
    }

    async function uploadImages() {
        for (let i = 0; i < images.value?.length; i++) {
            let data = images.value[i]
            await axios.post('api/journeys/upload', 
                data, 
                {
                    headers: {
                        'Content-Type': 'application/octet-stream'
                    }
            })
            .then(response => {
                console.log(response)
                imageFilenames.value.push(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    watch(() => destinationKeyword.value,
        (modifiedKeyword) => {
            if (chosenDestination.value === null &&
             (modifiedKeyword === null || modifiedKeyword?.length < keywordLength)) {
                destinationSearchResults.value = null
            }
            else if (chosenDestination.value === null && 
            (destinationSearchResults.value !== null && 
            modifiedKeyword?.length > keywordLength)) {
                // show more accurate results
                destinationSearchResults.value = destinationSearchResults.value.filter ((it) => 
                    it.name.toLowerCase().startsWith(modifiedKeyword.toLowerCase()) ||
                     it.country.toLowerCase().startsWith(modifiedKeyword.toLowerCase())
                )
            }
            keywordLength = destinationKeyword.value?.length
    })

    watch( 
        [startDate, endDate, chosenDestination, activities, images]
    , async (journey) => {
            await postToDrafts()
    })

    async function findDestinations() {
        try {
            const response = await searchDestinations(destinationKeyword.value, 1, 50)
            destinationSearchResults.value = response.data
        }
        catch(error) {
            console.log(error)
        }
    }

    async function chooseDestination(destinationId) {
        try {
            chosenDestination.value = (await getDestination(destinationId)).data
        }
        catch (error) {
            console.log(error)
        }
        
    }

    async function postToDrafts() {
        await uploadImages()
        let destinationId
        if (chosenDestination.value === null) {
          destinationId = null
        }
        else {
          destinationId = chosenDestination.value.id
        }
        journeyId = (await journeyStore.postJourney({
            id: journeyId,
            startDate: startDate.value,
            endDate: endDate.value,
            destinationId,
            description: description.value,
            activities: activities.value,
            visibility: 'DRAFT',
            images: imageFilenames.value
        })).id

    }

    async function addActivity(activityRequest) {
        
        if (journeyId === null) {
            await postToDrafts()
        }
        try {
            const response = await addActivityToJourney(journeyId, activityRequest)
            activities.value.push(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function postJourney(journey) {
        await uploadImages()
        if (images.value !== null) {
            // for (let i = 0; i < imageFilenames.value.length; i++) {
            //     await postImageName(journeyId, imageFilenames.value[i])
            // }
        }
        navigateTo('/journeys/' + (await journeyStore.postJourney(journey)).id)
    }
    
    let profilePicturePath = computed(() => getProfilePicturePath(
        computed( () => userStore.profilePicture).value,
        computed( () => userStore.gender).value
    ))

</script>

<template>
    <div class="w-full relative py-6">
        <div v-if="!creatorOpen" class="p-6 mt-20 text-2xl mx-auto bg-gray-100 text-center rounded-lg shadow-md w-1/4" @click="creatorOpen = true">
            <span class="font-heebo font-bold text-4xl hover:text-green-700 duration-300">
                +
            </span>
            Create a new journey
        </div>
        <div :class="{
            'h-2': !creatorOpen,
            'h-fit': creatorOpen,
            'open': creatorOpen
        }" class="shadow-md rounded-lg bg-white w-11/12 mx-auto m-6 p-6 creator-container border-khaki border-2 relative">

            <div class="flex creator" :class="{
                'visible': creatorOpen
            }">

                <!-- User info -->
                <div class="float-left w-1/6 m-2 text-center h-min">
                    <NuxtLink :to="'/profile/' + username">
                        <img class="mx-auto" :src="profilePicturePath"/>
                        <span class="mx-auto"> 
                            <p class="p-1 font-heebo">{{ firstName }} {{ lastName }}</p>
                        </span>
                        <p class="mx-auto mb-2 font-heebo">@{{ username }}</p>  
                    </NuxtLink>
                </div>
                <!-- Journey info (top) -->
                <div class="w-5/6 h-full relative">
                    <div class="flex w-full">
                        <div class="w-1/2">
                            <p class="text-center my-4">
                                Journey duration: 
                            </p>
                            <div class="flex mx-auto justify-center">
                                <input v-model="startDate" type="date" class="p-2 h-2/3 border-b-2 border-dark-blue rounded-lg focus:outline-none"/>
                                <span class="my-2 p-2"> - </span>
                                <input v-model="endDate"   type="date" class="p-2 h-2/3 border-b-2 border-dark-blue rounded-lg focus:outline-none"/>
                            </div>
                        </div>
                        
                        <div class="mt-4 w-1/2 py-4 relative">
<!--                            <DestinationSearchBar @choose-destination="(val) => chosenDestination = val" />-->
                            <span v-if="chosenDestination === null || chosenDestination === undefined">
                                Select your destination:
                                <!-- more than 3 symbols, ass search button -->
                                <input v-model="destinationKeyword"
                                class="mx-auto px-4 border-b-2 border-dark-blue p-2 rounded-full focus:outline-none"
                                placeholder="Destination"
                                type="search"
                                @keypress.enter="findDestinations()"/>
                                <DestinationSearchResult v-if="destinationSearchResults !== null"
                                    @close-search-results="{destinationSearchResults = null; destinationKeyword = null}"
                                    @choose-destination="chooseDestination"
                                    :destination-search-results="destinationSearchResults" />
                            </span>
                            <span v-if="chosenDestination !== null && chosenDestination !== undefined">
                                <DestinationMini :destination="chosenDestination" />
                            </span>
                        </div>
                    </div>

                    <div class="my-4 flex">
                        <p class="p-4">
                            Add a description: 
                        </p>
                        <textarea v-model="description" class="px-4 py-2 flex border-b-2 border-dark-blue resize-none rounded-lg w-3/4 h-min shadow-inner focus:outline-none"></textarea>
                    </div>
                </div>
                
                <div class="absolute right-4">
                    <span class="p-2 w-fit h-fit" @click="showVisibilityOptions = !showVisibilityOptions">
                        <i class="fa fa-unlock" v-if="visibility === 'PUBLIC'"/>
                        <i class="fa fa-lock"  v-if="visibility === 'PRIVATE'"/>
                        <i class="fa fa-file"  v-if="visibility === 'DRAFT'"/>
                        <i class="fa fa-users"  v-if="visibility === 'FRIEND_ONLY'"/>

                        <div v-if="showVisibilityOptions" class="absolute top-8 right-6">
                            <ul class="bg-gray-50 overflow-hidden rounded-md shadow-md w-max">
                                <li class="border-b p-2 w-full" @click="visibility = 'PUBLIC'" :class="{
                                    'bg-gray-100': visibility === 'PUBLIC'
                                }">
                                    Public
                                </li>
                                <li class="border-b p-2 w-full" @click="visibility = 'PRIVATE'" :class="{
                                    'bg-gray-100': visibility === 'PRIVATE'
                                }">
                                    Private
                                </li>
                                <li class="border-b p-2 w-full" @click="visibility = 'FRIEND_ONLY'" :class="{
                                    'bg-gray-100': visibility === 'FRIEND_ONLY'
                                }">
                                    Friends only
                                </li>
                                <li class="p-2 w-full" @click="visibility = 'DRAFT'" :class="{
                                    'bg-gray-100': visibility === 'DRAFT'
                                }">
                                    Draft
                                </li>
                            </ul>
                        </div>
                    </span>

                    <span class="p-2" @click="creatorOpen = false">
                        x
                    </span>

                </div>

            </div>

            <div class="flex creator" :class="{
                'visible': creatorOpen
            }">
                <!-- Journey picture  -->
                <div class="w-1/3 h-fit p-2 relative">
                    <div class="text-center p-2 font-heebo font-bold text-lg">
                        Add pictures from your journey
                    </div>
                    <input type="file"
                     @change="handleFileUpload"
                     accept="image/png, image/jpeg"
                     multiple
                     class="p-10" />
                    <!-- <button class="p-2 bg-pthalo rounded-full" @click="uploadImages">
                        Upload
                    </button> -->
                </div>

                <!-- Activity adder -->
                <div class="w-2/3 h-fit p-2 relative">
                    <div class="">
                        <ActivityAdder @add-activity="addActivity" :activities="activities" />
                    </div>
                </div>    
            </div>
            
        </div>

        <button v-if="canBePosted"
        class="bg-fawn absolute bottom-4 left-4 p-6 text-lg rounded-full font-heebo font-bold text-white hover:text-gray-100 duration-300"
        @click="postJourney({
            id: journeyId, 
            startDate, 
            endDate, 
            destinationId: chosenDestination.id, 
            description, activities, 
            visibility, 
            images: imageFilenames
            })">
            Post journey
        </button>
    </div>
    
</template>

<style scoped>
    .bg-fawn:hover {
        background-color: var(--peach);
    }

    .open {
        transform: scaleY(100%);
        transition: all 0.7s ease-in-out;
    }

    .visible {
        opacity: 100%;
        transition: all 0.5s ease-in-out;
        transition-delay: 0.5s;
    }

    .creator-container:not(.open) {
        transform: scaleY(0%);
    }

    .creator:not(.visible) {
        opacity: 0;
    }

    .border-dark-blue:focus {
        border-color: var(--asparagus);
    }

    input::file-selector-button {
        border-radius: 12px;
        padding: 5px 8px;
        border: 1px;
    }
</style>