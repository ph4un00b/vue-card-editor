<script>
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import Noise from './components/Noise.vue'

export default defineComponent({
  name: 'App',
  components: {
    Test,
    HelloWorld,
    Noise,
  },
})
</script>

<template>
  <div id="app">
    <img width="30%" src="@/assets/logo.svg" alt="Vite logo" />
    <HelloWorld msg="Vue 2 + Vite" />
    <Test />
    <Noise />
  </div>
</template>

<style>
#app {
  /* position: relative; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
