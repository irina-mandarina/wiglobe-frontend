<script setup>
    const props = defineProps({
        destination: Object
    })
    let showFlag = ref(false)
    let flagLink = ref("bg-[url('https://flagcdn.com/224x168/" + props.destination.country.countryCode.toLowerCase() + ".png')]")

    let flagDisplayClass = computed(() => {
        if (showFlag.value) {
            return flagLink.value
        }
        else return 'bg-transparent'
    })
</script>

<template>
    <div @click="navigateTo('/destinations/' + destination.id)"
    class="rounded-2xl border w-5/6 mx-auto relative"
    @mouseenter="showFlag = true" @mouseleave="showFlag = false"
    >
        <div class="duration-300 ease-in-out bg-no-repeat bg-origin-border absolute w-full h-full top-0 z-0"
        :class="flagDisplayClass"
        >
        </div>
        <div class="text-center font-heebo p-2 font-medium z-50 bg-transparent">
            <i class="fa fa-map-pin px-2" />
            {{ destination.name }}, {{ destination.country.countryName }}
        </div>
    </div>
</template>