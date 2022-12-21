<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    const userStore = useUserStore()

    const user = computed(() => userStore.user)

    definePageMeta({
        middleware: 'prepare-user-store'
    })

    onBeforeMount(async () => {
        
    })
</script>

<template>
    <NuxtLayout name="default">
        <!-- header -->
        <div>
            <div class="h-48">
                <!-- background pic -->
                <div class="w-full h-48 header-picture">

                    <div class="flex mx-auto w-1/3 relative">
                        <div class="top-40 left-8 absolute flex">
                        <!-- profile pic -->
                            <img class="w-1/3" src="https://picsum.photos/500"/>
                            <!-- names -->
                            <div class="my-auto px-4 text-3xl font-heebo font-bold tracking-wide">
                                <p>{{ user.firstName }} {{ user.lastName }}</p>
                            </div>    
                        </div>    
                    </div>

                </div>

                
            </div>


        </div>

        <!-- details -->

        <!-- journeys -->
    </NuxtLayout>
</template>

<style setup>
    .header-picture {
        background-image: url("https://picsum.photos/2000");
        background-size: cover;
        z-index: -1;
    }
</style>