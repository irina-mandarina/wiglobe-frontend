<script setup>
  import { useUserStore } from '~~/stores/UserStore'
  import { useFollowStore } from '~~/stores/FollowStore'
    
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