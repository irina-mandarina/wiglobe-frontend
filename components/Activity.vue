<script setup>
    const props = defineProps({
        activity: Object,
    })
    let imgStyle = computed(() => {
        if (props?.activity?.image === null) return null
         return 'bg-[url(/_nuxt/assets/wiglobe/images/activites/' + props?.activity?.image + ')]'
    })
</script>

<template>
    <div v-if="activity !== undefined" class="overflow-hidden w-full" :class="{
        imgStyle: activity?.image
    }"
    :style="{ 'background-image': imgStyle }">
        <div class="bg-white/[0.6] w-min h-min p-3 rounded-md left-16 absolute bottom-10">
            <div class="flex w-max">
                {{new Date(activity?.date).toLocaleDateString() }} 
            </div>
            <div>
                <i class="fa fa-times px-2" /> {{ new Date(activity?.date).toLocaleDateString() }} 
            </div>
            <div>
                {{ activity?.description }}
            </div>
        </div>
        
    </div>
</template>