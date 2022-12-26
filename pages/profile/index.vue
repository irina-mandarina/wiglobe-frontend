<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { useJourneyStore } from '~~/stores/JourneyStore'
    import { useFollowStore } from '~~/stores/FollowStore'

    const userStore = useUserStore()
    const journeyStore = useJourneyStore()
    const followStore = useFollowStore()

    const user = computed(() => userStore.user)
    let journeys = computed(() => journeyStore.loggedUserJourneys)
    const followers = computed(() => followStore.followers)
    const following = computed(() => followStore.following)
    const friends = computed(() => followStore.followers)
    let followersListOpen = ref(false)
    let followingListOpen = ref(false)
    let startAnimation = ref(false)
    let editMode = ref(false)

    definePageMeta({
        middleware: 'prepare-user-store'
    })

    onBeforeMount(async () => {
        journeyStore.getJourneysByLogged()
        followStore.getFollowers()
        followStore.getFollowing()
        followStore.getFriends()
    })

    onMounted(() => {
        startAnimation.value = true
        console.log(startAnimation.value)
    })

    async function unfollow(username) {
        try {
            const response = await unfollow(username)
        }
        catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <NuxtLayout name="default">

        <!-- edit profile button -->
        <button @click="editMode = !editMode" class="absolute m-6 bg-asparagus rounded-full shadow-inner">
            <i class="fa fa-gear text-4xl py-2 px-3 hover:text-gray-700 duration-500 hover:rotate-180" />
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
            <p>{{ user.firstName }} {{ user.lastName }}</p>
            <p class="text-2xl p-4 font-metrophobic">@{{ user.username }}</p>
        </div> 

        <!-- bio -->
        <p class="text-center mx-auto my-8 px-20 text-xl text-phtalo font-droid">
            {{ user.biography }}
        </p>

        <div class="w-full flex h-max relative">
            <!-- details -->
            <div class="mx-auto flex flex-wrap w-1/2 my-6 p-6">

                <!-- gender and pronouns -->
                <div class="rounded-2xl my-4 shadow-lg w-3/4 mx-auto border-khaki border-2 text-center delay-[1000ms] details-box bg-white overflow-hidden"
                    :class="{
                        'slide-up': startAnimation
                    }">
                    <p v-if="user.gender === 'FEMALE'" class="text-center p-6">
                        She / Her
                        <i class="fa fa-female" />
                    </p>
                    
                    <p v-if="user.gender === 'MALE'" class="text-center p-6">
                        He / Him
                        <i class="fa fa-male" />
                    </p>
                </div>

                <!-- birthday and age -->
                <div class="rounded-2xl my-4 shadow-lg w-3/4 mx-auto border-khaki border-2 text-center delay-[1500ms] details-box bg-white overflow-hidden"
                    :class="{
                        'slide-up': startAnimation
                    }">
                    <p class="text-center p-6">
                        Born on {{ new Date(user.birthdate).toDateString() }}
                        <br />
                        {{ parseInt(( new Date().getTime() - new Date(user.birthdate).getTime()) / (1000*60*60*24*365)) }} years old
                    </p>
                </div>

                <!-- location -->
                <div class="rounded-2xl my-4 mx-auto shadow-lg w-3/4 border-khaki border-2 text-center delay-[2000ms] details-box bg-white overflow-hidden"
                    :class="{
                        'slide-up': startAnimation
                    }">
                    <p class="text-center p-6">
                        City, Country
                    </p>
                </div>

                <!-- joined on -->
                <div class="rounded-2xl my-4 mx-auto shadow-lg w-3/4 border-khaki border-2 text-center delay-[2500ms] details-box bg-white overflow-hidden"
                    :class="{
                        'slide-up': startAnimation
                    }">
                    <p class="text-center p-6">
                        Joined NAME on
                        <br />
                        {{ new Date(user.registrationDate).toDateString() }}
                    </p>
                </div>

            </div>
             <!-- end of details -->

             <!-- follow -->
             <div class="w-1/2 overflow-hidden my-6 text-lg p-6">
                <div class="bg-white hover-bg-asparagus duration-300 my-2 p-4 rounded-lg" @click="followersListOpen = !followersListOpen">
                    Followers: {{ 0 || followers.length }}
                </div>
                
                <div class="bg-white hover-bg-asparagus duration-300 my-2 p-4 rounded-lg" @click="followingListOpen = !followingListOpen">
                    Following: {{ 0 || following.length }}
                </div>
                <div>
                    <p>Friends</p>
                    <div class="flex flex-wrap w-max">
                        <UserDetails class="w-40 m-4" v-for="friend in friends" v-if="friends !== null && friends !== undefined" :user="friend" />
                    </div>
                </div>
             </div>
        </div>
        
        <div v-if="followersListOpen" class="absolute top-40 w-full overflow-hidden h-full">
            <div class="bg-peach w-1/2 h-3/4 mx-auto p-6 rounded-lg shadow-xl overflow-hidden overflow-y-scroll">
                <span class="float-right hover:text-red-700 hover:font-bold duration-300 " @click="followersListOpen = false">
                    x
                </span>
                <p class="font-droid text-brown"> Followers: {{ followers.length }}</p>
                <div v-for="follower in followers" class="w-full flex my-4 shadow-inner bg-white rounded-full w-full">
                    <div class="p-4 float-left">@{{ follower.username }}</div>
                    <div class="p-4 float-right">{{ follower.firstName }} {{ follower.lastName }}</div>
                </div>
            </div>
        </div>
        
        <div v-if="followingListOpen" class="absolute top-40 w-full overflow-hidden h-full">
            <div class="bg-peach w-1/2 h-3/4 mx-auto p-6 rounded-lg shadow-xl overflow-hidden overflow-y-scroll">
                <span class="float-right hover:text-red-700 hover:font-bold duration-300 " @click="followingListOpen = false">
                    x
                </span>
                <p class="font-droid text-brown"> Followed by you: {{ following.length }}</p>
                <div v-for="followed in following" class="w-full flex my-4 shadow-inner bg-white rounded-full w-full">
                    <div class="p-4 float-left">@{{ followed.username }}</div>
                    <div class="p-4 float-right">{{ followed.firstName }} {{ followed.lastName }}</div>
                    <button class="hover:bg-gray-200 bg-white p-4" @click="unfollow(followed.username)">
                        Unfollow
                    </button>
                </div>
                <div v-if="following.length === 0" class="text-center py-16">
                    You haven't followed anyone
                </div>
            </div>
        </div>

        <!-- journeys -->
        <div class="my-20">
            <div class="text-center text-2xl font-droid">Your journeys</div>
            <Journey v-for="journey in journeys" :journey="journey" />
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
/* 
    .edit-button:hover:after {
        content: "edit profile";
        border-radius: 100%;
        padding: 2rem;
        background-color: var(--fawn);
    } */

    .hover-bg-asparagus:hover {
        background-color: var(--khaki);
    }
</style>