<template>
  <div class="text-center mt-8">
      <div class="text-3xl font-bold">
        Sign In
      </div>
      <div class="pt-8">
        <router-link
          :to="{ name: 'SigninAsDonor' }"
          class="inline-flex px-4 py-3 mx-3 text-center text-white bg-blue-600 rounded-lg">
          Sign in as donor
        </router-link>
        <router-link
          :to="{ name: 'SigninAsHospital' }"
          class="inline-flex px-4 py-3 mx-3 text-center text-white bg-blue-600 rounded-lg">
          Sign in as hospital
        </router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data() {
    return {
      
    }
  },
  methods: {
    
  },
}
</script>
