<script setup>
    import { getAllActivityTypes } from '~~/js/activityRequests'

    const emits = defineEmits([
        'addActivity'
    ])

    const props = defineProps({
        activities: Array
    })

    const activityTypes = ref(null)
    let activityTypesMenu = ref(false)
    let title = ref(null)
    let type = ref('OTHER')
    let location = ref(null)
    let description = ref(null)
    let date = ref(null)

    onBeforeMount(async () => {
        try {
            activityTypes.value = (await getAllActivityTypes()).data
        }
        catch(error) {
            console.log(error)
        }
    })

    function addActivity() {
        let activityRequest = {
            title: title.value,
            type: type.value,
            location: location.value,
            description: description.value,
            date: date.value
        }
        console.log(activityRequest)
        emits('addActivity', activityRequest)

        title.value = null
        location.value = null
        description.value = null
        date.value = null
    }

    let activityOnDisplayId = ref(null)
    let activityChange = ref(false)
    let showArrows = ref(false)

    function showPreviousActivity() {
        activityChange.value = true
        setTimeout(() => {
            if (activityOnDisplayId.value === 0) {
                activityOnDisplayId.value = null
            }
            else if (activityOnDisplayId.value === null) {
                activityOnDisplayId.value = props.activities.length - 1
            }
            else {
                activityOnDisplayId.value--
            }
            activityChange.value = false
        }, 500)
    }

    function showNextActivity() {
        activityChange.value = true
        setTimeout(() => {
            if (activityOnDisplayId.value === props.activities.length - 1) {
                activityOnDisplayId.value = null
            }
            else if (activityOnDisplayId.value === null) {
                activityOnDisplayId.value = 0
            }
            else {
                activityOnDisplayId.value++
            }
            activityChange.value = false
        }, 500)
    }
</script>

<template>
    <div class="h-fit relative">
        <div v-if="activities">
            <div class="flex relative" @mouseenter="()=>{if (activities !== null && activities.length !== 0) {showArrows = true; }}" @mouseleave="showArrows = false">
                <div :class="{
                    'opacity-0': !showArrows,
                    'delay-500': !showArrows,
                    'opacity-100': showArrows
                }" class="absolute left-0 h-full bg-gray-200/[0.5] overflow-hidden duration-300 rounded-l-xl" opacity-100 duration-300 @click="showPreviousActivity()">
                    <i class="fa fa-chevron-left text-2xl px-3 align-middle pt-32" />
                </div>

                <!-- activity adder -->

                <div class="px-20" v-if="activityOnDisplayId === null">
                    <div class="text-center w-full mx-auto p-2 font-heebo font-bold text-lg">
                        Add activities you engaged in on your journey
                    </div>

                    <div class="mb-2">
                        <span>Date: </span>
                        <input type="date" v-model="date" class="p-1 rounded-lg m-2 border-b-2 border-dark-blue focus:outline-none duration-300" />                    
                    </div>

                    <div class="mb-2">
                        <span>Location: </span>
                        <input type="text" v-model="location" class="p-1 rounded-lg m-2 border-b-2 border-dark-blue focus:outline-none duration-300" />
                    </div>

                    <div class="mb-2">
                        <span>Title: </span>
                        <input type="text" v-model="title" class="p-1 rounded-lg m-2 border-b-2 border-dark-blue focus:outline-none duration-300" />
                    </div>
                    
                    <div class="mb-2">
                        <span>Description: </span>
                        <input type="text" v-model="description" class="p-1 rounded-lg m-2 border-b-2 border-dark-blue focus:outline-none duration-300" />
                    </div>

                    <div class="mb-4 flex w-max" @click="activityTypesMenu = !activityTypesMenu">
                        <span class="w-max">
                            Activity type: 
                        </span>
                        <span class="relative px-3">
                            <div v-if="!activityTypesMenu" class="">
                                {{ type.toLowerCase() }}
                            </div>
                            <ul v-else class="bg-gray-50 z-[200] overflow-hidden rounded-md shadow-sm absolute">
                                <li v-for="activityType in activityTypes" :activity-type="activityType"
                                class="p-2 border-b hover:bg-gray-100 duration-100"
                                :class="{
                                    'bg-fawn': type === activityType
                                }"
                                @click="type = activityType">
                                    {{ activityType.toLowerCase() }}
                                </li>
                            </ul> 
                        </span>
                    </div>

                    <div class="">
                        <span>Add pictures from this activity: </span>
                        <input type="file" class="m-2" alt="Pictures" />
                    </div>    

                    <div class="mt-4 w-full relative text-center">
                        <button @click="addActivity()" class="rounded-full bg-peach text-center px-4 py-1 bold border-4 border-peach duration-200">
                            Add activity
                        </button>
                    </div>

                </div>


                <Activity v-if="activityOnDisplayId !== null" class="activity h-[40rem]" :activity="activities[activityOnDisplayId]" :class="{
                    'animate-activity': activityChange
                }" />

                <div :class="{
                    'opacity-0': !showArrows,
                    'delay-500': !showArrows,
                    'opacity-100': showArrows
                }" class="absolute right-0 h-full bg-gray-200/[0.5] overflow-hidden duration-300 rounded-r-xl" @click="showNextActivity()">
                    <i class="fa fa-chevron-right text-2xl px-3 align-middle pt-32" />
                </div>
            </div>
        </div>

        
    </div>
</template>

<style scoped>
    .bg-peach:hover {
        background-color: var(--fawn);
    }
    .activity:not(.animate-activity) {
        opacity: 1;
    }

    .animate-activity {
        opacity: 0;
        transition: opacity 500ms ease-in-out;
    }
</style>