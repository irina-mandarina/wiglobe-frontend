<script setup>
    const route = useRoute()
</script>
<template>
    <nav class="w-1/3 mx-auto font-heebo pt-4 pb-2 relative">
        <NuxtLink to="/" :class="{
            'active': (route !== null && route !== undefined && route.path === '/')
            }"
            class="p-4 text-lg custom-underline">
            Home
        </NuxtLink>
        
        <NuxtLink to="/notifications" :class="{
            'active': (route !== null && route !== undefined && route.path === '/notifications')
            }"
            class="p-4 text-lg custom-underline">
            Notifications
        </NuxtLink>

        <NuxtLink to="/explore" :class="{
            'active': (route !== null && route !== undefined && route.path === '/explore')
            }"
            class="p-4 text-lg custom-underline">
            Explore
        </NuxtLink>
    </nav>
</template>
<style>
    .active::before {
        content: "";
        position: absolute;
        top: 3rem;
        left: 50%;
        width: 50%;
        height: 5%;
        background-color: var(--phtalo);
        transition: all 1s;
    }

    .custom-underline::before {
        content: "";
        top: 3rem;
        left: 50%;
        width: 50%;
        height: 5%;
        background-color: var(--khaki);
        transition: all 1s;
        z-index: -1;
        transform: translateX(-100%);
    }

    .custom-underline:hover::before {
        transform: translateX(0);
    }
    
    .custom-underline:hover {
        color: var(--brown);
    }
</style>