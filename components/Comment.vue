<script setup>
    defineProps({
        comment: Object
    })
</script>

<template>
    <div class="shadow-md rounded-xl w-1/3 p-6">
        <!-- Comment options -->
        <div class="float-right">
            <span class="p-2">
                ...
            </span>
        </div>
        <!-- Comment user -->
        <div class="p-2">
            <NuxtLink  :to="'/profile/' + comment.userNames.username">
                <img class="p-2 ml-2 float-left" src="https://picsum.photos/50"/>
                <span class="flex mb-0">  
                    <p class="p-1 font-droid"> {{ comment.userNames.firstName }} {{ comment.userNames.lastName }}</p>
                </span>
                <p class="flex p-2 pt-0 mt-0">@{{ comment.userNames.username }}</p>  
            </NuxtLink>
        </div>
        <!-- Comment body -->
        <div class="w-full">
            <p class="py-2 px-6 text-sm italic">
                {{ new Date(comment.postedOn).toDateString() }}
            </p>
            <p class="p-2 pb-8 m-4">
                {{ comment.content }}
            </p>
        </div>
    </div>
</template>