<script setup>
    defineProps ({
        visibility: String,
        editPermission: Boolean
    })
</script>

<template>
    <div class="absolute z-50 flex text-sm">
        <span class="p-2 w-fit h-fit">
            <i class="fa fa-file hover:text-md duration-100"  v-if="visibility === 'DRAFT'"/>
            <i class="fa fa-users hover:text-md duration-100"  v-if="visibility === 'FRIEND_ONLY'"/>
        </span>

        <span v-if="editPermission" class="p-2" @click="$emit('manageJourney')">
            <i class="fa fa-th hover:text-md duration-100" />
        </span>

    </div>
</template>