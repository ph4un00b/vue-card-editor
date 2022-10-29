<script>
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import Layer from './components/Layer.vue'

export default defineComponent({
  name: 'App',
  components: {
    Test,
    HelloWorld,
    Layer,
  },
})
</script>

<template>
  <div id="app">
    <img width="30%" src="@/assets/logo.svg" alt="Vite logo" />
    <HelloWorld msg="Vue 2 + Vite" />
    <Test />
    <Layer Yaxis='-25%' />
    <Layer />
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
