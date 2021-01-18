<template>
  <div>
    <h1 class="pt-24 text-6xl font-medium text-center">PPEConnect</h1>
    <p class="pt-6 text-xl text-center">
      A logistical hub to connect healthcare equipment donors with the medical industry
    </p>
    <div class="flex justify-center pt-8">
      <router-link
      :to="{ name: 'Donors' }"
      class="inline-flex px-4 py-3 mx-3 text-center text-white bg-blue-600 rounded-lg">
        Sign up to Donate
      </router-link>
      <router-link
        :to="{ name: 'Hospitals' }"
        class="inline-flex px-4 py-3 mx-3 text-center text-white bg-blue-600 rounded-lg">
        Sign up to Receive
      </router-link>
    </div>
    <div class="flex justify-center pt-8">
      <router-link
      :to="{ name: 'Signin' }"
      class="inline-flex px-4 py-3 mx-3 text-center text-blue-400">
        Already signed up?
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
}
</script>
