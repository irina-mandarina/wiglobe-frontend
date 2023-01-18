<script setup>
    defineProps ({
        visibility: String
    })

    let showVisibilityOptions = ref(false)
</script>

<template>
    <div class="absolute right-4">
        <span class="p-2 w-fit h-fit" @click="showVisibilityOptions = !showVisibilityOptions">
            <i class="fa fa-file"  v-if="visibility === 'DRAFT'"/>
            <i class="fa fa-users"  v-if="visibility === 'FRIEND_ONLY'"/>

            <div v-if="showVisibilityOptions" class="absolute top-8 right-6">
                <ul class="bg-gray-50 overflow-hidden rounded-md shadow-md w-max">
                    <li class="border-b p-2 w-full" @click="visibility = 'PUBLIC'" :class="{
                        'bg-gray-100': visibility === 'PUBLIC'
                    }">
                        Public
                    </li>
                    <li class="border-b p-2 w-full" @click="visibility = 'PRIVATE'" :class="{
                        'bg-gray-100': visibility === 'PRIVATE'
                    }">
                        Private
                    </li>
                    <li class="border-b p-2 w-full" @click="visibility = 'FRIEND_ONLY'" :class="{
                        'bg-gray-100': visibility === 'FRIEND_ONLY'
                    }">
                        Friends only
                    </li>
                    <li class="p-2 w-full" @click="visibility = 'DRAFT'" :class="{
                        'bg-gray-100': visibility === 'DRAFT'
                    }">
                        Draft
                    </li>
                </ul>
            </div>
        </span>

        <span class="p-2">
            x
        </span>

    </div>
</template>