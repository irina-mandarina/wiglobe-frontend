<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useJourneyStore } from '~~/stores/JourneyStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { unfollow } from '~~/js/followRequests'
    import { editGender, editBirthdate, editResidence, editBio, editProfilePicture, editBackgroundPicture } from '~~/js/userRequests'
    import axios from "axios"
    import { getProfilePicturePath, getBackgroundPicturePath } from '~~/js/userPictures'

    const userStore = useUserStore()
    const journeyStore = useJourneyStore()
    const followStore = useFollowStore()

    let startAnimation = ref(false)

    const username = computed(() => userStore.username)
    const firstName = computed(() => userStore.firstName)
    const lastName = computed(() => userStore.lastName)
    const gender = computed(() => userStore.gender)
    const registrationTimestamp = computed(() => userStore.registrationTimestamp)
    const birthdate = computed(() => userStore.birthdate)
    const biography = computed(() => userStore.biography)
    const residence = computed(() => userStore.residence)
    const profilePrivacy = computed(() => userStore.profilePrivacy)
    let profilePicture = computed(() => userStore.profilePicture)
    let backgroundPicture = computed(() => userStore.backgroundPicture)

    let profilePicturePath = computed( () => getProfilePicturePath(profilePicture.value, gender.value))

    let backgroundPicturePath = computed(() => getBackgroundPicturePath(backgroundPicture.val))

    const followers = computed(() => followStore.followers)
    const following = computed(() => followStore.following)
    const friends = computed(() => followStore.friends)

    let journeys = computed(() => journeyStore.loggedUserJourneys)
    
    let editMode = ref(false)
    let newBirthdate = ref(null)
    let newGender = ref(null)
    let newBio = ref(biography.value)
    let newResidence = ref(null)
    let newProfilePicture = ref(null)
    let newBackgroundPicture = ref(null)
    
    onBeforeMount(async () => {
        await journeyStore.getLoggedUserJourneys()
    })

    onMounted(() => {
        startAnimation.value = true
    })


    async function unfollowUser(username) {
        try {
            await unfollow(username)
        }
        catch (error) {
            console.log(error)
        }
        await followStore.getFollowing()
    }

    async function changeBirthdate(){
        try {
            await editBirthdate(newBirthdate.value)
        }
        catch (error) {
            console.warn(error)
        }
    }

    async function changeGender() {
        try {
            await editGender(newGender.value)
        }
        catch (error) {
            console.warn(error)

        }
    }

    async function changeResidence() {
        try {
            await editResidence(newResidence.value)
        }        
        catch (error) {
            console.warn(error)
            
        }
    }

    async function changeBiography() {
        try {
            await editBio(newBio.value)
        }        
        catch (error) {
            console.warn(error)
            
        }
    }

    async function changeProfilePicture() {
        const response = await axios.post('/api/users/profile-picture/upload', 
            newProfilePicture.value, 
            {
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            }
        )
        .then(async response => {
            console.log(response)  
            await editProfilePicture(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    async function changeBackgroundPicture() {
        const response = await axios.post('/api/users/background-picture/upload', 
            newBackgroundPicture.value, 
            {
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            }
        )
        .then(async response => {
            console.log(response)  
            await editBackgroundPicture(response.data)
        })
        .catch(error => {
            console.log(error)
        })
    }

    function setNewBirthdate(val) {
        newBirthdate.value = val
    }

    function setNewGender(val) {
        newGender.value = val
    }

    function setNewResidence(val) {
        newResidence.value = val
    }

    async function toggleEditMode() {
        debugger
        if (editMode.value) {
            if (newGender.value !== null && gender.value !== newGender.value) {
                await changeGender()
            }
            if (newResidence.value !== null && residence.value?.id !== residence.value?.id) {
                await changeResidence()
            }
            if (newBirthdate.value !== null && birthdate.value !== newBirthdate.value) {
                await changeBirthdate()
            }
            if (newBio.value !== null && biography.value !== newBio.value) {
                await changeBiography()
            }
            if (newProfilePicture.value !== null) {
                await changeProfilePicture()
            }
            if (newBackgroundPicture.value !== null) {
                await changeBackgroundPicture()
            }
            await userStore.init()
        }
        editMode.value = !editMode.value
    }

    async function handleFileUpload(event) {
        newProfilePicture.value = event.target.files[0]
    }
</script>

<template>
    <NuxtLayout name="default" class="bg-white">

        <!-- edit profile button -->
        <button @click="toggleEditMode()" 
        class="absolute z-100 m-6 bg-asparagus rounded-full shadow-inner">
            <span v-if="editMode" class="p-2 text-xl text-white font-heebo">
                Save changes
            </span>
            <i v-else class="fa fa-gear text-4xl py-2 px-3 hover:text-gray-700 duration-500 hover:rotate-180" />
        </button>

        <!-- header -->
        <div class="w-full z-50 h-[300px] absolute header-picture"
        :style="{ 'background-image': 'url(' + backgroundPicturePath +  ')' }"
        :class="{
            'expand': startAnimation
        }">
            <div class="relative w-full h-full">
                <div class="absolute gradient bottom-0 h-1/3 w-full">
                </div>
            </div>
        </div>
        
        <!-- profile picture -->
        <div class="z-100 mx-auto relative bg-slate-100 w-1/12">
            <img 
            class="w-full h-full mx-auto mt-20 block" 
            :src="profilePicturePath" 
            alt="Profile picture" 
            referrerpolicy="no-referrer">
            <i v-if="editMode" class="fa fa-pen absolute top-0 right-0 p-2 bg-white rounded-bl-xl" />
            <input v-if="editMode" type="file" @change="handleFileUpload" class="opacity-0 absolute top-0 right-0 w-full h-full" />
        </div>

        <!-- names -->
        <div class="z-50 mx-auto w-full p-4 text-3xl font-heebo font-bold text-center absolute tracking-wide">
            <p class="z-50">
                {{ firstName }} {{ lastName }}
            </p>
            <p class="text-2xl p-4 font-metrophobic">@{{ username }}</p>
        </div> 

        <!-- bio -->
        <p v-if="!editMode" class="text-center mx-auto py-8 bg-white px-20 bg-transparent text-xl text-phtalo font-droid">
            {{ biography }}
        </p>
        <input v-else 
        class="rounded-full border-b bg-white mx-auto p-2 text-center w-fit flex focus:outline-none focus:border-slate-500" 
        placeholder="Something about you" v-model="newBio" />

        <div class="w-full flex h-max relative bg-white mt-20">
            <!-- details -->
            <div class="mx-auto flex flex-wrap w-1/2 mb-10 p-6">

                <!-- gender and pronouns -->
                <DetailBox class="delay-[1500ms] details-box" 
                v-if="gender?.length || editMode" :detail="gender" detailType="gender" :editMode="editMode"
                @save="setNewGender" 
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- birthday and age -->
                <DetailBox 
                v-if="birthdate || editMode" 
                class="delay-[1500ms] details-box"
                :detail="birthdate" 
                detailType="birthdate" 
                :editMode="editMode"
                @save="setNewBirthdate" 
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- location -->
                <DetailBox v-if="residence || editMode" class="delay-[1700ms] details-box"
                :detail="residence" detailType="residence" :editMode="editMode"
                @save="setNewResidence" 
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- joined on -->
                <DetailBox v-if="registrationTimestamp" class="delay-[2000ms] details-box"
                :detail="registrationTimestamp" detailType="registrationTimestamp" :editMode="editMode"
                :class="{
                    'slide-up': startAnimation
                }"/>

            </div>
            <!-- end of details -->

             <!-- follow -->
             <FollowList :followers="followers" :following="following" :friends="friends" :username="username" 
             @unfollowUser="unfollowUser" />
        </div>

        <!-- journeys -->
        <div class="my-20 bg-slate-300">
            <div class="text-center text-2xl font-droid py-8">Your journeys</div>
            <Journey v-for="journey in journeys" :journey="journey" class="my-10"/>
        </div>

    </NuxtLayout>
</template>

<style scoped>
    .header-picture {
        background-size: cover;
        z-index: 20;
    }

    .gradient {
        background: linear-gradient(#ffffff00, #ffffff);
    }

    .z-100 {
        z-index: 100;
    }

    .expand {
        transform: scaleY(100%);
        transition: all 1s ease-in-out;
        transition-delay: 1s;
        transform-origin: 50% 100%;
    }

    .header-picture:not(.expand) {
        transform: scaleY(0%);
    }

    .details-box:not(.slide-up) {
        transform: translateY(200%);
    }

    .slide-up {
        transform: translateY(0%);
        transition: all 1s ease-in-out;
    }

    .hover-border-asparagus:hover {
        border-bottom: 4px solid var(--khaki);
    }
</style>