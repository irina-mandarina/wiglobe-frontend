<script setup>
    import { getUserDetails } from '~~/js/userRequests'
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { useRoute } from 'vue-router'
    import { getLocalStorageUsername } from '~~/js/localStorageUtil'
    import { getJourneysByUser } from '~~/js/journeyRequests'
    import { deleteFollowRequest, sendFollowRequest, unfollow, getFollowers, getFollowing, getFriends, respondToFollowRequest } from '~~/js/followRequests'

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
    let isFollowedByLoggedUser = ref(false)
    let hasReceivedAFollowReq = ref(false)
    let hasSentAFollowReq = ref(false)
    let startAnimation = ref(false)

    let isFollowedOrPublic = ref(false)

    function setFollowRelationships() {
        isFollowedByLoggedUser.value = (followStore.following.filter ((it) =>
                it.username === user.value.username
            ).length !== 0)

        hasReceivedAFollowReq.value = (followStore.sentFollowRequests.filter((it) =>
                it.receiver.username === user.value.username
            ).length !== 0)

        hasSentAFollowReq.value = (followStore.receivedFollowRequests.filter((it) =>
                it.requester.username === user.value.username
            ).length !== 0)

        isFollowedOrPublic.value = (isFollowedByLoggedUser.value || user.profilePrivacy === "PUBLIC")
    }

    onBeforeMount(async () => {
        await userStore.init()
        if (route.params.username === getLocalStorageUsername()) {
            navigateTo('/profile/me')
        }
        try {
            const response = await getUserDetails(route.params.username)
            user.value = response.data
        }
        catch (error) {
            console.log(error)
        }
        await followStore.init()
        getFollows()
        getJourneys()
        setFollowRelationships()

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
        setFollowRelationships()
    }

    async function follow() {
        try {
            const response = await sendFollowRequest(user.value.username)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
        await followStore.getReceivedFollowRequests()
        setFollowRelationships()
    }

    async function cancelRequest() {
        try {
            const response = await deleteFollowRequest(user.value.username)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
        await followStore.getReceivedFollowRequests()
        setFollowRelationships()
    }

    async function unfollowUser() {
        try {
            const response = await unfollow(user.value.username) 
        }
        catch (error) {
            console.log(error)
        }
        await followStore.getFollowers()
        setFollowRelationships()
    }

    async function respondWith(requester, isApproved) {
        try {
            const response = await respondToFollowRequest(requester, isApproved)
            followStore.getReceivedFollowRequests()
        }
        catch (error) {
            console.log(error)
        }
        await followStore.getFollowing()
        setFollowRelationships()
    }

    let friendPage = ref(1)
    function nextFriendPage() {
        if (friendPage.value === friendCount.value / 2) {
            friendPage.value = 1
        }
        else {
            friendPage.value ++
        }
    }

    function prevFriendPage() {
        if (friendPage.value === 1) {
            friendPage.value = friendCount.value / 2
        }
        else {
            friendPage.value --
        }
    }
</script>

<template>
    <NuxtLayout name="default" v-if="user !== null">

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

        
        <div class="flex w-1/2 mx-auto text-center">
            <button v-if="isFollowedByLoggedUser" class="p-4 mx-auto rounded-full bg-fawn duration-300 hover:shadow-lg" @click="unfollowUser()">
                Unfollow
            </button>
            <button v-if="!isFollowedByLoggedUser && !hasReceivedAFollowReq" class="p-4 mx-auto rounded-full bg-fawn duration-300 hover:shadow-lg" @click="follow()">
                Follow
            </button>
            <button v-if="hasReceivedAFollowReq" class="p-4 mx-auto rounded-full bg-fawn duration-300 hover:shadow-lg" @click="cancelRequest()">
                Cancel follow request
            </button>
            <button v-if="hasSentAFollowReq" class="p-4 mx-auto rounded-full bg-fawn duration-300 hover:shadow-lg" @click="respondWith(user.username, true)">
                Approve follow request
            </button>
            
        </div>

        <div class="w-full flex h-max relative">
            <!-- details -->
            <div class="mx-auto flex flex-wrap w-1/2 my-6 p-6">

                <!-- gender and pronouns -->
                <DetailBox class="delay-[1500ms] details-box" 
                v-if="user?.gender?.length" :detail="user?.gender" detailType="gender" :editMode="false"
                @save="setNewGender" 
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- birthday and age -->
                <DetailBox v-if="user?.birthdate" class="delay-[1500ms] details-box"
                :detail="user?.birthdate" detailType="birthdate" :editMode="false"
                @save="setNewBirthdate" 
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- location -->
                <DetailBox v-if="user?.residence" class="delay-[1700ms] details-box"
                :detail="user?.residence" detailType="residence" :editMode="false"
                @save="setNewResidence" 
                :class="{
                    'slide-up': startAnimation
                }"/>

                <!-- joined on -->
                <DetailBox v-if="user?.registrationTimestamp" class="delay-[2000ms] details-box"
                :detail="user?.registrationTimestamp" detailType="registrationTimestamp" :editMode="false"
                :class="{
                    'slide-up': startAnimation
                }"/>

            </div>
            <!-- end of details -->

             <!-- follow -->
             <FollowList :followers="followers" :following="following" :friends="friends" :username="user?.username" @unfollowUser="unfollowUser" />
        </div>
        
        <div v-if="followersListOpen && isFollowedOrPublic" class="absolute top-40 w-full overflow-hidden h-full">
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
        
        <div v-if="followingListOpen && isFollowedOrPublic" class="absolute top-40 w-full overflow-hidden h-full">
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
        <div v-if="isFollowedOrPublic" class="my-20">
            <div class="text-center text-2xl font-droid">{{ user.firstName}}'s journeys</div>
            <Journey v-for="journey in journeys" :journey="journey" class="my-10"/>
        </div>

        <div v-if="hasReceivedAFollowReq" class="text-center text-2xl py-10 font-droid">
            You have sent {{ user.firstName }} a follow request
        </div>

        <div v-else class="text-center text-2xl py-10 font-droid">
            Follow {{ user.firstName }} to see their journeys
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