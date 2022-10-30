<script>
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import Layer from './components/Layer.vue'
import Composition from './components/Composition.vue'

export default defineComponent({
  name: 'App',
  components: {
    Test,
    HelloWorld,
    Layer,
    Composition
  },
})
</script>

<template>
  <div id="app">
    <hello-world posX="-100%" blend="color-dodge" filter="brightness(calc((0*0.3) + 0.5)) contrast(2) saturate(1.5)">
      <Layer blend="exclusion" Yaxis='10%' pos="50% 50%" zoom="50%" bg="url(src/assets/noise-layer.webp)" />
      <Layer blend="hue" Yaxis='-10%' pos="50% 50%" zoom="200% 700%" bg="repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))"/>
      <Layer blend='hard-light' Yaxis='-20%' pos="50% 50%" zoom="300%" bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
      <Layer blend='exclusion' Yaxis='0%' pos="50% 50%" zoom="200%" bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
      <template #last>
        jamon
      </template>
    </hello-world>
    <!-- <Composition> -->
      <!-- https://uigradients.com/#Shahabi -->
      <!-- <Layer blend='hard-light' Yaxis='-20%' zoom="200%" bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
      <Layer blend="hue" Yaxis='-10%' posY="50%" zoom="100% 700%" bg="repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))"/>
      <Layer blend='exclusion' Yaxis='0%' bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
      <Layer blend="exclusion" Yaxis='10%' posX="50%" posY="0%" zoom="50%" bg="url(src/assets/noise-layer.webp)" /> -->
    <!-- </Composition> -->

    <hello-world blend="exclusion" filter="brightness(calc((0.0*0.5) + .8)) contrast(1.6) saturate(1.4)">
      <Layer blend="exclusion" Yaxis='10%' pos="50% 50%" zoom="50%" bg="url(src/assets/noise-layer.webp)" />
      <Layer blend="hue" Yaxis='-10%' pos="0% 50%" zoom="200% 400%" bg="repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))"/>
      <Layer blend='hard-light' Yaxis='-20%' pos="-50% -50%" zoom="200%" bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
      <Layer blend='exclusion' Yaxis='0%' pos="50% 50%" zoom="200%" bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
    </hello-world>
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
  /* margin-top: 60px; */
}
</style>
