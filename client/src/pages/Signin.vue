<template>
  <div class="flex justify-center pt-8">
       <router-link
        :to="{ name: 'SigninAsDonor' }"
        class="inline-flex px-4 py-3 mx-3 text-center text-white bg-blue-600 rounded-lg">
       Signin as donor
      </router-link>
      <router-link
        :to="{ name: 'SigninAsHospital' }"
        class="inline-flex px-4 py-3 mx-3 text-center text-white bg-blue-600 rounded-lg">
       Signin as hospital
      </router-link>
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
