<script setup>
    defineProps({
        activityTypes: Array
    })
</script>
<template>
    <div class="relative">
        <select class="bg-white shadow-md m-2 rounded-md border-khaki border absolute overflow-y-scroll h-30 focus:outline-none appearance-none">
            <option disabled class="text-sm bg-white p-2 mb-1 rounded-xl bg-gray-100 border border-dark-blue">
                Select an activity type
            </option>
            <option v-for="activity in activityTypes">
                <div class="p-2 px-4 border-b hover:gray-100">
                    &nbsp;{{ activity }}  
                </div>
            </option>
        </select>
    </div>
</template>