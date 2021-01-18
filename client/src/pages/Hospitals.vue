<template>
  <div>
    <div class="text-center mt-8">
      <h1 class="text-3xl font-bold">Hospitals: Register to Receive Supplies</h1>
      <div>Input the number of supplies you need, and we will match you with donors nearby.</div>
    </div>
    <form @submit.prevent="submitForm()" class="w-1/4 p-16 mx-auto text-white bg-gray-600 rounded-lg mt-8">
      <div class="my-4">
        <label class="block mb-1">Full Name</label>
        <input
          v-model="inputs.name"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="Your Friendly Neighboorhood 医院"
          type="text"
        />
      </div>
      <div class="my-4 grid grid-cols-2">
        <div class="mr-2 col-span-1">
          <label class="block mb-1">City</label>
          <input
            v-model="inputs.city"
            class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
            placeholder="San Jose"
            type="text"
          />
        </div>
        <div class="col-span-1">
          <label class="block mb-1">State/Province</label>
          <input
            v-model="inputs.stateProvince"
            class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
            placeholder="California"
            type="text"
          />
        </div> 
      </div>
      <div class="my-4">
        <label class="block mb-1">Country</label>
        <input
          v-model="inputs.country"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="United States"
          type="text"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Vaccines</label>
        <input
          v-model="inputs.vaccinesNeeded"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Surgical Masks</label>
        <input
          v-model="inputs.surgicalMasksNeeded"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of N95 Masks</label>
        <input
          v-model="inputs.nN95MasksNeeded"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Face Shields</label>
        <input
          v-model="inputs.faceShieldsNeeded"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div class="my-4">
        <label class="block mb-1"># of Suits</label>
        <input
          v-model="inputs.suitsNeeded"
          class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
          placeholder="500"
          type="number"
        />
      </div>
      <div>
        <div v-if="errMsg" class="text-red-200">{{ errMsg }}</div>
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
      errMsg: '',
      inputs: {
        name: '',
        city: '',
        stateProvince: '',
        country: '',
        streetAddress: '',
        vaccinesNeeded: 0,
        surgicalMasksNeeded: 0,
        n95MasksNeeded: 0,
        faceShieldsNeeded: 0,
        suitsNeeded: 0,
      }
    }
  },
  methods: {
    submitForm(){
      axios({
        method: 'post',
        url: 'http://localhost:3000/createHospital',
        data: this.inputs,
      })
        .then((res) => console.log(res.body.data))
        .catch((err) => {
          this.errMsg = err.response.data
          console.log(err)
        })
    }
  },
}
</script>
