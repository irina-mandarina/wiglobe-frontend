<script setup>
    const props = defineProps({
        notification: Object
    })
    let content = ref(props.notification?.content.replace(props.notification?.subject, ''))
    let usernameHovered = ref(false)
    let object = ref(null)
    let objectLink = ref(null)
    
    if (props.notification?.prepositionObjectType === "JOURNEY") {
        content.value = content.value.replace('journey', '')
        objectLink.value = '/journeys/' + props.notification?.prepositionObjectId
        object.value = 'journey'
    }
    else if (props.notification.objectType === "FOLLOW_REQUEST") {
        content.value = content.value.replace('follow requst', '')
        objectLink.value = '/follow-requests'
        object.value = 'follow request'
    }
</script>

<template>
    <div class="w-5/6 my-6 flex shadow-md mx-auto p-6 rounded-full">
        <div class="w-1/12 px-10">
            <i class="fa fa-bell"/>
        </div>

        <div class="w-3/4 text-center">
            <NuxtLink :to="'/profile/' + notification?.subject" class="text-fawn font-bold relative" 
            @mouseenter="usernameHovered = true" @mouseleave="usernameHovered = false">
                {{ notification?.subject }}
                <Transition>
                    <ProfileMini v-if="usernameHovered"
                    @mouseenter="usernameHovered = true" @mouseleave="usernameHovered = false" 
                    :username="notification?.subject" class="absolute w-40 left-0" />
                </Transition>
            </NuxtLink>
            {{ content }}
            <NuxtLink :to="objectLink" class="text-fawn font-bold relative">
                {{ object }}
            </NuxtLink>
        </div>

        <div class="w-1/12 whitespace-nowrap">
            {{ new Date(notification?.timestamp).toDateString()}}
        </div>
    </div>
</template>
<style scoped>
    .v-enter-active,
    .v-leave-active {
    transition: opacity 0.5s ease;
    }

    .v-enter-from,
    .v-leave-to {
    opacity: 0;
    }
</style>