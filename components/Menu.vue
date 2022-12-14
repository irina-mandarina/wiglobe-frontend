<script setup>
    let hide = ref(false)
    function toggleMenu() {
        hide.value = !hide.value
    }
</script>

<template>
    <nav class="fixed right-0 w-1/6 float-right font-heebo font-[400] t-0 text-lg">
        <div class="w-full" @click="toggleMenu()">
            <i class="fa fa-bars p-6 pr-0 absolute right-4 w-1/6" />
        </div>
        <ul class="float-right mt-10">
            <li class="w-full border-b px-6 py-4">
                <NuxtLink to="/profile" class="text-lg hover:text-gray-800">
                    <i class="fa fa-user" :class="{
                        'rotate-icon': hide
                    }" />
                    <span class="px-2 relative show" :class="{
                        'hide-menu': hide
                    }"> Profile </span>
                </NuxtLink>
            </li>
            <li class="w-full border-b px-6 py-4">
                <NuxtLink to="/friends" class="text-lg hover:text-gray-800">
                    <i class="fa fa-address-book" :class="{
                        'rotate-icon': hide
                    }" />
                    <span class="px-2 relative show" :class="{
                        'hide-menu': hide
                    }"> Friends </span>
                </NuxtLink>
            </li>
            <li class="w-full border-b px-6 py-4">
                <NuxtLink to="/friend-requests" class="text-lg hover:text-gray-800">
                    <i class="fa fa-users" :class="{
                        'rotate-icon': hide
                    }" />
                    <span class="px-2 relative show" :class="{
                        'hide-menu': hide
                    }"> Friend requests </span>
                </NuxtLink>
            </li>
            <li class="w-full border-b px-6 py-4 block">
                <NuxtLink to="/friend-requests" class="text-lg hover:text-gray-800">
                    <i class="fa fa-gears" :class="{
                        'rotate-icon': hide
                    }" />
                    <span class="px-2 relative show" :class="{
                        'hide-menu': hide
                    }"> Settings </span>
                </NuxtLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped>
    .rotate-icon {
        transform: rotateZ(360deg);
        position: absolute;
        right: 6rem;
        transition-duration: 1s;
    }

    .hide-menu {
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s linear 0.33s, opacity 0.33s;
    }

    .show:not(.hide-menu) {
        transform: translateX(-500%);
        transition: all 0.3s linear;
    }

    .fa:hover {
        color: var(--phtalo);
    }
</style>