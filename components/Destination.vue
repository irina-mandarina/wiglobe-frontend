<template>
    <div class="shadow-md rounded-lg w-1/2">
        <!-- Destination Header -->
        <div class="w-full text-center">
            <div class="text-center w-full my-4">
                <h1 class="font-bold font-heebo tracking-wider w-full py-8 text-xl text-white bg-img text-drop-shadow">
                    Destination name
                </h1>
            </div>
        </div>
        <!-- Destination info -->
        <div class="w-full text-green-900 p-6 text-center relative">
            <div class="mx-auto w-full font-droid">
                <span>* * * * *</span>
                <p>Average rating: 4.6 (5307 reviews)</p>
                <p>7049 visits</p>
            </div>
            <div class="flex w-full justify-evenly my-4">
                <span>Class: Mountain</span>
                <span>Location: Spain, Eurpope</span>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .text-drop-shadow {
        text-shadow: 0 0 20px black;
    }

    .box-drop-shadow {
        filter: drop-shadow(0 0 5px rgb(0, 31, 16))
    }

    .bg-img {
        background-image: url('https://picsum.photos/1000/300');
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>