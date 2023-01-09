<script setup>
    defineProps({
        activityTypes: Array
    })
    let showDropMenu = ref(false)
</script>
<template>
    <div class="relative">
        <div class="text-sm bg-white p-2 mb-1 rounded-md" @click="showDropMenu = !showDropMenu">
            Select an activity type
        </div>
        <div v-if="showDropMenu" class="bg-white shadow-md rounded-md p-2 absolute overflow-hidden overflow-y-scroll h-30">
            <span class="text-rose-600 hover:text-rose-700 text-sm float-right" @click="showDropMenu = false">
                X
            </span>
            <div v-for="activity in activityTypes" class="p-2">
                {{ activity }}
            </div>
        </div>
    </div>
</template>