<template>
  <div>
      <div class="text-center mt-8">
        <h1 class="text-3xl font-bold">Sign In</h1>
        <div>Acccess our public database of information</div>
      </div>
      <form @submit.prevent="submitForm()" class="w-1/4 p-16 mx-auto text-white bg-gray-600 rounded-lg mt-8">
        <div class="my-4">
          <label class="block mb-1">Full Name</label>
          <input
            v-model="inputs.name"
            class="w-full px-3 py-1 text-black rounded text-nord0 bg-nord4"
            placeholder="Ada Lovelace"
            type="text"
          />
        </div>
        <button type="submit" class="px-4 py-2 bg-blue-400 rounded">
          Sign In
        </button>
      </form>
      <div v-if="res != {}">
        <div>
          City: {{ res.city }}
        </div>
        <div>
          State/Province: {{ res.stateProvince }}
        </div>
        <div>
          Country {{ res.country }}
        </div>
        <div>
          # of available face shields: {{ res.faceShieldsAvailable }}
        </div>
        <div>
          # of available N95 masks: {{ res.n95MasksAvailable }}
        </div>
        <div>
          # of available suits: {{ res.suitsAvailable }}
        </div>
        <div>
          # of available surgical masks: {{ res.surgicalMasksAvailable }}
        </div>
        <div>
          # of vaccines available: {{ res.vaccinesAvailable }}
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
      res: {},
    }
  },
  methods: {
    submitForm() {
      axios({
        method: 'post',
        url: 'http://localhost:3000/getDonor',
        data: this.inputs,
      })
        .then((res) => this.res = res.data)
    }
  },
}
</script>
