<script setup>
    import { useUserStore } from '~~/stores/UserStore'
    const userStore = useUserStore()

    let settingsCategories = ref([
        {
            'category': 'Personal information',
            'subcategories': [
                {
                    'subcategory': 'Names',
                    'value': userStore.firstName + " " + userStore.lastName
                },
                {
                    'subcategory': 'Birthdate',
                    'value': null
                },
                {
                    'subcategory': 'Biography',
                    'value': null
                },
                {
                    'subcategory': 'Gender',
                    'value': null
                },
                {
                    'subcategory': 'Profile image',
                    'value': null
                }
            ]
        },
        
        {
            'category': 'Privacy settings',
            'subcategories': [
                {
                    'subcategory': 'Profile privacy',
                    'value': null
                },
                {
                    'subcategory': 'Default journey privacy',
                    'value': null
                },
            ]
        }
    ])
    let selectedCategory = ref('Personal information')

    function select(category) {
        // if (selectedCategory.value === category) {
        //     selectedCategory.value = null
        // }
        // else {
            selectedCategory.value = category
        // }
    }
</script>
<template>
    <NuxtLayout name="default" class="">

        <div class="mx-auto w-full h-screen fixed bg-gray-200 p-2 flex"> 
            <div class="w-1/4 h-full rounded-lg shadow-md p-2 bg-white">
                <div v-for="setting in settingsCategories" class="p-4 my-4 rounded-lg" @click="select(setting.category)" :class="{
                    'bg-gray-100': selectedCategory === setting.category
                }">
                    {{ setting.category }}
                </div>
            </div>

            <div class="w-3/4 mx-2 h-full rounded-lg shadow-md p-2 bg-white">
                <div v-if="selectedCategory" v-for="subcategory in settingsCategories.filter(it => (it.category === selectedCategory))[0].subcategories"
                    class="p-4 border-b flex">
                    <div class="px-6 py-2 w-1/3">
                        {{ subcategory.subcategory }}
                    </div>
                    <div class="px-6 py-2 w-1/3 text-right">
                        {{ subcategory.value }}
                    </div>
                    <div class="px-6 py-2 w-1/3 float-left">
                        <i class="fa fa-pencil" />
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="mx-auto rounded-lg bg-gray-100 h-screen">
            
            <div v-for="category in settingsCategories" class="flex">

                
                <div class="border-b w-1/4 p-4 border-gray-400 text-lg" @click="selectedCategory = category.category"
                    :class="{
                        'bg-gray-200': selectedCategory === category.category
                }">
                    <i class="fa fa-user p-3 hover:scale-125 duration-200" /> {{ category.category }}
                </div>

                
                <div>
                    <div v-if="selectedCategory === category.category" v-for="subcategory in category.subcategories" class="border-b p-4 border-gray-400">
                        {{ subcategory }}
                    </div>
                </div>
            </div>
        </div> -->
    </NuxtLayout>
</template>

<style scoped>
    .selected {
        background-color: rgb(178, 178, 178);
    }
</style>