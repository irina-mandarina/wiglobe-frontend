<script setup>
    import { getLocalStorageUsername } from '~~/js/localStorageUtil'

    const props = defineProps({
        followers: Array,
        following: Array,
        friends: Array,
        username: String
    })

    let followerCount = computed(() => {
        if (props.followers === null)
            return 0
        else
            return props.followers?.length
    })
    let followingCount = computed(() => {
        if (props.following === null)
            return 0
        else
            return props.following?.length
    })
    
    let friendCount = computed(() => {
        if (props.friends === null)
            return 0
        else
            return props.friends?.length
    })

    let friendPage = ref(0)
    let displayedGroup = ref('friends')

    function nextFriendPage() {
        if (friendPage.value >= friendCount.value / 2 -1) {
            friendPage.value = 0
        }
        else {
            friendPage.value ++
        }
    }

    function prevFriendPage() {
        if (friendPage.value <= 0) {
            friendPage.value = friendCount.value / 2 -1
        }
        else {
            friendPage.value --
        }
    }
</script>
<template>
    <div class="w-1/2 overflow-hidden my-6 text-lg p-6">
        <div class="bg-white hover-border-asparagus border-0 border-b-4 duration-300 my-2 p-4 rounded-lg" @click="displayedGroup = 'followers'">
            Followers: {{ followerCount }}
        </div>
        <div class="bg-white hover-border-asparagus border-0 border-b-4 duration-300 mt-2 p-4 rounded-lg" @click="displayedGroup = 'following'">
            Following: {{ followingCount }}
        </div>
        
        <div v-if="displayedGroup !== 'friends'" class="bg-white hover-border-asparagus border-0 border-b-4 duration-300 mt-2 p-4 rounded-lg" @click="displayedGroup = 'friends'">
            Friends: {{ friendCount }}
        </div>

        <div class="bg-white hover-border-asparagus border-0 border-y-4 duration-300 mb-2 p-4 rounded-lg">

            <div v-if="displayedGroup === 'friends'">
                <p class="">
                    Friends
                </p>
                <div v-if="friendCount" class="flex w-full justify-evenly">
                    <div v-if="friendCount > 2" class="my-auto w-1/12">
                        <i @click="prevFriendPage()" class="fa fa-chevron-left p-2"/>
                    </div>    
                    <UserDetails class="w-1/4 m-4" v-if="friendCount > 0 && friends[friendPage*2]" :user="friends[friendPage*2]" />
                    <UserDetails class="w-1/4 m-4" v-if="friendPage*2+1 < friendCount" :user="friends[friendPage*2+1]" />
                    <div v-if="friendCount > 2" class="my-auto w-1/12">
                        <i @click="nextFriendPage()" class="fa fa-chevron-right p-2"/>
                    </div>
                </div>
                <div v-else>
                    You do not have any friends yet.
                </div>
            </div>
            
            <div v-if="displayedGroup === 'following'" class="overflow-y-scroll">
                <p class="font-droid text-brown">
                    Following: {{ following?.length }}
                </p>
                <div v-if="following !== null" v-for="user in following" class="w-full flex my-4 shadow-inner bg-white rounded-full w-full">
                    <div @click="navigateTo('/profile/' + user.username)" class="py-3 text-center w-1/3">
                        @{{ user.username }}
                    </div>
                    <div @click="navigateTo('/profile/' + user.username)" class="py-3 text-center w-2/5">
                        {{ user.firstName }} {{ user.lastName }}
                    </div>
                    <div v-if="username === getLocalStorageUsername()" @click="$emit('unfollowUser', user.username)" class="my-auto p-1 bg-slate-300 duration-100 hover:bg-slate-400 rounded-full w-1/5 text-center">
                        Unfollow
                    </div>
                </div>
                <div v-else>
                    {{ altText }}
                </div>
            </div>

            <div v-if="displayedGroup === 'followers'" class="overflow-y-scroll">
                <p class="font-droid text-brown">
                    Followers: {{ followers?.length }}
                </p>
                <div v-if="following !== null" v-for="user in followers" @click="navigateTo('/profile/' + user.username)" class="w-full flex my-4 shadow-inner bg-white rounded-full w-full">
                    <div class="p-4 float-left">@{{ user.username }}</div>
                    <div class="p-4 float-right">{{ user.firstName }} {{ user.lastName }}</div>
                </div>
                <div v-else>
                    {{ altText }}
                </div>
            </div>
        </div>

        
    </div>
</template>

<style scoped>
    .hover-border-asparagus:hover {
        border-color: 4px solid var(--khaki);
        /* border-top: 4px solid var(--khaki); */
    }
</style>