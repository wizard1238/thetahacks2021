<template>
  <div v-if="Object.keys(res).length == 0">
    <div class="text-center mt-8">
      <h1 class="text-3xl font-bold">Sign In</h1>
      <div>Check how many donations you have</div>
    </div>
    <form @submit.prevent="submitForm()" class="w-1/4 p-16 mx-auto bg-gray-200 rounded-lg mt-8">
      <div class="my-4">
        <label class="block mb-1">Hospital Name</label>
        <input
          v-model="inputs.name"
          class="w-full px-3 py-1 border-2 border-gray-400 text-black rounded text-nord0 bg-nord4"
          placeholder="Ada Lovelace"
          type="text"
        />
      </div>
      <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">
        Signin
      </button>
    </form>
  </div>
  <div v-else>
    <div class="text-center my-8">
      <h1 class="text-3xl font-bold">Welcome, {{res.name}}!</h1>
    </div>
    <div class="mx-auto w-1/4 p-8 rounded-lg text-center bg-gray-100">
      <div class="text-2xl font-semibold">Hospital Information</div>
      <div>
        From {{ res.city }}, {{ res.stateProvince }}, {{ res.country }}
      </div>
      <div>
        {{ res.faceShieldsNeeded }} available face shields
      </div>
      <div>
        {{ res.n95MasksNeeded }} available N95 masks
      </div>
      <div>
        {{res.suitsNeeded }} available suits
      </div>
      <div>
        {{ res.surgicalMasksNeeded }} available surgical masks
      </div>
      <div>
        {{ res.vaccinesNeeded }} vaccines available
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SigninAsHospital',
  data() {
    return {
      inputs: {
        name: '',
      },
      res: { }
    }
  },
  methods: {
    submitForm() {
      axios({
        method: 'post',
        url: 'http://simfony.tech/api/getHospital',
        data: this.inputs,
      })
      .then((res) => { this.res = res.data })
      .catch((err) => console.log(err))
    }
  },
}
</script>
