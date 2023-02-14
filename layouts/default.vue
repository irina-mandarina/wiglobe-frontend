<script setup>
  import { useUserStore } from '~~/stores/UserStore'
  import { useFollowStore } from '~~/stores/FollowStore'
  // import { useJourneyStore } from '~~/stores/JourneyStore'
    
  // const journeyStore = useJourneyStore()
  const userStore = useUserStore()
  const followStore = useFollowStore()

  onBeforeMount(async () => {
    await userStore.init()
    await followStore.init()
  })
</script>

<template>
    <div>
      <Navigation />
      <slot/>
    </div>
</template>