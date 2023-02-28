<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useJourneyStore } from '~~/stores/JourneyStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { unfollow } from '~~/js/followRequests'
    import { editGender, editBirthdate, editResidence, editBio } from '~~/js/userRequests'

    const userStore = useUserStore()
    const journeyStore = useJourneyStore()
    const followStore = useFollowStore()

    onBeforeMount(async () => {
        await journeyStore.getLoggedUserJourneys()
    })

    let startAnimation = ref(false)

    onMounted(() => {
        startAnimation.value = true
    })

    const username = computed(() => userStore.username)
    const firstName = computed(() => userStore.firstName)
    const lastName = computed(() => userStore.lastName)
    const gender = computed(() => userStore.gender)
    const registrationTimestamp = computed(() => userStore.registrationTimestamp)
    const birthdate = computed(() => userStore.birthdate)
    const biography = computed(() => userStore.biography)
    const residence = computed(() => userStore.residence)
    const profilePrivacy = computed(() => userStore.profilePrivacy)

    const followers = computed(() => followStore.followers)
    const following = computed(() => followStore.following)
    const friends = computed(() => followStore.friends)

    let journeys = computed(() => journeyStore.loggedUserJourneys)
    
    let editMode = ref(false)
    let newBirthdate = ref(null)
    let newGender = ref(null)
    let newBio = ref(biography.value)
    let newResidence = ref(null)

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

        }
    }

    async function changeGender() {
        try {
            await editGender(newGender.value)
        }
        catch (error) {

        }
    }

    async function changeResidence() {
        try {
            await editResidence(newResidence.value)
        }        
        catch (error) {
            
        }
    }

    async function changeBiography() {
        try {
            await editBio(newBio.value)
        }        
        catch (error) {
            
        }
    }

    function setNewBirthdate(val) {
        newBirthdate.value = val
    }

    function setNewGender(val) {
        newGender.value = val
    }

    function setNewResidence(val) {
        console.log('set dest : ' + val)
        newResidence.value = val
    }

    async function toggleEditMode() {
        if (editMode.value) {
            if (newGender.value !== null && gender.value !== newGender.value) {
                console.log("new gen")
                await changeGender()
            }
            if (newResidence.value !== null && residence.value?.id !== residence.value?.id) {
                console.log("new res")
                await changeResidence()
            }
            if (newBirthdate.value !== null && birthdate.value !== newBirthdate.value) {
                console.log("new birt")
                await changeBirthdate()
            }
            if (newBio.value !== null && biography.value !== newBio.value) {
                console.log("new bio")
                await changeBiography()
            }
            await userStore.init()
        }
        editMode.value = !editMode.value
    }
</script>

<template>
    <NuxtLayout name="default">

        <!-- edit profile button -->
        <button @click="toggleEditMode()" class="absolute m-6 bg-asparagus rounded-full shadow-inner">
            <span v-if="editMode" class="p-2 text-xl text-white font-heebo">
                Save changes
            </span>
            <i v-else class="fa fa-gear text-4xl py-2 px-3 hover:text-gray-700 duration-500 hover:rotate-180" />
        </button>

        <!-- header -->
        <div class="w-full h-1/2 absolute header-picture"
            :class="{
                'expand': startAnimation
            }">
            <div class="relative w-full h-full">
                <div class="absolute gradient bottom-0 h-1/3 w-full">
                </div>
            </div>
        </div>

        <!-- profile picture -->
        <img class="z-100 w-1/6 p-8 mx-auto mt-20" src="https://picsum.photos/400" alt="">

        <!-- names -->
        <div class="z-100 mx-auto w-fit px-4 text-3xl font-heebo font-bold text-center tracking-wide">
            <p>{{ firstName }} {{ lastName }}</p>
            <p class="text-2xl p-4 font-metrophobic">@{{ username }}</p>
        </div> 

        <!-- bio -->
        <p v-if="!editMode" class="text-center mx-auto my-8 px-20 text-xl text-phtalo font-droid">
            {{ biography }}
        </p>
        <input v-else  class="rounded-full border-b bg-white mx-auto p-2 text-center w-fit flex focus:outline-none focus:border-slate-500" placeholder="Something about you" v-model="newBio"/>

        <div class="w-full flex h-max relative">
            <!-- details -->
            <div class="mx-auto flex flex-wrap w-1/2 my-6 p-6">

                <!-- gender and pronouns -->
                <DetailBox class="delay-[1500ms] details-box" 
                v-if="gender?.length || editMode" :detail="gender" detailType="gender" :editMode="editMode"
                @save="setNewGender" 
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- birthday and age -->
                <DetailBox v-if="birthdate || editMode" class="delay-[1500ms] details-box"
                :detail="birthdate" detailType="birthdate" :editMode="editMode"
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
             <FollowList :followers="followers" :following="following" :friends="friends" :username="username" @unfollowUser="unfollowUser" />
        </div>

        <!-- journeys -->
        <div class="my-20">
            <div class="text-center text-2xl font-droid">Your journeys</div>
            <Journey v-for="journey in journeys" :journey="journey" class="my-10"/>
        </div>

    </NuxtLayout>
</template>

<style scoped>
    .header-picture {
        background-image: url("https://picsum.photos/2500");
        background-size: cover;
        z-index: -1;
    }

    .gradient {
        background: linear-gradient(#ffffff00, #ffffff);
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