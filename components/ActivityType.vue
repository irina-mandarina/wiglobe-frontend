<script setup>
    defineProps({
        activityType: String
    })
</script>
<template>
    <div class="p-4">
        {{ activityType }}
    </div>
</template>