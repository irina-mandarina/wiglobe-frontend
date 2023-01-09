<script setup>
    import { getUserDetails } from '~~/js/userRequests'
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { useRoute } from 'vue-router'
    import { getJourneysByUser } from '~~/js/journeyRequests'
    import { deleteFollowRequest, sendFollowRequest, unfollow, getFollowers, getFollowing, getFriends } from '~~/js/followRequests'

    const userStore = useUserStore()
    const followStore = useFollowStore()
    const route = useRoute()
    const user = ref(null)

    let followers = ref(null)
    let following = ref(null)
    let friends = ref(null)
    let journeys = ref(null)

    let followerCount = computed(() => {
        if (followers.value === null)
            return 0
        else
            return followers.value.length
    })
    let followingCount = computed(() => {
        if (following.value === null)
            return 0
        else
            return following.value.length
    })
    
    let friendCount = computed(() => {
        if (friends.value === null)
            return 0
        else
            return friends.value.length
    })

    let followersListOpen = ref(false)
    let followingListOpen = ref(false)
    let isFollowing = ref(false)
    let startAnimation = ref(false)

    onBeforeMount(async () => {
        if (route.params.username === userStore.getLocalStorageUsername()) {
            navigateTo('/profile/me')
        }
        try {
            const response = await getUserDetails(route.params.username)
            user.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        getFollows()
        getJourneys()

        followStore.getFollowing()
        for (let i = 0; i < followStore.following.length; i++) {
            if (followStore.following[i].username === user.value.username) {
                isFollowing.value = true
            }
        }
    })
    
    onMounted(() => {
        startAnimation.value = true
    })

    async function getJourneys() {
        try {
            const response = await getJourneysByUser(user.value.username)
            journeys.value = response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function getFollows() {
        try {
            const response = await getFollowers(user.value.username)
            followers.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        try {
            const response = await getFollowing(user.value.username)
            following.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        try {
            const response = await getFriends(user.value.username)
            friends.value = response.data
        }
        catch (error) {
            console.log(error)
        }
    }

    async function follow() {
        try {
            const response = await sendFollowRequest(user.value.username)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function cancelRequest() {
        try {
            const response = await deleteFollowRequest(user.value.username)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    async function unfollow1() {
        try {
            const response = await unfollow(user.value.username) 
        }
        catch (error) {
            console.log(error)
        }
    }
</script>

<template>
    <NuxtLayout name="default" v-if="user!== null">

        <!-- header -->
        <div class="w-full h-1/2 absolute header-picture">
            <div class="relative w-full h-full">
                <div class="absolute gradient bottom-0 h-1/3 w-full">
                </div>
            </div>
        </div>

        <!-- profile picture -->
        <img class="z-100 w-1/6 p-8 mx-auto mt-20" src="https://picsum.photos/400" alt="">

        <!-- names -->
        <NuxtLink :to="'/profile/' + user.username" class="z-100 mx-auto w-fit px-4 text-3xl font-heebo font-bold text-center tracking-wide">
            <p>{{ user.firstName }} {{ user.lastName }}</p>
            <p class="text-2xl p-4 font-metrophobic">@{{ user.username }}</p>
        </NuxtLink> 

        <!-- bio -->
        <p class="text-center mx-auto my-8 px-20 text-xl text-phtalo font-droid">
            {{ user.biography }}
        </p>

        
        <div class="flex w-full text-center">
            <button v-if="isFollowing" class="p-4 mx-auto rounded-full bg-fawn duration-300 hover:shadow-lg" @click="unfollow1()">
                Unfollow
            </button>
            <button v-if="!isFollowing" class="p-4 mx-auto rounded-full bg-fawn duration-300 hover:shadow-lg" @click="follow()">
                Follow
            </button>
        </div>

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
                    
                    <p v-if="user.gender === 'OTHER'" class="text-center p-6">
                        They / Them
                        <i class="fa fa-user" />
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
                <div class="bg-white hover-border-asparagus border-0 border-b-4 duration-300 my-2 p-4 rounded-lg" @click="followersListOpen = !followersListOpen">
                    Followers: {{ followerCount }}
                </div>
                
                <div class="bg-white hover-border-asparagus border-0 border-b-4 duration-300 my-2 p-4 rounded-lg" @click="followingListOpen = !followingListOpen">
                    Following: {{ followingCount }}
                </div>
                <div class="bg-white">
                    <p class="hover-border-asparagus border-0 border-b-4 duration-300 my-2 p-4 rounded-lg">
                        Friends
                    </p>
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
                <p class="font-droid text-brown"> Followers: {{ followerCount }}</p>
                <div v-for="follower in followers" @click="navigateTo('/profile/'+follower.username)" class="w-full flex my-4 shadow-inner bg-white rounded-full w-full">
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
                <p class="font-droid text-brown"> Followed by {{ user.firstName }}: {{ followingCount }}</p>
                <div v-for="followed in following" @click="navigateTo('/profile/'+followed.username)" class="w-full flex my-4 shadow-inner bg-white rounded-full overflow-hidden">
                    <div class="p-4 float-left">@{{ followed.username }}</div>
                    <div class="p-4 float-right">{{ followed.firstName }} {{ followed.lastName }}</div>
                </div>
                <div v-if="followingCount === 0" class="text-center py-16">
                    You haven't followed anyone
                </div>
            </div>
        </div>

        <!-- journeys -->
        <div class="my-20">
            <div class="text-center text-2xl font-droid">{{ user.firstName}}'s journeys</div>
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

    .hover-border-asparagus:hover {
        border-bottom: 4px solid var(--khaki);
    }

    .bg-fawn:hover {
        background-color: var(--peach);
    }
</style>