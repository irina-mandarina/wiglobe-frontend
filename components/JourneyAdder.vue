<script setup>
    import { useJourneyStore } from '~~/stores/JourneyStore'
    import { useUserStore } from '~~/stores/UserStore'

    const journeyStore = useJourneyStore();
    const userStore = useUserStore();

    
    const firstName = computed(() => userStore.user.firstName)
    const lastName = computed(() => userStore.user.lastName)
    const username = computed(() => userStore.user.username)

    let destination = ref(null)
    let destinationObject = ref(null)
    let description = ref(null)
    let startDate = ref(null)
    let endDate = ref(null)
    let visibility = ref(null)
    let activity = ref(null)
    let canBePosted = ref(false)
    let creatorOpen = ref(false)

</script>

<template>
    <div class="w-full relative">
        <div v-if="!creatorOpen" class="p-6 text-2xl mx-auto text-center rounded-full shadow-md w-1/2" @click="creatorOpen = true">
            <span class="font-heebo font-bold text-5xl hover:text-green-700 duration-300">+</span>
            Create a new journey
        </div>
        <div :class="{
            'h-2': !creatorOpen,
            'h-fit': creatorOpen,
            'open': creatorOpen
        }" class="shadow-md rounded-lg w-11/12 mx-auto m-6 overflow-hidden p-6 creator-container bg-khaki">

            <div class="flex creator" :class="{
                'visible': creatorOpen
            }">
                <!-- User info -->
                <div class="float-left w-1/6 text-center h-min">
                    <NuxtLink :to="'/profile/' + username">
                        <img class="mx-auto" src="https://picsum.photos/50"/>
                        <span class="mx-auto"> 
                            <p class="p-1 font-heebo">{{ firstName }} {{ lastName }}</p>
                        </span>
                        <p class="mx-auto mb-2 font-heebo">@{{ username }}</p>  
                    </NuxtLink>
                </div>
                <!-- Journey info (left) -->
                <div class="w-5/6 h-full">
                    <div class="flex w-full">
                        <div class="w-1/2">
                            <p class="text-center my-4">
                                Journey duration: 
                            </p>
                            <div class="flex mx-auto justify-center">
                                <input v-model="startDate" type="date" class="p-2 h-2/3 border-khaki border rounded-lg shadow-inner"/>
                                <span class="my-2 p-2"> - </span>
                                <input v-model="endDate"   type="date" class="p-2 h-2/3 border-khaki border rounded-lg shadow-inner"/>
                            </div>
                        </div>
                        
                        <div class="mt-4 w-1/2 py-4">
                            <span v-if="destinationObject === null">
                                Select your destination:
                                <input v-model="destination" class="mx-auto px-4 border-khaki border p-2 rounded-full shadow-inner" placeholder="Destination"/>    
                            </span>
                            <span v-if="destinationObject !== null">
                                <MiniDestination :destination="destinationObject" />
                            </span>
                        </div>
                    </div>

                    <div class="my-4 flex">
                        <p class="p-4">
                            Add a description: 
                        </p>
                        <textarea v-model="description" class="p-4 flex border-khaki border resize-none rounded-lg w-3/4 h-full shadow-inner"></textarea>
                    </div>
                </div>

            </div>

            <div class="flex creator" :class="{
                'visible': creatorOpen
            }">
                <!-- Journey picture  -->
                <div class="w-1/2 h-fit p-2 relative">
                    <div class="text-center p-2 font-heebo font-bold text-lg">
                        Add pictures from your journey
                    </div>
                    <input type="file" class="p-2 border-khaki border rounded-lg mx-auto flex my-6" alt="Pictures" />
                </div>

                <!-- Activity adder -->
                <div class="w-1/2 h-fit p-2 relative">
                    <div>
                        <div class="text-center p-2 font-heebo font-bold text-lg">
                            Add activities you engaged in on your journey
                        </div>

                        <div class="mb-2">
                            <span>Date: </span>
                            <input type="date" class="p-1 rounded-lg m-2 bg-khaki border-b-2 border-dark-blue focus:outline-none duration-300" />                    
                        </div>

                        <div class="mb-2">
                            <span>Title: </span>
                            <input type="text" class="p-1 rounded-lg m-2 bg-khaki border-b-2 border-dark-blue focus:outline-none duration-300" />
                        </div>
                        
                        <div class="mb-2">
                            <span>Description: </span>
                            <input type="text" class="p-1 rounded-lg m-2 bg-khaki border-b-2 border-dark-blue focus:outline-none duration-300" />
                        </div>

                        <div class="mb-2">
                            <span>Activity type</span>
                        </div>

                        <div class="">
                            <span>Add pictures from this activity: </span>
                            <input type="file" class="p-2 border-khaki border rounded-lg m-2" alt="Pictures" />
                        </div>    
                    </div>
                    <div class="w-1/12 float-right relative">
                        <button class="rounded-full bg-fawn text-center px-4 py-2 bold border-4 border-peach">
                            +
                        </button>
                    </div>
                    
                </div>    
            </div>
            
        </div>

        <button v-if="canBePosted" class="bg-fawn absolute bottom-4 left-4 p-6 text-lg rounded-full font-heebo font-bold text-white hover:text-gray-100 duration-300">
            Post journey
        </button>
    </div>
    
</template>

<style scoped>
    .bg-fawn:hover {
        background-color: var(--peach);
    }

    .open {
        transform: scaleY(100%);
        transition: all 0.7s ease-in-out;
    }

    .visible {
        opacity: 100%;
        transition: all 0.5s ease-in-out;
        transition-delay: 0.5s;
    }

    .creator-container:not(.open) {
        transform: scaleY(0%);
    }

    .creator:not(.visible) {
        opacity: 0;
    }

    .border-dark-blue:focus {
        border-color: var(--asparagus);
    }
</style>