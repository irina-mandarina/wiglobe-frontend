<script setup>
    import { getAllActivityTypes } from '~~/js/activityRequests'

    const emits = defineEmits([
        'addActivity'
    ])

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
        type.value = null
        location.value = null
        description.value = null
        date.value = null
    }
</script>

<template>
    <div class="w-1/2 h-fit p-2 relative">
        <div>
            <div class="text-center w-full p-2 font-heebo font-bold text-lg">
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
        </div>

        <div class="mx-auto mt-4 flex relative">
            <button @click="addActivity()" class="rounded-full bg-peach text-center px-4 py-1 bold border-4 border-peach duration-200">
                Add activity
            </button>
        </div>
        
    </div>
</template>

<style scoped>
    .bg-peach:hover {
        background-color: var(--fawn);
    }
</style>