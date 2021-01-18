<template>
  <div class="flex justify-center text-xl">
    <div class="flex justify-between w-1/2 p-4">
      <router-link
        :to="{ 'name': 'Home' }"
        class="font-medium"
       >
        PPEConnect
      </router-link>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'Navbar',
}
</script>
