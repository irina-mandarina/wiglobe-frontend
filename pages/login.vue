<script setup>
    import { useUserStore } from '~~/stores/UserStore'

    let userStore = useUserStore()
    let username = ref(null)
    let password = ref(null)
    let startAnimation = ref(false)

    onMounted(() => {
        startAnimation.value = true
    })

    async function logIn() {
        const code = await userStore.logIn({
            username: username.value,
            password: password.value
        })
        if (code === 200) {
            navigateTo('/')
        }
    }

</script>

<template>
    <div class="flex w-2/3 h-fit mt-20 mx-auto shadow-lg rounded-xl relative overflow-hidden font-heebo text-brown">
        <div class="bg-image absolute">
        </div>
        
        <div class="bg-white p-6 w-1/2 input-container"
            :class="{
                'in-view': startAnimation
            }">
            <h1 :class="{
                'visible': startAnimation
            }" class="text-center font-sans font-black text-2xl py-6 w-full header">
                Log into your 
                <!-- worldly maybe? -->
                <span class="font-khaki">NAME</span> 
                 account
            </h1>
            <!-- form -->
            <div :class="{
                'visible2': startAnimation
            }" class="py-6 form">
                <div class="w-fit mx-auto">
                    <label for="username">
                        <i class="fa fa-user p-6 text-xl"/>
                    </label>
                    <input v-model="username" name="username" type="text" class="border rounded-full p-2 my-4 focus:outline-none"/>
                </div>
                <div class="w-fit mx-auto">
                    <label for="password">
                        <i class="fa fa-lock p-6 text-xl"/>
                    </label>
                    <input v-model="password" name="password" type="password" class="border rounded-full p-2 my-4 focus:outline-none"/>
                </div>
                <button @click="logIn()" class="flex mx-auto mt-2 mb-4 bg-khaki font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                    Log in
                </button>
                <div class="w-fit mx-auto">
                    <span class="py-6">Log in with </span>
                    <i class="social-icon fa fa-google p-6 text-red-600 hover:text-red-800 duration-300"/>
                    <i class="social-icon fa fa-facebook p-6 text-blue-600 hover:text-blue-900 duration-300"/>
                    <i class="social-icon fa fa-twitter p-6 text-indigo-700 hover:text-indigo-800 duration-300"/>
                </div>
                <NuxtLink to="/signup" class="w-fit flex mx-auto p-6 hover:scale-[1.02] duration-300">I don't have an account</NuxtLink>
            </div>
        </div>
    </div>
    
</template>
<style scoped>
    .bg-image {
        background-image: url("https://picsum.photos/2000");
        background-size: cover;
        width: 100%;
        height: 600px;
    }

    .in-view {
        transform: translateX(0);
        transition-duration: 2s;
        transition-delay: 0.5s;
    }

    .input-container:not(.in-view) {
        transform: translateX(-200%);
    }

    .header:not(.visible) {
        opacity: 0;
    }

    .visible {
        opacity: 1;
        transition: all 1s ease-in-out;
        transition-delay: 3s;
    }

    .form:not(.visible2) {
        opacity: 0;
    }

    .visible2 {
        opacity: 1;
        transition: all 1s ease-in-out;
        transition-delay: 4s;
    }

    .bg-khaki:hover {
        background-color: var(--fawn);
    }

    .social-icon:hover {
        transform: scale(1.2);

    }

    .font-brown:hover {
        color: rgb(0, 0, 53);
    }
</style>