<script setup>
    defineProps({
        path: String,
        icon: String,
        text: String
    })
    let itemHovered = ref(false)
    let route = useRoute()
</script>

<template>
    <NuxtLink :to="path" :class="{
        'active': route?.path === path
    }"
    class="text-xl navlink flex flex-wrap"
    @mouseover="itemHovered = true"
    @mouseleave="itemHovered = false">

        <i class="fa h-1/2 mx-auto p-4 pb-0"
           :class="[icon,
            {
            'pt-3 translate-y-0.5 duration-75': itemHovered
            }
            ]"
        />
        <span
        :class="{
            visible: itemHovered
        }"
        class="navlink-text w-full h-1/2 text-center">
            {{ text }}
        </span>

    </NuxtLink>
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

    .active {
        color: var(--asparagus);
    }

    .fa:hover {
        color: var(--phtalo);
    }
</style>