<template>
    <div class="shadow-md rounded-lg w-1/3">
        <!-- Comment options -->
        <div class="float-right">
            <span class="p-2">
                ...
            </span>
        </div>
        <!-- Comment user -->
        <div class="p-2">
            <NuxtLink to="/">
                <img class="p-2 ml-2 float-left" src="https://picsum.photos/50"/>
                <span class="flex mb-0">  
                    <p class="p-1 font-droid">First name Last name</p>
                </span>
                <p class="flex p-2 pt-0 mt-0">@username</p>  
            </NuxtLink>
        </div>
        <!-- Comment body -->
        <div class="w-full">
            <p class="p-2 pb-8 m-4">Comment body. This is the comment's content. The comment's content is in this div.</p>
        </div>
    </div>
</template>