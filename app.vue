<script setup>
  import axios from 'axios'
  import { useUserStore } from '~~/stores/UserStore'
  import { useFollowStore } from '~~/stores/FollowStore'
  import { useJourneyStore } from '~~/stores/JourneyStore'
  import { cleanLocalStorage } from './js/localStorageUtil'

  const userStore = useUserStore()
  const followStore = useFollowStore()
  const journeyStore = useJourneyStore()
  const router = useRouter()

  onBeforeMount(async () => {
    await userStore.init()
    await followStore.init()
  })
  
  router.beforeEach(async (to, from, next) => {
    if (to.path === '/friends' || 
    to.path === '/follow-requests' || 
    to.path.includes('profile')) {
      await followStore.init() 
      if (to.path.includes('profile')) {
        await journeyStore.getLoggedUserJourneys()
      }
      next()
    }

    else next()

  })

  axios.interceptors.request.use(function (config) {
    return config;
    
  }, function (error) {
      // cleanLocalStorage()
      navigateTo('/login')
    // Do something with request error
    return Promise.reject(error);
  })

  axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    if (error.response.status === 401) {
      cleanLocalStorage()
      navigateTo('/login')
    }
    console.log(error)
    return Promise.reject(error);
  });
</script>

<template>
  <Head>
    <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Heebo" />
    <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Metrophobic" />
    <Link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Droid+Serif" />
    <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
<!--    <Link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />-->

    </Head>
    <!-- <Script src="/dist/client.js" defer allow-file-access-from-files /> -->

  <NuxtPage class="h-full" />
</template>
<style>
  :root {
    --brown: #502419;
    --asparagus: #7EA172;
    --khaki: #C7CB85;
    --fawn: #E7A977;
    --peach: #EBBE9B;
    --phtalo: #14342B;
    --dark-blue: #06032b;
    background-color: rgb(215, 215, 216);
  }

  body, html {
    color: var(--dark-blue)
  }

  body:focus {
    outline: none;
  }

  .bg-peach {
    background-color: var(--peach);
  }

  .bg-fawn {
    background-color: var(--fawn);
  }

  .bg-brown {
    background-color: var(--brown);
  }

  .bg-asparagus {
    background-color: var(--asparagus);
  }

  .bg-pthalo {
    background-color: var(--pthalo);
  }

  .bg-khaki {
    background-color: var(--khaki);
  }

  .text-brown {
    color: var(--brown);
  }
  
  .text-peach {
    color: var(--peach);
  }

  .text-fawn {
    color: var(--fawn);
  }

  .text-khaki {
    color: var(--khaki);
  }
  
  .text-asparagus {
    color: var(--asparagus);
  }
  
  .text-phtalo {
    color: var(--phtalo);
  }

  .text-dark-blue {
    color: var(--dark-blue)
  }

  .border-phtalo {
    border-color: var(--phtalo);
  }

  .border-peach {
    border-color: var(--peach);
  }
  
  .border-asparagus {
    border-color: var(--asparagus);
  }

  .border-khaki {
    border-color: var(--khaki);
  }

  .border-dark-blue {
    border-color: var(--dark-blue);
  }

  .font-heebo {
    font-family: Heebo;
  }
  
  .font-droid {
    font-family: 'Droid Serif';
    font-weight: 300;
  }
  
  .font-metrophobic {
    font-family: Metrophobic;
    font-weight: light;
  }

  body {
    font-family: Metrophobic;
  }

  .font-oblique {
    font-style: oblique;
  }

  html, body, #__nuxt {
    height: 100%;
  }

  nuxt-link {
      cursor: pointer;
      outline-width: 0;
  }

  nuxt-link:focus {
      outline-width: 0;
  }
</style>
