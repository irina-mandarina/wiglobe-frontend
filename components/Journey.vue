<template>
    <div class="shadow-md rounded-lg w-2/3 mx-auto m-6">
        <div class="flex">

            <!-- Journey picture (left) -->
            <div class="w-1/2 h-fit float-left">
                <img class="h-full" src="https://picsum.photos/1000"/>
            </div>

            <!-- Journey info (right) -->
            <div class="w-1/2 float-right h-full">
                 <!-- User info -->
                <div class="w-1/2 text-center m-6">
                    <NuxtLink to="/profile">
                        <img class="mx-auto" src="https://picsum.photos/50"/>
                        <span class="mx-auto"> 
                            <p class="p-1 font-heebo">First name Last name</p>
                        </span>
                        <p class="mx-auto mb-2 font-heebo">@username</p>  
                    </NuxtLink>
                </div>

                

                <!-- Journey description -->
                <p class="my-6 p-4">Description. Description. Description. Description. Description. Description. Description. Description. Description. Description. </p>
            </div>
               
        </div>
        
    </div>
</template>