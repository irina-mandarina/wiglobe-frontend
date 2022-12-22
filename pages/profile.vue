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
    let startAnimation = ref(false)
    let editMode = ref(false)

    definePageMeta({
        middleware: 'prepare-user-store'
    })

    onBeforeMount(async () => {
        if (journeyStore.loggedUserJourneys === null) {
            await journeyStore.getJourneysByLogged()
        }
        if (followStore.followers === null) {
            await followStore.getFollowers()
        }
        if (followStore.following === null) {
            await followStore.getFollowing()
        }
        if (followStore.friends === null) {
            await followStore.getFriends()
        }
    })

    onMounted(() => {
        startAnimation.value = true
        console.log(startAnimation.value)
    })
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
        <p class="text-center mx-auto text-xl text-phtalo font-droid">
            {{ user.biography }}
        </p>

        <div class="w-11/12 flex">
            <!-- details -->
            <div class="mx-auto w-1/2 justify-evenly my-6">
                <!-- gender and pronouns -->
                <div class="rounded-2xl shadow-lg w-3/4 border-khaki border-2 text-center delay-[1000ms] details-box bg-white overflow-hidden"
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
                <div class="rounded-2xl shadow-lg w-3/4 border-khaki border-2 text-center delay-[1500ms] details-box bg-white overflow-hidden"
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
                <div class="rounded-2xl shadow-lg w-3/4 border-khaki border-2 text-center delay-[2000ms] details-box bg-white overflow-hidden"
                    :class="{
                        'slide-up': startAnimation
                    }">
                    <p class="text-center p-6">
                        City, Country
                    </p>
                </div>

                <!-- joined on -->
                <div class="rounded-2xl shadow-lg w-3/4 border-khaki border-2 text-center delay-[2500ms] details-box bg-white overflow-hidden"
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
             <div class="w-1/2">
                <div>Followers: {{ followers.length }}</div>
                <!-- <div>Following: {{ 0 || following.length }}</div> -->
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
</style>