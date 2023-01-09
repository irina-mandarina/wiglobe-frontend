// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

    modules: [
        '@nuxtjs/tailwindcss',
        '@pinia/nuxt',
        'nuxt-vue3-google-signin'
    ],
    googleSignIn: {
      clientId: '1045612066490-onub3orv8hplavb7e873m4d8nedpej5o.apps.googleusercontent.com',
    },
    alias: {
        pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
    }
      
})
