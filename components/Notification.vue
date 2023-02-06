<script setup>
    const props = defineProps({
        notification: Object
    })
</script>

<template>
    <div class="w-5/6 my-6 flex shadow-md mx-auto p-6 rounded-full">
        <div class="w-1/3 px-10">
            <i class="fa fa-bell"/>
        </div>
        <div>
            {{ notification.content }}
        </div>
    </div>
</template>