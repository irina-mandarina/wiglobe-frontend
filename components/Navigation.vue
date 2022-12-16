<script setup>
    const route = useRoute()
</script>
<template>
    <nav class="w-1/3 mx-auto absolute font-heebo pt-4 pb-2 relative">
        <NuxtLink to="/" :class="{
            'active': (route !== null && route !== undefined && route.path === '/')
            }"
            class="p-8 text-2xl navlink">
            <i class="fa fa-home" />
        </NuxtLink>
        
        <NuxtLink to="/notifications" :class="{
            'active': (route !== null && route !== undefined && route.path === '/notifications')
            }"
            class="p-8 text-2xl navlink">
            <i class="fa fa-bell "></i>
        </NuxtLink>

        <NuxtLink to="/explore" :class="{
            'active': (route !== null && route !== undefined && route.path === '/explore')
            }"
            class="p-8 text-2xl navlink">
            <i class="fa fa-search "></i>
        </NuxtLink>
    </nav>
</template>
<style scoped>
    .active::before {
        content: "";
        position: absolute;
        width: 15%;
        height: 4px;
        top: 3rem;
        background-color: var(--phtalo);
        color: var(--phtalo);
        transition: all 1s;
        transform: translateX(-20%);
    }

    .active:hover::before {
        transform: scaleX(120%);
    }

    .navlink:not(.active):hover::before {
        content: "";
        position: absolute;
        width: 20%;
        height: 4px;
        top: 3rem;
        background-color: var(--asparagus);
        color: var(--asparagus);
        transition: all 1s;
        transform: translateX(-10%);
        z-index: -1;
    }
</style>