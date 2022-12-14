<template>
    <div class="shadow-md rounded-lg w-1/3">
        <!-- Review options -->
        <div class="float-right">
            <span class="p-2">
                ...
            </span>
        </div>
        <!-- Review user -->
        <div class="w-full text-center">
            <NuxtLink to="/">
                <img class="mx-auto" src="https://picsum.photos/50"/>
                <span class="mx-auto"> 
                    <p class="p-1 font-heebo">First name Last name</p>
                </span>
                <p class="mx-auto mb-2 font-metrophobic text-gray-900">@username</p>  
            </NuxtLink>
        </div>
        <!-- Review star rating -->
        <div class="w-full text-center">
            <span>* * * * *</span>
        </div>
        <!-- Review body -->
        <div class="w-full text-center">
            <p class="p-2 pb-8 m-4 font-droid font-oblique">Review body. This is the review's content. The review's content is in this div.</p>
        </div>
    </div>
</template>