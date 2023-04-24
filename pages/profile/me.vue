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

    let profilePicturePath = computed( () =>
        getProfilePicturePath(profilePicture.value, gender.value)
    )

    let backgroundPicturePath = computed(() =>
        getBackgroundPicturePath(backgroundPicture.value)
    )

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
        if (editMode.value) {
            if (newGender.value !== null && gender.value !== newGender.value) {
                await userStore.changeGender(newGender.value)
            }
            if (newResidence.value !== null && residence.value?.id !== newResidence.value?.id) {
                debugger
                await userStore.changeResidence(newResidence.value?.id)
            }
            if (newBirthdate.value !== null && birthdate.value !== newBirthdate.value) {
                await userStore.changeBirthdate(newBirthdate.value)
            }
            if (newBio.value !== null && biography.value !== newBio.value) {
                await userStore.changeBiography(newBio.value)
            }
            if (newProfilePicture.value !== null) {
                await userStore.changeProfilePicture(newProfilePicture.value)
            }
            if (newBackgroundPicture.value !== null) {
                await userStore.changeBackgroundPicture(newBackgroundPicture.value)
            }
        }
        editMode.value = !editMode.value
    }

    function handleProfilePictureUpload(event) {
        newProfilePicture.value = event.target.files[0]
    }

    function handleBackgroundPictureUpload(event) {
        newBackgroundPicture.value = event.target.files[0]
    }

</script>

<template>
    <NuxtLayout name="default" class="bg-white">

        <!-- edit profile button -->
        <button @click="toggleEditMode()"
        class="absolute z-100 m-6 p-2 bg-asparagus rounded-full shadow-inner">
            <span v-if="editMode"
            class="p-2 text-xl text-white font-heebo">
                Save changes
            </span>
            <i v-else
           class="fa fa-gear text-xl py-1 px-2 hover:text-gray-700 duration-500 hover:rotate-180" />
        </button>

        <!-- header -->
        <div class="w-full h-1/3 duration-300 bg-cover shadow-lg relative"
        :style="{ 'background-image': 'url(' + backgroundPicturePath +  ')' }"
        :class="{
            'opacity-1': startAnimation,
            'opacity-0': !startAnimation,
        }">
            <div class="absolute top-0 right-0 w-full">
                <i v-if="editMode"
               class="fa fa-pen p-2 bg-white rounded-bl-xl float-right cursor-pointer" />

                <input v-if="editMode"
               type="file"
               accept="image/png, image/jpeg"
               @change="handleBackgroundPictureUpload"
               class="focus:outline-none border-0 opacity-0 cursor-pointer absolute top-0 right-0" />
            </div>

            <!-- filler-->
            <div class="h-5/6"></div>

            <!-- profile picture-->
            <div
            class="relative h-1/6 mx-auto w-[10%]">
                <img :src="profilePicturePath"
                     alt="Profile picture"
                     class="mx-auto w-full max-w-[150px]"
                     referrerpolicy="no-referrer"
                />
                <!--profile picture input-->
                <i v-if="editMode"
                class="fa fa-pen absolute top-0 right-0 p-2 bg-white rounded-bl-xl" />

                <input v-if="editMode"
                type="file"
                accept="image/png, image/jpeg"
                @change="handleProfilePictureUpload"
                class="absolute top-0 right-0 focus:outline-none border-0 opacity-0 w-full h-full cursor-pointer" />
            </div>

        </div>

        <!-- names -->
        <div class="mx-auto w-full mt-20 p-4 text-3xl text-center tracking-wide">
            <p class="font-droid">
                {{ firstName }} {{ lastName }}
            </p>
            <p class="text-2xl p-4 font-metrophobic">
                @{{ username }}
            </p>
        </div>

        <!-- bio -->
        <p v-if="!editMode"
        class="text-center mx-auto py-4 bg-white px-20 bg-transparent text-xl text-phtalo font-droid">
            {{ biography }}
        </p>
        <textarea v-else
        class="rounded-md resize-none border-x-2 mx-auto p-2 text-center w-1/2 bg-slate-200 focus:bg-slate-200 flex focus:outline-none focus:border-slate-500"
        placeholder="Something about you"
        v-model="newBio">
        </textarea>

        <div class="w-full flex h-max relative bg-white">
            <!-- details -->
            <div class="mx-auto flex flex-wrap w-1/2 mb-10 p-6">
                <!-- gender and pronouns -->
                <DetailBox class="delay-[1500ms] details-box" 
                v-if="gender?.length || editMode" :detail="gender"
                detailType="gender"
                :editMode="editMode"
                @set-value="setNewGender"
                :class="{
                    'slide-up': startAnimation
                }" />

                <!-- birthday and age -->
                <DetailBox 
                v-if="birthdate || editMode" 
                class="delay-[1500ms] details-box"
                :detail="birthdate" 
                detailType="birthdate" 
                :editMode="editMode"
                @set-value="setNewBirthdate"
                :class="{
                    'slide-up': startAnimation
                }" />

                <!-- location -->
                <DetailBox v-if="residence || editMode"
                class="delay-[1700ms] details-box"
                :detail="residence"
                detailType="residence"
                :editMode="editMode"
                @set-value="setNewResidence"
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- joined on -->
                <DetailBox v-if="registrationTimestamp"
                class="delay-[2000ms] details-box"
                :detail="registrationTimestamp"
                detailType="registrationTimestamp"
                :editMode="editMode"
                :class="{
                    'slide-up': startAnimation
                }"/>

            </div>
            <!-- end of details -->

             <!-- follow -->
             <FollowList
                :followers="followers"
                :following="following"
                :friends="friends"
                :username="username"
             @unfollowUser="unfollowUser" />
        </div>

        <!-- journeys -->
        <div class="py-20">
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

    .font-bolder {
        font-weight: 900;
    }
</style>