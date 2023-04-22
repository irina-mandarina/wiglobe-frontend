<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import NavigationItem from "~/components/NavigationItem.vue";
    const userStore = useUserStore()
    const route = useRoute()
    let homeHovered = ref(false), notificationsHovered = ref(false), exploreHovered = ref(false), draftsHovered = ref(false)
    let hide = ref(true)
    let showNav = ref(true)
    let lastKnownScrollPosition = 0
    let currentScrollPosition = 0

    onMounted(() => {
        document.addEventListener("scroll", (event) => {
            currentScrollPosition = window.scrollY
            if (currentScrollPosition > 900) {
                showNav.value = false
                hide.value = true
            }
            if (currentScrollPosition < lastKnownScrollPosition) {
                // scrolling up
                showNav.value = true
            }
            else {
                showNav.value = false
                hide.value = true
            }
            lastKnownScrollPosition = window.scrollY
        })
    })
</script>
<template>
    <div class="w-full h-20 z-50 focus:outline-none">
        <nav class="fixed w-full z-50 duration-300 ease-in-out" :class="{
            'translate-y-0': showNav,
            '-translate-y-full': !showNav
        }">
            <!-- nav items -->
            <div class="flex bg-white bg-gray-50 bg-slate-50 shadow-sm">
                
                <!-- logo -->
                <img src="../assets/logo.svg" class="w-1/12 px-4" @click="navigateTo('/')" />

                <!-- center: feeds -->
                <div class="w-fit flex mx-auto font-heebo py-2 overflow-hidden h-20">
                    <NavigationItem text="Home" path="/" icon="fa-home" />
                    <NavigationItem text="Notifications" path="/notifications" icon="fa-bell" />
                    <NavigationItem text="Explore" path="/explore" icon="fa-search" />
                </div>

                <!-- menu button -->
                <div class="w-1/12 float-right" @click="hide = !hide">
                    <i class="fa fa-bars py-6 px-8 float-right text-2xl bg-slate-100" />
                </div>
            </div>
            <!-- menu -->
            <Transition>
                <ul v-if="!hide"
                class="overflow-hidden float-right bg-slate-50 bg-white rounded-lg shadow-lg m-1">
                    <li class="w-full border-b px-6 py-4 hover:bg-slate-100 duration-100"
                    :class="{
                        'bg-slate-200': route && route.path === '/profile/me'
                    }">
                        <NuxtLink to="/profile/me" class="text-lg">
                            <i class="fa fa-user"/>
                            <span class="px-2"> Profile </span>
                        </NuxtLink>
                    </li>
                    
                    <li class="w-full border-b px-6 py-4 hover:bg-slate-100 duration-100" :class="{
                        'bg-slate-200': route && route.path === '/drafts'
                    }">
                        <NuxtLink to="/drafts" class="text-lg">
                            <i class="fa fa-file"/>
                            <span class="px-2"> Drafts </span>
                        </NuxtLink>
                    </li>

                    <li class="w-full border-b px-6 py-4 hover:bg-slate-100 duration-100" :class="{
                        'bg-slate-200': route && route.path === '/friends'
                    }">
                        <NuxtLink to="/friends" class="text-lg">
                            <i class="fa fa-address-book"/>
                            <span class="px-2"> Friends </span>
                        </NuxtLink>
                    </li>

                    <li class="w-full border-b px-6 py-4 hover:bg-slate-100 duration-100" :class="{
                        'bg-slate-200': route && route.path === '/follow-requests'
                    }">
                        <NuxtLink to="/follow-requests" class="text-lg">
                            <i class="fa fa-users"/>
                            <span class="px-2"> Follow requests </span>
                        </NuxtLink>
                    </li>

                    <li class="w-full border-b px-6 py-4 hover:bg-slate-100 duration-100 cursor-pointer">
                        <div @click="userStore.logOut()" class="text-lg">
                            <i class="fa fa-door-open" />
                            <span class="px-2"> Log out </span>
                        </div>
                    </li>

                    <li class="w-full border-b px-6 py-4 block hover:bg-slate-100 duration-100"
                    :class="{
                        'bg-slate-200': route && route.path === '/settings'
                    }">
                        <NuxtLink to="/settings" class="text-lg">
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

    .fa:hover {
        color: var(--phtalo);
    }
</style>