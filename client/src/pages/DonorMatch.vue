<template>
  <div>
    <div class="text-center mt-8">
      <h1 class="text-3xl font-bold">Find Hospital Matches</h1>
      <div>Click the button to match with a hospital!</div>
    </div>
    <form @submit.prevent="submitForm()" class="flex justify-center mt-8">
      <button type="submit" class="px-5 py-3 bg-blue-600 text-white rounded">Find</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DonorMatch',
  props: {
    donorName: String,
  },
  methods: {
    submitForm() {
      axios({
        method: 'post',
        url: 'http://simfony.tech/api/matchDonorWithHospital',
        data: {
          name: this.donorName,
        }
      })
        .then(() => {
          this.$router.push({
            name: 'SigninAsDonor',
          })
        })
        .catch(() => {
          this.$router.push({
            name: 'SigninAsDonor',
          })
        })
    }
  },
  mounted() {
    console.log(this.donorName)
  },
}
</script>