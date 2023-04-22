<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    import { GoogleSignInButton } from "vue3-google-signin"
    import { decodeCredential } from "vue3-google-signin"

    const userStore = useUserStore()

    let username = ref(null)
    let email = ref(null)
    let password = ref(null)
    let passwordRep = ref(null)
    let biography = ref(null)
    let birthdate = ref(null)
    let gender = ref(null)
    let firstName = ref(null)
    let lastName = ref(null)

    let signUpCredentials = {
        email: null,
        username: null,
        password: null,
        biography: null,
        birthdate: null,
        gender: null,
        firstName: null,
        lastName: null
    }
    let emailError = computed(() => {
        if (email.value === null) {
            return ' '
        }
        else if (!(/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value))) {
            return 'the email you entered is not valid'
        }
        else if (userStore.signUpResponse && userStore.signUpResponse.emailTaken !== undefined && userStore.signUpResponse.emailTaken) {
            if (email.value === signUpCredentials.email) {
                return 'email is taken'
            }
            else return ''
        }
        else {
            return ''
        }
    })

    let usernameError = computed(() => {
        if (username.value === null) {
            return ' '
        }
        else if (username.value.length < 4) {
            return 'username should be at least 4 characters'
        }
        else if (!(/^[A-Za-z][A-Za-z0-9_]/.test(username.value))) {
            return 'username contains invalid characters'
        }
        else if (userStore.signUpResponse && userStore.signUpResponse.usernameTaken !== undefined && userStore.signUpResponse.usernameTaken) {
            if (username.value === signUpCredentials.username) {
                return 'username is taken'
            }
            else return ''
        }
        else {
            return ''
        }
    })
    
    let birthdateError = computed(() => {
        if (birthdate.value === null) {
            return ' '
        }
        else if (new Date().setFullYear(new Date().getFullYear() - 14) < new Date(birthdate.value)) {
            return 'You should be at least 14 years old to register.'
        }
        else  {
            return ''
        }

    })

    let passwordError = computed(() => {
        if (password.value === null) {
            return ' '
        }
        else if (!password.value) {
            return 'Enter a password'
        }
        else if (!(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/.test(password.value))) {
            return 'Weak password'
        }
        else {
            return ''
        }
    })

    let passwordRepError = computed(() => {
        if (passwordRep.value === null) {
            return ' '
        }
        else if (passwordRep.value.length) {
            if (password.value !== passwordRep.value && !passwordError.value.length) {
                return 'Passwords do not match'
            }
        }
        if (password.value === passwordRep.value) {
            return ''
        }
    })
    let permitSignUp = computed (() => {
        return !(passwordError.value.length || passwordRepError.value.length || usernameError.value.length || emailError.value.length || birthdateError.value.length)
    })

    let logInResponseCode = ref(userStore.logInResponseCode)
    function setLoginResponseCode() {
        logInResponseCode.value = userStore.logInResponseCode
    }
    let startAnimation = ref(false)
    let formOnDisplay = ref(1)

    onMounted(() => {
        startAnimation.value = true
    })

    async function signUp() {
        if (!permitSignUp.value) {
            return
        }

        signUpCredentials = {
            firstName: firstName.value,
            lastName: lastName.value,
            username: username.value,
            password: password.value,
            biography: biography.value,
            gender: gender.value,
            birthdate: birthdate.value,
            email: email.value
        }
        
        await userStore.signUp(signUpCredentials)

        if (userStore.signUpResponse === 201 || (userStore.signUpResponse.emailTaken && userStore.signUpResponse.usernameTaken)) {
            navigateTo('/')
        }
    }

    const handleSignUpSuccess = async (response) => {
        // const { credential } = response
        // let userData = decodeCredential(response.credential)
        // console.log("Access Token: ", credential);
        // console.log(userData)
        //
        // signUpCredentials = {
        //     firstName: userData.given_name,
        //     lastName: userData.family_name,
        //     email: userData.email,
        //     username: userData.email,
        //     password: credential
        // }
        //
        // await userStore.signUp(signUpCredentials)
        //
        // if (userStore.signUpResponse === 201) {
        //     navigateTo('/')
        // }
        const { credential } = response;
        let userData = decodeCredential(response.credential);
        await userStore.authenticationWithGoogle(credential, userData)
        setLoginResponseCode()
        console.log(logInResponseCode.value)
        if (logInResponseCode.value === 200) {
            navigateTo('/')
        }
    }
     // handle an error event
    function handleSignUpError() {
        console.log('error')
    }
</script>

<template>
    <div class="w-2/3 h-11/12 m-auto shadow-lg rounded-xl relative overflow-hidden font-heebo text-brown bg-image">
        <h1 :class="{
            'visible': startAnimation
        }" class="text-center font-sans text-2xl py-6 w-full font-black tracking-wide text-brown header overflow-y-visible absolute mt-16">
            Create an account for
            <img src="../assets/logo.svg" class="w-1/6 inline"/>
        </h1>


        <div class="bg-white h-1/2 w-full mt-60 relative input-container"
            :class="{
                'in-view': startAnimation
            }">
            

            <!-- form 1 -->
            <div :class="{
                'visible2': startAnimation,
                'form-disappear': formOnDisplay !== 1,
                'form-appear': formOnDisplay === 1
            }" class="pt-20 form-1 w-full absolute bottom-0">
                <div class="w-fit mx-auto">
                    <label for="fistName">
                       First name
                    </label>
                    <input v-model="firstName" name="fistName" type="text" class="border rounded-full p-2 my-4 focus:outline-none"/>
                </div>
                <div class="w-fit mx-auto">
                    <label for="lastName">
                        Last name
                    </label>
                    <input v-model="lastName" name="lastName" type="text" class="border rounded-full p-2 my-4 focus:outline-none"/>
                </div>
                <button @click="formOnDisplay = 2" class="flex mx-auto mt-2 mb-4 font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                    <i class="fa fa-arrow-right hover:scale-x-150 origin-left duration-500"/>
                </button>
            </div>

            <!-- form 2 -->
            <div :class="{
                'form-disappear': formOnDisplay !== 2,
                'form-appear': formOnDisplay === 2
            }" class="py-6 form w-full absolute bottom-0">
                <div class="w-fit mx-auto">
                    <label for="birthdate">
                        Date of birth:
                    </label>
                    <input v-model="birthdate" name="birthdate" type="date" class="border rounded-full p-2 my-4 focus:outline-none"/>
                    <div class="text-center text-sm text-red-700 hover:drop-shadow duration-500">{{ birthdateError }}</div>
                </div>
                <div class="w-fit mx-auto">
                    <i class="fa fa-female p-2"/>
                    <input v-model="gender" name="gender" value="FEMALE" type="radio" class="border rounded-full px-2 my-4 focus:outline-none"/>

                    <i class="fa fa-male p-2 ml-6"/>
                    <input v-model="gender" name="gender" value="MALE"   type="radio" class="border rounded-full px-2 my-4 focus:outline-none"/>

                    <i class="fa fa-user p-2 ml-6"/>
                    <input v-model="gender" name="gender" value="OTHER"  type="radio" class="border rounded-full px-2 my-4 focus:outline-none"/>
                </div>
                <div class="w-fit mx-auto">
                    <textarea v-model="biography" name="biography" type="text" class="border resize-none rounded-full p-2 my-4 focus:outline-none" placeholder="Biography"/>
                </div>

                <div class="flex mx-auto w-min">
                    <button @click="formOnDisplay = 1" class=" mt-2 mb-4 font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                        <i class="fa fa-arrow-left hover:scale-x-150 origin-left duration-500"/>
                    </button>
                    <button @click="formOnDisplay = 3" class="mt-2 mb-4 font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                        <i class="fa fa-arrow-right hover:scale-x-150 origin-left duration-500"/>
                    </button>    
                </div>
            </div>

            <!-- form 3 -->
            <div :class="{
                'form-disappear': formOnDisplay !== 3,
                'form-appear': formOnDisplay === 3
            }" class="py-4 form w-full absolute bottom-0">
                <input v-model="email"       name="email"    type="email"    class="mx-auto flex border rounded-full p-2 px-4 mb-2 focus:outline-none" placeholder="email"/>
                <div class="text-center text-sm text-red-700 hover:drop-shadow duration-500">{{ emailError }}</div>

                <input v-model="username"    name="username" type="text"     class="mx-auto flex border rounded-full p-2 px-4 my-2 focus:outline-none" placeholder="username"/>
                <div class="text-center text-sm text-red-700 hover:drop-shadow duration-500">{{ usernameError }}</div>

                <input v-model="password"    name="password" type="password" class="mx-auto flex border rounded-full p-2 px-4 my-2 focus:outline-none" placeholder="Repeat password"/>
                <div class="text-center text-sm text-red-700 hover:drop-shadow duration-500">{{ passwordError }}</div>

                <input v-model="passwordRep" name="password" type="password" class="mx-auto flex border rounded-full p-2 px-4 my-2 focus:outline-none" placeholder="password"/>
                <div class="text-center text-sm text-red-700 hover:drop-shadow duration-500">{{ passwordRepError }}</div>
                <div class="flex mx-auto w-min">
                    <button @click="formOnDisplay = 2" class="mt-2 mb-4 font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                        <i class="fa fa-arrow-left hover:scale-x-150 origin-left duration-500"/>
                    </button>
                    <button @click="signUp()" class="mt-2 mb-4 bg-khaki w-max font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                        Sign up
                    </button>
                </div>
            </div>

        </div>
        <div :class="{
            'in-view': startAnimation
        }" class="w-full bg-white mt-0 sign-in-box-bottom absolute bottom-0 p-4">
            <div class="mx-auto w-fit relative">
                <span class="py-6">Sign up with: </span>
                <GoogleSignInButton class="text-indigo-700 hover:text-indigo-800 duration-300 align-middle"
                            @success="handleSignUpSuccess"
                            @error="handleSignUpError()"
                ></GoogleSignInButton>
            </div>
            <NuxtLink to="/login" class="w-fit flex mx-auto pb-6 hover:scale-[1.02] duration-300">I already have an account</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
    .bg-image {
        background-image: url("../assets/images/mountain_rocks.jpg");
        background-size: cover;
    }

    .in-view {
        transform: translateY(0);
        transition-duration: 2s;
        transition-delay: 0.5s;
    }

    .input-container:not(.in-view),
    .sign-in-box-bottom:not(.in-view) {
        transform: translateY(200%);
    }

    .header:not(.visible) {
        opacity: 0;
    }

    .visible {
        opacity: 1;
        transition: all 1s ease-in-out;
        transition-delay: 3s;
    }

    .form-1:not(.visible2) {
        opacity: 0;
    }

    .visible2 {
        opacity: 1;
        transition: all 1s ease-in-out;
        transition-delay: 4s;
    }

    .form-disappear {
        transform: translateX(200%);
        transition: all 0.5s ease-in-out;
    }

    .form-appear {
        transform: translateY(0);
        transition-duration: all 1s ease-in-out;
        transition-delay: 0.5s;
    }

    .form:not(.form-appear){
        transform: translateX(-200%);
        transition-duration: all 1s ease-in-out;
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