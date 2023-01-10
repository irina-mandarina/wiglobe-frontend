<script setup>
    defineProps({
        activity: Object,
    })
</script>

<template>
    <div v-if="activity !== undefined" class="overflow-hidden activity-image">
        <!-- <img class="w-full" src="https://picsum.photos/500/200"/> -->
        <div class="bg-white/[0.6] w-min h-min p-3 rounded-md m-20">
            <div class="flex w-max" v-if="activity.location !== undefined">
                {{ activity.title }} <span class="italic text-sm text-phtalo p-1"> {{ activity.type }} </span>
            </div>
            <div v-if="activity.location !== undefined">
                <i class="fa fa-times px-2" /> {{ new Date(activity.date).toLocaleDateString() }} 
            </div>
            <div v-if="activity.location !== undefined">
                <i class="fa fa-map-pin px-2" /> {{ activity.location }}
            </div>
            <div v-if="activity.description !== undefined">
                {{ activity.description }}
            </div>
        </div>
        
    </div>
</template>

<style scoped>
    .activity-image {
        background-image: url("https://picsum.photos/1000");
    }
</style>