<template>
  <div id="app">
    <navbar/>
    <homepage/>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue"
import Homepage from './pages/Homepage.vue'

export default {
  name: 'App',
  components: {
    Homepage,
    Navbar,
  }
}
</script>

<style>
@import './assets/css/tailwind.css';

#app {
  font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
