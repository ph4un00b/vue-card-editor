<script>
import Vue from 'vue'
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Test from './components/Test.vue'
import Layer from './components/Layer.vue'
import Composition from './components/Composition.vue'
import Overlay from './components/Overlay.vue'
import { Portal, PortalTarget } from 'portal-vue'
import DatGui from '@cyrilf/vue-dat-gui'
Vue.use(DatGui)

export default defineComponent({
  name: 'App',
  components: {
    Test,
    HelloWorld,
    Layer,
    Composition,
    Portal,
    PortalTarget,
    Overlay
  },
  data() {
    const blends = [
      {
        value: "normal",
        name: "normal"
      },
      {
        value: "multiply",
        name: "multiply"
      },
      {
        value: "screen",
        name: "screen"
      },
      {
        value: "overlay",
        name: "overlay"
      },
      {
        value: "darken",
        name: "darken"
      },
      {
        value: "lighten",
        name: "lighten"
      },
      { value: "color-dodge", name: "color-dodge" },
      {
        value: "color-burn",
        name: "color-burn"
      },
      {
        value: "hard-light",
        name: "hard-light"
      },
      {
        value: "soft-light",
        name: "soft-light"
      },
      {
        value: "difference",
        name: "difference"
      },
      {
        value: "exclusion",
        name: "exclusion"
      },
      {
        value: "hue",
        name: "hue"
      },
      {
        value: "saturation",
        name: "saturation"
      },
      {
        value: "color",
        name: "color"
      },
      { value: "luminosity", name: "luminosity" }
      // "inherit",
      // "initial",
      // "revert",
      // "revert-layer",
      // "unset"
    ]
    return {
      // background: '#cdeecc',
      // titleFontSize: 75,
      // title: 'vue-dat-gui',
      showDebug: !true,
      blends,
      // pictureUrl: pictures[0].value,
      // boxShadow: {
      //   offsetX: 27,
      //   offsetY: 27,
      //   blurRadius: 75,
      //   spreadRadius: 2,
      //   color: 'rgba(3, 23, 6, 1)',
      // },
      composition: {
        // color-dodge
        blend: blends[6].value,
        bright: 0.5,
        contrast: 2.0,
        saturate: 1.5
      },
      overlay: {
        // exclusion
        blend: blends[11].value,
        bright: 0.8,
        contrast: 1.6,
        saturate: 1.4
      },
      b0: {
        zoom: 50,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      }, b1: {
        zoomW: 200,
        zoomH: 700,
        // hue
        blend: blends[12].value,
        posX: 50,
        posY: 50,
        angle: 0,
      }, b2: {
        zoom: 300,
        // hard-light
        blend: blends[8].value,
        posX: 50,
        posY: 50,
        angle: 0,
      }, b3: {
        zoom: 200,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      }, b20: {
        // pos="50% 50%" zoom="50%"
        zoom: 50,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      }, b21: {
        // pos="0% 50%" zoom="200% 400%"
        zoomW: 200,
        zoomH: 400,
        // hue
        blend: blends[12].value,

        posX: 0,
        posY: 50,
        angle: 0,
      }, b22: {
        // pos="-50% -50%" zoom="200%"
        zoom: 200,
        // hard-light
        blend: blends[8].value,
        posX: 50,
        posY: 0,
        angle: 0,
      }, b23: {
        // pos="50% 50%" zoom="200%"
        zoom: 200,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      },
    }
  },
  computed: {
    b1Zoom() {
      return this.b1.zoomW + '% ' + this.b1.zoomH + '%'
    }
  },
  methods: {
    triggerAlert() {
      alert('Yeah, you pressed it!')
    },
  }
})
</script>

<template>
  <div id="app">

    <!-- https://images.pokemontcg.io/swsh1/190_hires.png -->
    <!-- https://www.joshdance.com/100/day50/images/varian.png -->
    <!-- https://imgix.cosmicjs.com/3714a060-45b1-11ed-8ad7-d16a9b880dcb-Mat.-Joe.jpg -->
    <!-- https://imgix.cosmicjs.com/9d2dbb80-45c4-11ed-8ad7-d16a9b880dcb-Einmusik-Mia.jpg -->
    <!-- https://imgix.cosmicjs.com/9bad6330-466b-11ed-a07b-05c6717a9348-LAOLU.jpg -->
    <section style="
            aspect-ratio: 5/6;
            display: grid;
            grid-area: 1/1;
            width: 50vw;
            max-width: 768px;
            margin: auto;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            // border: /** debug */ 0.1rem solid;
            // border-color: /** debug */ red;">


      <img style="width: 100%; display: grid; grid-area: 1/1;"
        src="https://imgix.cosmicjs.com/9bad6330-466b-11ed-a07b-05c6717a9348-LAOLU.jpg" alt="">

      <Composition :debug="showDebug" :blend="composition.blend" :bright="composition.bright"
        :contrast="composition.contrast" :saturate="composition.saturate">
        <Layer :blend="b0.blend" :zoom="b0.zoom + '%'" :pos="b0.posX + '% ' + b0.posY + '%'"
          bg="url(src/assets/noise-layer.webp)" />
        <Layer :blend="b1.blend" :zoom="b1.zoomW + '% ' + b1.zoomH + '%'" :pos="b1.posX + '% ' + b1.posY + '%'"
          bg="repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))" />
        <Layer :blend="b2.blend" :zoom="b2.zoom + '%'" :pos="b2.posX + '% ' + b2.posY + '%'"
          bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
        <Layer :blend="b3.blend" :zoom="b3.zoom + '%'" :pos="b3.posX + '% ' + b3.posY + '%'"
          bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
      </Composition>

      <Overlay :blend="overlay.blend" :bright="overlay.bright" :contrast="overlay.contrast"
        :saturate="overlay.saturate">
        <Layer :blend="b20.blend" :pos="b20.posX + '% ' + b20.posY + '%'" :zoom="b20.zoom + '%'"
          bg="url(src/assets/noise-layer.webp)" />
        <Layer :blend="b21.blend" :zoom="b21.zoomW + '% ' + b21.zoomH + '%'" :pos="b21.posX + '% ' + b21.posY + '%'"
          bg="repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))" />
        <Layer blend="hard-light" :blend="b22.blend" :zoom="b22.zoom + '%'" :pos="b22.posX + '% ' + b22.posY + '%'"
          bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
        <Layer blend="exclusion" :blend="b23.blend" :zoom="b23.zoom + '%'" :pos="b23.posX + '% ' + b23.posY + '%'"
          bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
      </Overlay>
    </section>



    <dat-gui closed style="position: absolute; left: 50%;" closeText="Close controls" openText="Open controls"
      closePosition="bottom">

      <!-- todo: find a way to reduce duplication! -->
      <dat-folder label="b0" closed>
        <dat-select v-model="b0.blend" :items="blends" label="Blend" />
        <dat-number v-model="b0.zoom" :min="0" :max="1000" :step="1" label="Zoom" />
        <dat-number v-model="b0.posX" :min="0" :max="1000" :step="1" label="X" />
        <dat-number v-model="b0.posY" :min="0" :max="1000" :step="1" label="Y" />
      </dat-folder>

      <dat-folder label="b1" closed>
        <dat-select v-model="b1.blend" :items="blends" label="Blend" />
        <dat-number v-model="b1.zoomW" :min="0" :max="1000" :step="1" label="ZoomW" />
        <dat-number v-model="b1.zoomH" :min="0" :max="1000" :step="1" label="ZoomH" />
        <dat-number v-model="b1.posX" :min="0" :max="1000" :step="1" label="X" />
        <dat-number v-model="b1.posY" :min="0" :max="1000" :step="1" label="Y" />
      </dat-folder>

      <dat-folder label="b2" closed>
        <dat-select v-model="b2.blend" :items="blends" label="Blend" />
        <dat-number v-model="b2.zoom" :min="0" :max="1000" :step="1" label="Zoom" />
        <dat-number v-model="b2.posX" :min="0" :max="1000" :step="1" label="X" />
        <dat-number v-model="b2.posY" :min="0" :max="1000" :step="1" label="Y" />
      </dat-folder>

      <dat-folder label="b3" closed>
        <dat-select v-model="b3.blend" :items="blends" label="Blend" />
        <dat-number v-model="b3.zoom" :min="0" :max="1000" :step="1" label="Zoom" />
        <dat-number v-model="b3.posX" :min="0" :max="1000" :step="1" label="X" />
        <dat-number v-model="b3.posY" :min="0" :max="1000" :step="1" label="Y" />
      </dat-folder>

      <dat-folder label="b20" closed>
        <dat-select v-model="b20.blend" :items="blends" label="Blend" />
        <dat-number v-model="b20.zoom" :min="0" :max="1000" :step="1" label="Zoom" />
        <dat-number v-model="b20.posX" :min="0" :max="200" :step="0.5" label="X" />
        <dat-number v-model="b20.posY" :min="0" :max="200" :step="0.5" label="Y" />
      </dat-folder>

      <dat-folder label="b21" closed>
        <dat-select v-model="b21.blend" :items="blends" label="Blend" />
        <dat-number v-model="b21.zoomW" :min="0" :max="1000" :step="1" label="ZoomW" />
        <dat-number v-model="b21.zoomH" :min="0" :max="1000" :step="1" label="ZoomH" />
        <dat-number v-model="b21.posX" :min="0" :max="1000" :step="1" label="X" />
        <dat-number v-model="b21.posY" :min="0" :max="1000" :step="1" label="Y" />
      </dat-folder>

      <dat-folder label="b22" closed>
        <dat-select v-model="b22.blend" :items="blends" label="Blend" />
        <dat-number v-model="b22.zoom" :min="0" :max="1000" :step="1" label="Zoom" />
        <dat-number v-model="b22.posX" :min="0" :max="1000" :step="1" label="X" />
        <dat-number v-model="b22.posY" :min="0" :max="1000" :step="1" label="Y" />
      </dat-folder>

      <dat-folder label="b23" closed>
        <dat-select v-model="b23.blend" :items="blends" label="Blend" />
        <dat-number v-model="b23.zoom" :min="0" :max="1000" :step="1" label="Zoom" />
        <dat-number v-model="b23.posX" :min="0" :max="1000" :step="1" label="X" />
        <dat-number v-model="b23.posY" :min="0" :max="1000" :step="1" label="Y" />
      </dat-folder>

      <dat-folder label="composition" closed>
        <dat-select v-model="composition.blend" :items="blends" label="Blend" />
        <dat-number v-model="composition.bright" :min="0" :max="1" :step="0.01" label="brightness" />
        <dat-number v-model="composition.contrast" :min="0" :max="10" :step="0.01" label="contrast" />
        <dat-number v-model="composition.saturate" :min="0" :max="10" :step="0.01" label="saturate" />
      </dat-folder>

      <dat-folder label="overlay" closed>
        <dat-select v-model="overlay.blend" :items="blends" label="Blend" />
        <dat-number v-model="overlay.bright" :min="0" :max="1" :step="0.01" label="brightness" />
        <dat-number v-model="overlay.contrast" :min="0" :max="10" :step="0.01" label="contrast" />
        <dat-number v-model="overlay.saturate" :min="0" :max="10" :step="0.01" label="saturate" />
      </dat-folder>
      <dat-boolean v-model="showDebug" label="Show Debug" />
    </dat-gui>
  </div>

</template>

<style>
#app {
  /* position: relative; */
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  /* margin-top: 60px; */
}
</style>
