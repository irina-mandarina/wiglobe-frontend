<script setup>
    import {getProfilePicturePath} from "~/js/userPictures";

    const props = defineProps({
        journey: Object
    })
    let openDeletePopup = ref(false)

    let postedOnText = computed(() => {
        const date = new Date(props.journey?.postedOn)
        if (date.getDate() === new Date().getDate()) {
            return `Posted today at ${date.toLocaleTimeString()}`
        }
        else return `Posted on ${date.toDateString()} at ${date.toLocaleTimeString()}`
    })

    let profilePicturePath = computed(() =>
        getProfilePicturePath(props?.journey?.userNames?.profilePicture, props?.journey?.userNames?.gender)
    )
</script>

<template>
    <div class="absolute top-0 bg-white w-full h-full flex flex-col justify-around p-6">
        <div class="flex h-full">
            <!-- Journey info (left) -->
            <div class="w-1/2 relative h-full overflow-hidden float-left flex flex-col">
                <!-- User info -->
                <div class="w-full text-center p-6 h-1/6">
                    <NuxtLink :to="'/profile/' + journey?.userNames.username"
                              class="w-full flex flex-col">
                        <img class="mx-auto w-1/5" :src="profilePicturePath"/>
                        <span class="mx-auto">
                            <p class="p-1 font-heebo">{{ journey?.userNames.firstName }} {{ journey?.userNames.lastName }}</p>
                        </span>
                        <p class="mx-auto font-heebo">@{{ journey?.userNames.username }}</p>
                    </NuxtLink>
                </div>

                <!-- date -->
                <p v-if="journey?.startDate !== undefined && journey?.startDate !== null && journey?.endDate !== undefined && journey?.endDate !== null"
                   class="w-full text-center p-4 h-1/12">
                    From {{ new Date(journey?.startDate).toLocaleDateString() }} to {{ new Date(journey?.endDate).toLocaleDateString() }} at:
                </p>

                <!-- destination -->
                <DestinationMini
                    class="h-1/12"
                    v-if="journey?.destination !== undefined && journey?.destination !== null"
                    :destination="journey?.destination" />

                <!-- Journey description -->
                <p class="h-1/3 p-4 first-letter:font-bold first-letter:text-3xl first-letter-font-droid text-ellipsis overflow-hidden">
                    &nbsp; &nbsp; &nbsp; {{ journey?.description }}
                </p>
                <div class="font-oblique text-sm font-droid h-1/6 p-2 bg-white px-4 select-none">
                    {{ postedOnText }}
                </div>
            </div>

            <!-- Pictures and activities (right) -->
            <div class="w-1/2 h-full flex-col">
                <JourneyAttachments
                    v-if="journey?.activities || journey?.images"
                    :activities="journey?.activities" :images="journey?.images" />
            </div>

        </div>
    </div>
</template>