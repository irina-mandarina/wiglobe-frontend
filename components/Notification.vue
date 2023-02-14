<script setup>
    const props = defineProps({
        notification: Object
    })
    let content = ref(props.notification?.content.replace(props.notification?.subject, ''))
</script>

<template>
    <div class="w-5/6 my-6 flex shadow-md mx-auto p-6 rounded-full">
        <div class="w-1/3 px-10">
            <i class="fa fa-bell"/>
        </div>
        <div>
            <NuxtLink :to="'/profile/' + notification?.subject">
                {{ notification?.subject }}
            </NuxtLink>
            {{ content }}
        </div>
        <div class="float-right">
            {{ new Date(notification?.timestamp).toUTCString()}}
        </div>
    </div>
</template>