<script setup>
    defineProps({
        activity: Object,
    })
</script>

<template>
    <div v-if="activity !== undefined">
        <img class="mx-auto" src="https://picsum.photos/200"/>
        <div v-if="activity.location !== undefined">
            {{ activity.location }}
        </div>
        <div v-if="activity.description !== undefined">
            {{ activity.description }}
        </div>
    </div>
</template>