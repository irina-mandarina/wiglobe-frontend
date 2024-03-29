<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { GoogleSignInButton } from "vue3-google-signin"
    import { decodeCredential } from "vue3-google-signin"

    definePageMeta({
      middleware: "auth"
    })

    let userStore = useUserStore()

    let logInResponseCode = ref(userStore.logInResponseCode)
    function setLoginResponseCode() {
      logInResponseCode.value = userStore.logInResponseCode
    }
    let startAnimation = ref(false)
    let username = ref(null)
    let password = ref(null)

    // set log in credentials. these are set when the username and password ref are ready to be used to send a request.
    // this object is also used to update error messages
    let logInCredentials = {
        userIdentifier: null,
        password: null
    }
    
    let passwordError = computed (() => {
        if (password.value === null) {
            // password isn't updated yet
            return " "
        }
        if (!password.value) {
            return "password cannot be blank"
        }
        else if (logInResponseCode.value === 401) {
            // if the password has changed since the last log in request
            if (logInCredentials.password !== password.value) {
                return ""
            }
            // if it hasn't changed, don't allow sending more requests
            return "Wrong password"
        }
        else {
            return ""
        }
    })

    let usernameError = computed (() => {
        if (username.value === null) {
            // username isn't updated yet
            return " "
        }
        else if (!username.value) {
            return "username cannot be blank"
        }   
        else if (!(/^[A-Za-z][A-Za-z0-9_]/.test(username.value))) {
            return "The username you entered is invalid"
        }
        else if (logInResponseCode.value === 404) {
            // if the username has changed since the last log in request

            if (logInCredentials.userIdentifier !== username.value) {
                return ""
            }
            // if it hasn't changed, don't allow sending more requests
            return "The user identifier you entered is not registered yet"
        }
        else {
            return ""
        }
    })
    let permitLogIn = computed (() => {
        return !(passwordError.value.length || usernameError.value.length)
    })

    onMounted(() => {
        startAnimation.value = true
    })

    const handleLoginSuccess = async (response) => {
        const { credential } = response;
        let userData = decodeCredential(response.credential);
        await userStore.authenticationWithGoogle(credential, userData)
        setLoginResponseCode()
        console.log(logInResponseCode.value)
        if (logInResponseCode.value === 200) {
            navigateTo('/')
        }
    };

    // handle an error event
    const handleLoginError = () => {
        console.error("Login failed")
    }

    async function logIn() {
        if (!permitLogIn.value) {
            return
        }

        logInCredentials = {
            userIdentifier: username.value,
            password: password.value
        }

        await userStore.logIn(logInCredentials)
        setLoginResponseCode()
        if (logInResponseCode.value === 200) {
            navigateTo('/')
        }
    }
</script>

<template>
    <div class="w-full h-full flex-col flex">

        <div class="flex w-2/3 h-[95%] inset-y-0.5 my-auto mx-auto overflow-hidden shadow-lg rounded-xl relative overflow-hidden font-heebo text-brown bg-image">
            <div class="bg-white p-6 w-1/2 input-container"
                :class="{
                    'in-view': startAnimation
                }">
                <h1 :class="{
                    'visible': startAnimation
                }" class="text-center font-sans font-black text-2xl py-6 w-full header">
                    Log into your
                    <img src="../assets/logo.svg" class="w-1/3 inline"/>
                     account
                </h1>
                <!-- form -->
                <div :class="{
                    'visible2': startAnimation
                }" class="py-6 form" @keyup.enter="logIn()">
                    <div class="w-fit mx-auto">
                        <label for="username">
                            <i class="fa fa-user p-6 text-xl"/>
                        </label>
                        <input v-model="username" name="username" type="text"
                               placeholder="username or email"
                               class="rounded-full p-2 my-4 focus:outline-none border-asparagus hover-border-khaki duration-300 border-b-4 bg-white"/>
                        <div class="text-center text-sm text-red-700 hover:drop-shadow duration-500"> {{ usernameError }}</div>
                    </div>
                    <div class="w-fit mx-auto">
                        <label for="password">
                            <i class="fa fa-lock p-6 text-xl"/>
                        </label>
                        <input v-model="password" name="password" type="password"
                               placeholder="password"
                               class="rounded-full p-2 my-4 focus:outline-none border-asparagus hover-border-khaki duration-300 border-b-4 bg-white"/>
                        <div class="text-center text-sm text-red-700 hover:drop-shadow duration-500">
                          {{ passwordError }}
                        </div>
                    </div>
                    <button @click="logIn()" class="flex mx-auto my-6 bg-khaki font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300 focus:outline-none">
                        Log in
                    </button>
                    <div class="w-fit mx-auto focus:outline-none flex">
                        <span class="py-6 mx-2 w-max">Log in with </span>
                        <!-- <i class="social-icon fa fa-brands fa-facebook-f p-6 text-blue-600 hover:text-blue-900 duration-300"/>
                        <i class="social-icon fa fa-twitter p-6 text-indigo-700 hover:text-indigo-800 duration-300"/> -->
                        <GoogleSignInButton class="text-indigo-700 hover:text-indigo-800 duration-300 pt-2"
                            @success="handleLoginSuccess"
                            @error="handleLoginError"
                        ></GoogleSignInButton>
                    </div>

                    <NuxtLink to="/signup" class="w-fit flex mx-auto p-6 hover:scale-[1.02] duration-300 focus:outline-none">I don't have an account</NuxtLink>
                </div>
            </div>
            <div class="absolute text-white/50 text-lg bottom-2 right-2">
                Photo by Ivaylo Georgiev
            </div>

        </div>
    </div>
</template>
<style scoped>
    body, .__nuxt {
      overflow-y: hidden;
    }

    .bg-image {
        background-image: url("../assets/images/lake.jpg");
        background-size: cover;
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

    .hover-border-khaki:hover {
        border-color: var(--khaki);
    }
</style>