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
    <!-- <img width="30%" src="@/assets/logo.svg" alt="Vite logo" /> -->
    <!-- <HelloWorld msg="Vue 2 + Vite" /> -->
    <!-- <Test /> -->
    <Layer blend="none" Yaxis='-25%' />
    <!-- https://uigradients.com/#Shahabi -->
    <Layer blend="none" Yaxis='-15%' bg="linear-gradient(to top, #a80077, #66ff00)"/>
    <Layer blend='hard-light' Yaxis='-5%' bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
    <Layer blend='hue' Yaxis='5%' bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
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
