<script setup>
    const route = useRoute()
    console.log(route.path)
    let homeHovered = ref(false), notificationsHovered = ref(false), exploreHovered = ref(false)
    let hide = ref(false)
</script>
<template>
    <div class="relative h-20">
        <nav class="absolute w-full">
            <!-- nav items -->
            <div class="flex bg-white">
                <!-- center: feeds -->
                <div class="w-fit flex mx-auto font-heebo py-2">
                    <NuxtLink to="/" :class="{
                        'active': (route !== null && route !== undefined && route.path === '/')
                        }"
                        class="text-xl navlink flex flex-wrap"
                        @mouseover="homeHovered = true" @mouseleave="homeHovered = false">
                        <i class="fa fa-home h-1/2 mx-auto p-4 pb-0" :class="{
                            'go-up': homeHovered
                        }"/>
                        <span :class="{visible: homeHovered}" class="navlink-text w-full h-1/2 text-center">Home</span>
                    </NuxtLink>
                    
                    <NuxtLink to="/notifications" :class="{
                        'active': (route !== null && route !== undefined && route.path === '/notifications')
                        }"
                        class="text-xl navlink flex flex-wrap"
                        @mouseover="notificationsHovered = true" @mouseleave="notificationsHovered = false">
                        <i class="fa fa-bell h-1/2 mx-auto p-4 pb-0" :class="{
                            'go-up': notificationsHovered
                        }"/>
                        <span :class="{visible: notificationsHovered}" class="navlink-text w-full h-1/2 text-center">Notifications</span>
                    </NuxtLink>

                    <NuxtLink to="/explore" :class="{
                            'active': (route !== null && route !== undefined && route.path === '/explore')
                        }"
                        class="text-xl navlink flex flex-wrap"
                        @mouseover="exploreHovered = true" @mouseleave="exploreHovered = false">
                        <i class="fa fa-search h-1/2 mx-auto p-4 pb-0" :class="{
                            'go-up': exploreHovered
                        }"/>
                        <span :class="{visible: exploreHovered}" class="navlink-text w-full h-1/2 text-center">Explore</span>
                    </NuxtLink>
                </div>
                <!-- menu button -->
                <div class="float-right" @click="hide = !hide">
                    <i class="fa fa-bars py-6 px-8 text-2xl" />
                </div>
            </div>
            <!-- menu -->
            <Transition>
                <ul v-if="!hide" class="float-right bg-white rounded-lg">
                    <li class="w-full border-b px-6 py-4">
                        <NuxtLink to="/profile" class="text-lg hover:text-gray-800 duration-300">
                            <i class="fa fa-user"/>
                            <span class="px-2"> Profile </span>
                        </NuxtLink>
                    </li>
                    <li class="w-full border-b px-6 py-4">
                        <NuxtLink to="/friends" class="text-lg hover:text-gray-800 duration-300">
                            <i class="fa fa-address-book"/>
                            <span class="px-2"> Friends </span>
                        </NuxtLink>
                    </li>
                    <li class="w-full border-b px-6 py-4">
                        <NuxtLink to="/friend-requests" class="text-lg hover:text-gray-800 duration-300">
                            <i class="fa fa-users"/>
                            <span class="px-2"> Friend requests </span>
                        </NuxtLink>
                    </li>
                    <li class="w-full border-b px-6 py-4 block">
                        <NuxtLink to="/friend-requests" class="text-lg hover:text-gray-800 duration-300">
                            <i class="fa fa-gears"/>
                            <span class="px-2"> Settings </span>
                        </NuxtLink>
                    </li>
                </ul>
            </Transition>
            

            
        </nav>
    </div>
    
</template>
<style scoped>
    .visible {
        opacity: 1;
        padding-top: 3px;
        transition-duration: 0.5s;
    }

    .navlink-text:not(.visible) {
        opacity: 0;
        transition-duration: 0.2s;
    }

    .go-up {
        padding-top: 3px;
        transition: all 1s ease-in-out;
    }

    .active {
        color: var(--asparagus);
    }

    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
        opacity: 0;
    }

    .fa:hover {
        color: var(--phtalo);
    }
</style>