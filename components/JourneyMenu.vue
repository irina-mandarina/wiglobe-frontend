<script setup>
    defineProps ({
        visibility: String,
        editPermission: Boolean
    })
    let showJourneyMenu = ref(false)
    let showDeleteConfirmationBox = ref(false)
</script>

<template>
    <div class="absolute z-50 flex text-sm relative">

        <span v-if="editPermission" class="p-1 mx-1 border cursor-pointer rounded-full select-none rotate-90"
        @click.stop="showJourneyMenu = !showJourneyMenu">...</span>

        <span class="p-2 w-fit h-fit">
            <i class="fa fa-file hover:text-md duration-100"  v-if="visibility === 'DRAFT'"/>
            <i class="fa fa-users hover:text-md duration-100"  v-if="visibility === 'FRIEND_ONLY'"/>
        </span>

        <div class="absolute rounded-md border-2 border-gray-400 bg-slate-100" v-if="editPermission && showJourneyMenu">
            <div class="p-3 focus:outline-none cursor-pointer mx-auto border-b"
            @click.stop="$emit('edit-journey'); showJourneyMenu = false">
                Edit
            </div>
            <div class="p-3 focus:outline-none cursor-pointer mx-auto border-b"
            @click="showDeleteConfirmationBox = true; showJourneyMenu = false">
                Delete
            </div>
            <div class="p-3 focus:outline-none cursor-pointer mx-auto"
            @click.stop="showJourneyMenu = false">
                Cancel
            </div>
        </div>

    </div>
</template>