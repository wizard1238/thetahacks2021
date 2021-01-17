<template>
  <div>
    <form @submit.prevent="submitForm()" class="w-1/4 p-16 mx-auto text-white bg-gray-600 rounded-lg">
      <div class="my-4">
        <label class="block mb-1">Full Name</label>
        <input
          v-model="inputs.donorName"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="Ada Lovelace"
          type="text"
        />
      </div>
      <div class="my-4 grid grid-cols-2">
        <div class="mr-2 col-span-1">
          <label class="block mb-1">City</label>
          <input
            v-model="inputs.donorCity"
            class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
            placeholder="San Jose"
            type="text"
          />
        </div>
        <div class="col-span-1">
          <label class="block mb-1">State/Province</label>
          <input
            v-model="inputs.donorStateProvince"
            class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
            placeholder="California"
            type="text"
          />
        </div> 
      </div>
      <div class="my-4">
        <label class="block mb-1">Country</label>
        <input
          v-model="inputs.donorCountry"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="United States"
          type="text"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Vaccines</label>
        <input
          v-model="inputs.donorVaccinesAvailable"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Surgical Masks</label>
        <input
          v-model="inputs.donorSurgicalMasksAvailable"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of N95 Masks</label>
        <input
          v-model="inputs.donorN95MasksAvailable"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Face Shields</label>
        <input
          v-model="inputs.donorFaceShieldsAvailable"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Suits</label>
        <input
          v-model="inputs.donorSuitsAvailable"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div>
        <button type='submit'
        class="px-4 py-2 bg-blue-400 rounded-md">Sign Up!</button>
      </div>
    </form>
  </div>  
</template>

<script>
import axios from 'axios'

export default {
  name: 'Donors',
  data() {
    return {
      inputs: {
        donorName: '',
        donorCity: '',
        donorStateProvince: '',
        donorCountry: '',
        donorVaccinesAvailable: 0,
        donorSurgicalMasksAvailable: 0,
        donorN95MasksAvailable: 0,
        donorFaceShieldsAvailable: 0,
        donorSuitsAvailable: 0,
      }
    }
  },
  methods: {
    submitForm(){
      axios({
        type: 'post',
        url: 'http://localhost:3000/createDonor',
        body: this.inputs
      })
        .then((res) => console.log(res.body.data))
        .catch((err) => console.log(err))
    }
  },
}
</script>

