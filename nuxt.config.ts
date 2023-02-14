// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-vue3-google-signin',
        '@nuxt/image-edge',
        // '@nuxtjs/cloudinary'
    ],
    googleSignIn: {
      clientId: '1045612066490-onub3orv8hplavb7e873m4d8nedpej5o.apps.googleusercontent.com',
    },
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    },
    // image: {
        // cloudinary: {
        //     cloudName: 'dmvzhoork',
        //     apiKey: '715129813453547',
        //     baseURL: 'https://res.cloudinary.com/${YOUR_SPACE_ID}/image/upload/${YOUR_FOLDER_ID}'
        // }
    // }
})

