<script setup>
    import { getUserDetails } from '~~/js/userRequests'
    import { useUserStore } from '~~/stores/UserStore'
    import { useFollowStore } from '~~/stores/FollowStore'
    import { useRoute } from 'vue-router'
    import { getLocalStorageUsername } from '~~/js/localStorageUtil'
    import { getJourneysByUser } from '~~/js/journeyRequests'
    import { deleteFollowRequest, sendFollowRequest, unfollow, getFollowers, getFollowing, getFriends, respondToFollowRequest } from '~~/js/followRequests'
    import { getProfilePicturePath } from '~~/js/userPictures'

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
    let isFollowedByLoggedUser = computed(() => (followStore.following.filter ((it) =>
                                            it.username === user.value.username
                                            ).length !== 0))
    let hasReceivedAFollowReq = computed(() => (followStore.sentFollowRequests.filter((it) =>
                                            it.receiver.username === user.value.username
                                            ).length !== 0))
    let hasSentAFollowReq = computed(() => (followStore.receivedFollowRequests.filter((it) =>
                                            it.requester.username === user.value.username
                                            ).length !== 0))
    let startAnimation = ref(false)

    let isFollowedOrPublic = computed(() => (isFollowedByLoggedUser.value || user.value.profilePrivacy === "PUBLIC") )

    // function setFollowRelationships() {
    //     isFollowedByLoggedUser.value = (followStore.following.filter ((it) =>
    //             it.username === user.value.username
    //         ).length !== 0)
    //
    //     hasReceivedAFollowReq.value = (followStore.sentFollowRequests.filter((it) =>
    //             it.receiver.username === user.value.username
    //         ).length !== 0)
    //
    //     hasSentAFollowReq.value = (followStore.receivedFollowRequests.filter((it) =>
    //             it.requester.username === user.value.username
    //         ).length !== 0)
    //
    // }

    onBeforeMount(async () => {
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
        await getFollows()
        await getJourneys()

    })
    
    onMounted(() => {
        startAnimation.value = true
    })

    let profilePicturePath = computed(() => getProfilePicturePath(user?.value?.profilePicture, user?.value?.gender))

    let backgroundPicturePath = computed(() => {
        if (!user.backgroundPicture || user.backgroundPicture.length === 0) {
            return "/_nuxt/assets/wiglobe/images/users/background-pictures/default.jpg"
        }
        else return "/_nuxt/assets/wiglobe/images/users/background-pictures/" + user.backgroundPicture
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
        await followStore.getSentFollowRequests()
        await followStore.getFollowing()
    }

    async function cancelRequest() {
        try {
            const response = await deleteFollowRequest(user.value.username)
            console.log(response.data)
        }
        catch (error) {
            console.log(error)
        }
        await followStore.getSentFollowRequests()
    }

    async function unfollowUser() {
        try {
            const response = await unfollow(user.value.username) 
        }
        catch (error) {
            console.log(error)
        }
        await followStore.getFollowing()
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
    }
</script>

<template>
    <NuxtLayout name="default" class="bg-white" v-if="user !== null">
        <!-- header -->
        <div class="w-full h-1/3 duration-300 bg-cover shadow-lg relative"
         :style="{ 'background-image': 'url(' + backgroundPicturePath +  ')' }"
         :class="{
            'opacity-1': startAnimation,
            'opacity-0': !startAnimation,
        }">
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
            </div>

        </div>

        <!-- names -->
        <div class="mx-auto w-full mt-20 p-4 text-3xl text-center tracking-wide">
            <p class="font-droid">
                {{ user.firstName }} {{ user.lastName }}
            </p>
            <p class="text-2xl p-4 font-metrophobic">
                @{{ user.username }}
            </p>
        </div>

        <!-- bio -->
        <p
        class="text-center mx-auto py-4 bg-white px-20 bg-transparent text-xl text-phtalo font-droid">
            {{ user.biography }}
        </p>
<!--        &lt;!&ndash; header &ndash;&gt;-->
<!--        <div class="w-full z-50 h-[300px] absolute header-picture"-->
<!--        :style="{ 'background-image': 'url(' + backgroundPicturePath +  ')' }"-->
<!--        :class="{-->
<!--            'expand': startAnimation-->
<!--        }">-->
<!--            <div class="relative w-full h-full">-->
<!--                <div class="absolute gradient bottom-0 h-1/3 w-full">-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->

<!--        &lt;!&ndash; profile picture &ndash;&gt;-->
<!--        <img class="z-100 relative w-1/4 p-8 mx-auto mt-20" :src="profilePicturePath" alt="">-->

<!--        &lt;!&ndash; names &ndash;&gt;-->
<!--        <NuxtLink :to="'/profile/' + user.username" class="z-50 mx-auto w-fit px-4 text-3xl font-heebo font-bold text-center tracking-wide">-->
<!--            <p>{{ user.firstName }} {{ user.lastName }}</p>-->
<!--            <p class="text-2xl p-4 font-metrophobic">@{{ user.username }}</p>-->
<!--        </NuxtLink> -->

<!--        &lt;!&ndash; bio &ndash;&gt;-->
<!--        <p class="text-center mx-auto my-8 px-20 text-xl text-phtalo font-droid">-->
<!--            {{ user.biography }}-->
<!--        </p>-->

        
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
        <div v-if="isFollowedOrPublic" class="py-20">
            <div class="text-center text-2xl font-droid">{{ user.firstName}}'s journeys</div>
            <Journey v-for="journey in journeys" :journey="journey" class="my-10"/>
        </div>

        <div v-if="hasReceivedAFollowReq" class="text-center text-2xl py-10 font-droid">
            You have sent {{ user.firstName }} a follow request
        </div>

        <div v-if="!isFollowedOrPublic" class="text-center text-2xl py-10 font-droid">
            Follow {{ user.firstName }} to see their journeys
        </div>

    </NuxtLayout>
</template>

<style scoped>
    .header-picture {
        background-size: cover;
        z-index: 10;
    }

    .z-100 {
        z-index: 100;
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