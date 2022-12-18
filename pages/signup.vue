<script setup>
    // let userStore = useUserStore()
    let username = ref(null)
    let password = ref(null)
    let startAnimation = ref(false)
    let form1ok = ref(false)
    let form2ok = ref(false)

    onMounted(() => {
        startAnimation.value = true
    })

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
        <div class="bg-white h-2/3 w-full mt-60 relative input-container"
            :class="{
                'in-view': startAnimation
            }">
            
            <div class="absolute w-full bg-white inset-x-0 bottom-10">
                <div class="mx-auto w-fit relative">
                    <span class="py-6">Sign up with </span>
                    <i class="social-icon fa fa-google p-6 text-red-600 hover:text-red-800 duration-300"/>
                    <i class="social-icon fa fa-facebook p-6 text-blue-600 hover:text-blue-900 duration-300"/>
                    <i class="social-icon fa fa-twitter p-6 text-indigo-700 hover:text-indigo-800 duration-300"/>
                </div>
                <NuxtLink to="/login" class="w-fit flex mx-auto relative pb-6 hover:scale-[1.02] duration-300">I already have an account</NuxtLink>
            </div>

            <!-- form 1 -->
            <div :class="{
                'visible2': startAnimation,
                'form-disappear': form1ok
            }" class="py-6 form-1 w-full absolute">
                <div class="w-fit mx-auto">
                    <label for="username">
                       First name
                    </label>
                    <input name="username" type="text" class="border rounded-full p-2 my-4 focus:outline-none"/>
                </div>
                <div class="w-fit mx-auto">
                    <label for="password">
                        Last name
                    </label>
                    <input name="password" type="password" class="border rounded-full p-2 my-4 focus:outline-none"/>
                </div>
                <button @click="form1ok = true" class="flex mx-auto mt-2 mb-4 font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                    <i class="fa fa-arrow-right hover:scale-x-150 origin-left duration-500"/>
                </button>
            </div>

            <!-- form 2 -->
            <div :class="{
                'form-appear': form1ok && !form2ok,
                'form-disappear': form2ok
            }" class="pt-6 pb-40 form w-full absolute">
                <div class="w-fit mx-auto">
                    <label for="birthdate">
                        Date of birth:
                    </label>
                    <input name="birthdate" type="date" class="border rounded-full p-2 my-4 focus:outline-none"/>
                </div>
                <div class="w-fit mx-auto">
                    <i class="fa fa-female p-2"/>
                    <input name="female" type="radio" class="border rounded-full px-2 my-4 focus:outline-none"/>

                    <i class="fa fa-male p-2 ml-6"/>
                    <input name="male" type="radio" class="border rounded-full px-2 my-4 focus:outline-none"/>

                    <i class="fa fa-user p-2 ml-6"/>
                    <input name="male" type="radio" class="border rounded-full px-2 my-4 focus:outline-none"/>
                </div>
                <div class="w-fit mx-auto">
                    <label for="bio" class="py-6">
                        Something about you: 
                    </label>
                    <textarea name="bio" type="text" class="border resize-none rounded-full p-2 my-4 focus:outline-none" placeholder="Bio"/>
                </div>
                <button @click="form2ok = true" class="flex mx-auto mt-2 mb-4 font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                    <i class="fa fa-arrow-right hover:scale-x-150 origin-left duration-500"/>
                </button>
            </div>

            <!-- form 3 -->
            <div :class="{
                'form-appear': form2ok
            }" class="pt-6 pb-40 form w-full absolute">
                <input name="username" type="text"     class="mx-auto flex border rounded-full p-2 px-4 my-6 focus:outline-none" placeholder="username"/>
                <input name="password" type="password" class="mx-auto flex border rounded-full p-2 px-4 my-6 focus:outline-none" placeholder="password"/>
                <input name="password" type="password" class="mx-auto flex border rounded-full p-2 px-4 my-6 focus:outline-none" placeholder="Repeat password"/>
                <button @click="userStore.signup({username, password})" class="flex mx-auto mt-2 mb-4 bg-khaki font-bold tracking-wider py-2 px-6 rounded-full mx-auto duration-300">
                    Sign up
                </button>
            </div>

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

    .input-container:not(.in-view) {
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
        transition-duration: all 2s ease-in-out;
        transition-delay: 1s;
    }

    .form:not(.form-appear){
        transform: translateY(400%);
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