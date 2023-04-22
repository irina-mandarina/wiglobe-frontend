<script setup>
    const props = defineProps({
        destination: Object
    })
    let showFlag = ref(false)
    let flagLink = ref("bg-[url('https://flagcdn.com/80x60/" + props?.destination?.country?.countryCode?.toLowerCase() + ".png')]")

    let flagDisplayClass = computed(() => {
        if (showFlag.value) {
            return flagLink.value
        }
        else return 'bg-white'
    })
</script>

<template>
    <div v-if="destination" @click.stop="navigateTo('/destinations/' + destination.id)"
    class="rounded-2xl border w-5/6 mx-auto relative overflow-hidden cursor-pointer"
    @mouseenter="showFlag = true" @mouseleave="showFlag = false"
    >
        <div class="duration-300 ease-in-out bg-no-repeat bg-center absolute w-full h-full top-0 z-0 blur-sm"
        :class="flagDisplayClass"
        >
        </div>
        <div class="text-center font-heebo p-2 font-medium z-50 bg-transparent relative">
            <i class="fa fa-map-pin px-2" />
            {{ destination?.name }}, {{ destination?.country?.countryName }}
        </div>
    </div>
</template>