<script setup>
    const props = defineProps({
        activities: Array,
        images: Array
    })
    let attachmentOnDisplayId = ref(0)
    let attachmentChange = ref(false)
    let showArrows = ref(false)
    let folderName = "/_nuxt/assets/wiglobe/images/journeys/"

    onBeforeMount(() => {
        // for(let i = 0; i < props.images?.length; i++) {
        //     props.images[i] = folderName + props.images[i]
        // }
    })

    function showPreviousAttachment() {
        attachmentChange.value = true
        setTimeout(() => {
            if (attachmentOnDisplayId.value === 0) {
                attachmentOnDisplayId.value = props.activities?.length + props.images?.length - 1
            }
            else {
                attachmentOnDisplayId.value--
            }
            attachmentChange.value = false
        }, 500)
    }

    function showNextAttachment() {
        attachmentChange.value = true
        setTimeout(() => {
            if (attachmentOnDisplayId.value === props.activities?.length + props.images?.length - 1) {
                attachmentOnDisplayId.value = 0
            }
            else {
                attachmentOnDisplayId.value++
            }
            attachmentChange.value = false
        }, 500)
    }
</script>

<template>
    <div class="h-full">
        <div class="flex relative h-full"
        @mouseenter="showArrows = images?.length + activities?.length > 1"
        @mouseleave="showArrows = false">
            <div :class="{
                'opacity-0': !showArrows,
                'opacity-100': showArrows
            }" class="absolute delay-500 left-0 h-full bg-gray-200/[0.5] overflow-hidden duration-300 cursor-pointer duration-300"
            @click="showPreviousAttachment()">
                <i class="fa fa-chevron-left text-2xl px-3 align-middle pt-32" />
            </div>

            <div class="h-[50rem] w-full" v-if="attachmentOnDisplayId < images?.length"
                :style="{ 'background-image': 'url(' + folderName + images[attachmentOnDisplayId] +  ')' }"
                :class="{
                    'animate-attachment': attachmentChange,
                }"
            >
            </div>
            <Activity class="attachment h-[40rem]"
            v-if="attachmentOnDisplayId >= images?.length"
            :activity="activities[attachmentOnDisplayId - images?.length]" :class="{
                'animate-attachment': attachmentChange
            }" />

            <div :class="{
                'opacity-0': !showArrows,
                'opacity-100': showArrows
            }" class="absolute delay-500 right-0 h-full bg-gray-200/[0.5] overflow-hidden duration-300 cursor-pointer"
            @click="showNextAttachment()">
                <i class="fa fa-chevron-right text-2xl px-3 align-middle pt-32" />
            </div>
        </div>
    </div>
</template>

<style scoped>
    .attachment:not(.animate-attachment) {
        opacity: 1;
    }

    .animate-attachment {
        opacity: 0;
        transition: opacity 500ms ease-in-out;
    }
</style>