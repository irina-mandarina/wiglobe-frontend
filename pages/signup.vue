<script setup>
    import { useUserStore } from '~~/stores/UserStore'

    const userStore = useUserStore()

    let username = ref(null)
    let email = ref(null)
    let password = ref(null)
    let passwordRep = ref(null)
    let bio = ref(null)
    let birthdate = ref(null)
    let gender = ref(null)
    let firstName = ref(null)
    let lastName = ref(null)
    let startAnimation = ref(false)
    let formOnDisplay = ref(1)

    onMounted(() => {
        startAnimation.value = true
    })

    async function signUp() {
        const success = await userStore.signUp(
            {firstName: firstName.value,
                lastName: lastName.value,
                username: username.value,
                password: password.value,
                bio: bio.value,
                gender: gender.value,
                birthdate: birthdate.value,
                email: email.value
            }
        )
        if (success) {
            navigateTo('/')
        }
    }

</script>

<template>
    <div class="w-2/3 h-[700px] mt-6 mx-auto shadow-lg rounded-xl relative overflow-hidden font-heebo text-brown">
        <div class="bg-image absolute">
        </div>
        <h1 :class="{
            'visible': startAnimation
        }" class="text-center font-sans text-2xl py-6 w-full font-black tracking-wide text-white header absolute mt-16">
            Create an account for
            <span class="font-khaki">NAME</span>
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
            }" class="pt-20 form-1 w-full absolute">
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
            }" class="py-6 form w-full absolute">
                <div class="w-fit mx-auto">
                    <label for="birthdate">
                        Date of birth:
                    </label>
                    <input v-model="birthdate" name="birthdate" type="date" class="border rounded-full p-2 my-4 focus:outline-none"/>
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
                    <textarea v-model="bio" name="bio" type="text" class="border resize-none rounded-full p-2 my-4 focus:outline-none" placeholder="Bio"/>
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
            }" class="py-6 form w-full absolute">
                <input v-model="email"       name="email"    type="email"    class="mx-auto flex border rounded-full p-2 px-4 my-6 focus:outline-none" placeholder="email"/>
                <input v-model="username"    name="username" type="text"     class="mx-auto flex border rounded-full p-2 px-4 my-6 focus:outline-none" placeholder="username"/>
                <input v-model="password"    name="password" type="password" class="mx-auto flex border rounded-full p-2 px-4 my-6 focus:outline-none" placeholder="Repeat password"/>
                <input v-model="passwordRep" name="password" type="password" class="mx-auto flex border rounded-full p-2 px-4 my-6 focus:outline-none" placeholder="password"/>
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
        }" class="w-full bg-white mt-0 relative sign-in-box-bottom">
            <div class="mx-auto w-fit">
                <span class="py-6">Sign up with: </span>
                <i class="social-icon fa fa-google p-6 text-red-600 hover:text-red-800 duration-300"/>
                <i class="social-icon fa fa-facebook p-6 text-blue-600 hover:text-blue-900 duration-300"/>
                <i class="social-icon fa fa-twitter p-6 text-indigo-700 hover:text-indigo-800 duration-300"/>
            </div>
            <NuxtLink to="/login" class="w-fit flex mx-auto pb-6 hover:scale-[1.02] duration-300">I already have an account</NuxtLink>
        </div>
    </div>
</template>

<style scoped>
    .bg-image {
        background-image: url("https://picsum.photos/2000");
        background-size: cover;
        width: 100%;
        height: 800px;
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
        transition: all 1s ease-in-out;
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