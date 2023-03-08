// https://nuxt.com/docs/api/configuration/nuxt-config
require('dotenv').config()

import { NuxtConfig } from '@nuxt/types';

const config: NuxtConfig = {
    buildModules: [
        // Simple usage
        '@nuxtjs/dotenv',
    ],
  build: {
    // Load environment variables into the build
    // env: {
    //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    // },
    extend(config, { isDev }) {
      if (isDev) {
        // Allow access to the FileSystem API in development mode
        config.node = {
            __dirname: true,
            __filename: true
        };
      }
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    'nuxt-vue3-google-signin',
  ],
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
  },
  env: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
  },
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
    "@": "/<rootDir>"
  },
  publicRuntimeConfig: {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID
  },
  dotenv: {
      filename: '.env'
  }
};

export default config;


// export default defineNuxtConfig({
//     // buildModules: [
//     //     // Simple usage
//     //     '@nuxtjs/dotenv',
//     // ],
//     build: {
//         // Load environment variables into the build
//         // env: {
//         //   STORAGE_ACCOUNT_NAME: process.env.STORAGE_ACCOUNT_NAME,
//         //   STORAGE_ACCOUNT_KEY: process.env.STORAGE_ACCOUNT_KEY
//         // },
//     },
//     modules: [
//         '@nuxtjs/tailwindcss',
//         '@pinia/nuxt',
//         'nuxt-vue3-google-signin',
//         '@nuxt/image-edge',
//         // '@nuxtjs/cloudinary'
//     ],
//     // env: {
//     //     STORAGE_ACCOUNT_NAME: process.env.STORAGE_ACCOUNT_NAME,
//     //     STORAGE_ACCOUNT_KEY: process.env.STORAGE_ACCOUNT_KEY
//     // },
//     googleSignIn: {
//       clientId: '1045612066490-onub3orv8hplavb7e873m4d8nedpej5o.apps.googleusercontent.com',
//     },
//     alias: {
//         pinia: "/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs"
//     },
//     // dotenv: {
//     //     filename: '.env'
//     // }
// })