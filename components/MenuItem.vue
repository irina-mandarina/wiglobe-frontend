<script setup>
    const route = useRoute()
    defineProps({
        path: String,
        text: String,
        icon: String
    })
</script>

<template>
    <li class="w-full border-b px-6 py-4 hover:bg-slate-100 duration-100"
    :class="{
        'bg-slate-200': route && route.path === path
    }">
        <NuxtLink :to="path"
          class="text-lg">
            <i class="fa"
            :class="icon" />
            <span class="px-2">
                {{ text }}
            </span>
        </NuxtLink>
    </li>
</template>