<script setup>
    import { useJourneyStore } from '~~/stores/JourneyStore'
    import { useUserStore } from '~~/stores/UserStore'

    const journeyStore = useJourneyStore();
    const userStore = useUserStore();

    
    const firstName = computed(() => userStore.user.firstName)
    const lastName = computed(() => userStore.user.lastName)
    const username = computed(() => userStore.user.username)

    let destination = ref(null)
    let description = ref(null)
    let startDate = ref(null)
    let endDate = ref(null)
    let visibility = ref(null)
    let activity = ref(null)
</script>

<template>
    <div class="shadow-md rounded-lg w-2/3 mx-auto m-6 overflow-hidden">
        <div class="flex">
            <!-- User info -->
            <div class="float-left w-1/2 text-center m-2">
                <NuxtLink to="/profile">
                    <img class="mx-auto" src="https://picsum.photos/50"/>
                    <span class="mx-auto"> 
                        <p class="p-1 font-heebo">{{ firstName }} {{ lastName }}</p>
                    </span>
                    <p class="mx-auto mb-2 font-heebo"></p>  
                </NuxtLink>
            </div>

            <!-- Journey picture (left) -->
            <div class="w-1/2 h-fit float-left">
                <input v-model="destination"/>
            </div>
        </div>
        <!-- Journey picture (left) -->
        <div class="w-1/2 h-fit float-left">
                <img class="h-full" src="https://picsum.photos/1000"/>
            </div>
        <!-- Journey info (right) -->
            <div class="w-1/2 float-right h-full">
                

                

                <!-- Journey description -->
                <p class="my-6 p-4"></p>
            </div>
    </div>
</template>