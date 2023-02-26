<script setup>
    defineProps({
        activity: Object,
    })
</script>

<template>
    <div v-if="activity !== undefined" class="overflow-hidden w-full activity-image">
        <div class="bg-white/[0.6] w-min h-min p-3 rounded-md left-16 absolute bottom-10">
            <div class="flex w-max">
                {{ activity.title }} 
            </div>
            <div>
                <i class="fa fa-times px-2" /> {{ new Date(activity?.date).toLocaleDateString() }} 
            </div>
            <div>
                <i class="fa fa-map-pin px-2" /> {{ activity?.location }}
            </div>
            <div>
                {{ activity?.description }}
            </div>
        </div>
        
    </div>
</template>

<style scoped>
    .activity-image {
        background-image: url("https://picsum.photos/1000");
    }
</style>