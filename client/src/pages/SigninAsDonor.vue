<template>
  <div>
      <div v-if="Object.keys(res).length == 0 || Object.keys(res.donor).length == 0">
        <div class="text-center mt-8">
          <h1 class="text-3xl font-bold">Sign In</h1>
          <div>See your donations</div>
        </div>
        <form @submit.prevent="submitForm()" class="w-1/4 p-16 mx-auto bg-gray-200 rounded-lg mt-8">
          <div class="my-4">
            <label class="block mb-1">Full Name</label>
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
          <h1 class="text-3xl font-bold">Welcome, {{res.donor.name}}!</h1>
        </div>
        <div class="mx-auto w-1/4 p-8 rounded-lg text-center bg-gray-100">
          <div class="text-2xl font-semibold"> Donor Info </div>
          <div>
            From {{ res.donor.city }}, {{ res.donor.stateProvince }}, {{ res.donor.country }}
          </div>
          <div>
            {{ res.donor.faceShieldsAvailable }} available face shields
          </div>
          <div>
            {{ res.donor.n95MasksAvailable }} available N95 masks
          </div>
          <div>
            {{ res.donor.suitsAvailable }} available suits
          </div>
          <div>
            {{ res.donor.surgicalMasksAvailable }} available surgical masks
          </div>
          <div>
            {{ res.donor.vaccinesAvailable }} vaccines available
          </div>
        </div>

        <div class="text-2xl font-semibold text-center mt-8"> Hospital Info </div>
        <div class="text-center" v-if="res.hospitals.length ==0"> No hospitals matched </div>
        <div v-else>
            <div class="mx-auto w-1/4 p-8 rounded-lg text-center bg-gray-100" v-for="hospital in res.hospitals" :key="hospital.key">
              <div class="text-2xl font-semibold text-center">{{ hospital.hospitalName }}</div>
              <div>
                Located in {{ hospital.hospitalCity }}, {{ hospital.hospitalStateProvince }}
              </div>
              <div>
                {{ hospital.faceShieldsIncoming }} face shields to donate
              </div>
              <div>
                {{ hospital.n95MasksIncoming }} N95 masks to donate
              </div>
              <div>
                {{ hospital.suitsIncoming }} suits to donate
              </div>
              <div>
                {{ hospital.surgicalMasksIncoming }} surgical masks to donate
              </div>
              <div>
                {{ hospital.vaccinesIncoming }} vaccines to donate
              </div>
            </div>
          </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SigninAsDonor',
  data() {
    return {
      inputs: {
        name: '',
      },
      res: {
        donor: {},
        hospitals: []
      },
    }
  },
  methods: {
    submitForm() {
      axios({
        method: 'post',
        url: 'http://simfony.tech/api/getDonor',
        data: this.inputs,
      })
        .then((res) => this.res = res.data)
    }
  },
}
</script>
