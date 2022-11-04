<script>
import Vue from 'vue'
import { defineComponent } from 'vue'
import Layer from './components/Layer.vue'
import Composition from './components/Composition.vue'
import Overlay from './components/Overlay.vue'
import { Portal, PortalTarget } from 'portal-vue'
import DatGui from '@cyrilf/vue-dat-gui'
import VanillaTilt from 'vanilla-tilt'

import { Canvas } from 'glsl-canvas-js'
import kaleido from './frags/kaleido'
import pastel from './frags/pastel'

import Vlf from 'vlf'
import localforage from 'localforage'
Vue.use(Vlf, localforage)

Vue.use(DatGui)
const tiltOptions = {
  reverse: true, // reverse the tilt direction
  max: 35, // max tilt rotation (degrees)
  startX: 0, // the starting tilt on the X axis, in degrees.
  startY: 0, // the starting tilt on the Y axis, in degrees.
  perspective: 1000, // Transform perspective, the lower the more extreme the tilt gets.
  scale: 1, // 2 = 200%, 1.5 = 150%, etc..
  speed: 300, // Speed of the enter/exit transition
  transition: true, // Set a transition on enter/exit.
  axis: null, // What axis should be enabled. Can be "x" or "y"
  reset: true, // If the tilt effect has to be reset on exit.
  easing: 'cubic-bezier(.03,.98,.52,.99)', // Easing on enter/exit.
  // glare: false, // if it should have a "glare" effect
  'max-glare': 1, // the maximum "glare" opacity (1 = 100%, 0.5 = 50%)
  'glare-prerender': false, // false = VanillaTilt creates the glare elements for you, otherwise
  // you need to add .js-tilt-glare>.js-tilt-glare-inner by yourself
  'mouse-event-element': '', // css-selector or link to HTML-element what will be listen mouse events
  gyroscope: !true, // Boolean to enable/disable device orientation detection,
  gyroscopeMinAngleX: -45, // This is the bottom limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the left border of the element;
  gyroscopeMaxAngleX: 45, // This is the top limit of the device angle on X axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the right border of the element;
  gyroscopeMinAngleY: -45, // This is the bottom limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the top border of the element;
  gyroscopeMaxAngleY: 45, // This is the top limit of the device angle on Y axis, meaning that a device rotated at this angle would tilt the element as if the mouse was on the bottom border of the element;
}
export default defineComponent({
  name: 'App',
  components: {
    Layer,
    Composition,
    Portal,
    PortalTarget,
    Overlay,
  },
  data() {
    const blends = [
      {
        value: 'normal',
        name: 'normal',
      },
      {
        value: 'multiply',
        name: 'multiply',
      },
      {
        value: 'screen',
        name: 'screen',
      },
      {
        value: 'overlay',
        name: 'overlay',
      },
      {
        value: 'darken',
        name: 'darken',
      },
      {
        value: 'lighten',
        name: 'lighten',
      },
      { value: 'color-dodge', name: 'color-dodge' },
      {
        value: 'color-burn',
        name: 'color-burn',
      },
      {
        value: 'hard-light',
        name: 'hard-light',
      },
      {
        value: 'soft-light',
        name: 'soft-light',
      },
      {
        value: 'difference',
        name: 'difference',
      },
      {
        value: 'exclusion',
        name: 'exclusion',
      },
      {
        value: 'hue',
        name: 'hue',
      },
      {
        value: 'saturation',
        name: 'saturation',
      },
      {
        value: 'color',
        name: 'color',
      },
      { value: 'luminosity', name: 'luminosity' },
      // "inherit",
      // "initial",
      // "revert",
      // "revert-layer",
      // "unset"
    ]

    return {
      timerId: null,
      start: performance.now(),
      utime: 0,
      canvas: null,
      frags: [pastel, kaleido],
      blends,
      composition: {
        // color-dodge
        blend: blends[6].value,
        bright: 0.5,
        contrast: 2.0,
        saturate: 3.5,
      },
      overlay: {
        // exclusion
        blend: blends[11].value,
        bright: 0.8,
        contrast: 1.6,
        saturate: 1.4,
      },

      b0: {
        zoom: 50,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      },
      b1: {
        zoomW: 200,
        zoomH: 700,
        // hue
        blend: blends[12].value,
        posX: 50,
        posY: 50,
        angle: 0,
      },
      b2: {
        zoom: 300,
        // hard-light
        blend: blends[8].value,
        posX: 50,
        posY: 50,
        angle: 0,
      },
      b3: {
        zoom: 200,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      },
      b20: {
        // pos="50% 50%" zoom="50%"
        zoom: 50,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      },
      b21: {
        // pos="0% 50%" zoom="200% 400%"
        zoomW: 200,
        zoomH: 400,
        // hue
        blend: blends[12].value,

        posX: 0,
        posY: 50,
        angle: 0,
      },
      b22: {
        // pos="-50% -50%" zoom="200%"
        zoom: 200,
        // hard-light
        blend: blends[8].value,
        posX: 50,
        posY: 0,
        angle: 0,
      },
      b23: {
        // pos="50% 50%" zoom="200%"
        zoom: 200,
        // exclusion
        blend: blends[11].value,
        posX: 50,
        posY: 50,
        angle: 0,
      },
      animate: !false,
      animationVelocity: 0.015,
      showPhoto: true,
      photo: 'https://imgix.cosmicjs.com/9d2dbb80-45c4-11ed-8ad7-d16a9b880dcb-Einmusik-Mia.jpg',
      noiseLayer: '/noise.webp',
      // noiseLayer: "/tool.jpg"
      showDebug: !true,
      background: '#171717',
      showShadow: false,
      boxShadow: {
        offsetX: 27,
        offsetY: 27,
        blurRadius: 75,
        spreadRadius: 2,
        color: '#399e48',
      },
      content: {
        display: !true,
        text: 'Hola!',
        left: 33,
        top: 66,
        color: '#fff',
        size: 1,
        weight: 100,
        w: 0,
        h: 0,
        extra: '',
        debug: true,
      },
      transform: !true,
      effects: false,
      frag: {
        textures: [
          { name: 'none', value: '' },
          { name: 'copyof', value: 'copyof.jpg' },
          { name: 'spiral', value: 'spiral.jpg' },
          { name: 'tool', value: 'tool.jpg' },
        ],
        texture: '',
        center: {
          x: 0.5,
          y: -1.0,
        },
      },
    }
  },
  computed: {
    textStyles() {
      const { left, top, display, size, color, w, h, debug, weight } = this.content
      return {
        left: left + '%',
        top: top + '%',
        color,
        fontSize: size + 'rem',
        fontWeight: weight,
        display: display ? 'block' : 'none',
        width: w + '%',
        height: h + '%',
        'box-shadow': 'inset 0 0 4px ' + (debug ? 'red' : 'transparent'),
      }
    },
    boxShadowStyle() {
      if (!this.showShadow) return
      const { offsetX, offsetY, blurRadius, spreadRadius, color } = this.boxShadow
      return {
        'box-shadow': `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`,
      }
    },
  },
  methods: {
    save() {
      // console.log(JSON.stringify(this.$data))
      const preset = { ...this.$data }
      delete preset.timerId
      delete preset.start
      delete preset.utime
      delete preset.canvas
      delete preset.frags
      delete preset.blends

      this.$vlf.setItem('preset', preset).then((v) => {
        console.log(v)
      })
    },
    startTime() {
      this.loop()
    },
    loop() {
      if (this.animate) {
        this.utime = Math.floor(performance.now() * this.animationVelocity)
      }
      // console.log(this.utime);
      this.timerId = window.requestAnimationFrame(this.loop)
    },
    createCanvas() {
      /** @link https://css-tricks.com/the-trick-to-viewport-units-on-mobile/ */
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      // alert(vh)
      const canvas = document.querySelector('canvas')
      console.log(canvas)
      const w = window.innerWidth
      const h = vh * 100
      // const dpi = window.devicePixelRatio
      const dpi = 1
      const size = Math.max(h, w) * 1
      // alert(size)
      canvas.width = size * dpi
      canvas.height = size * dpi
      // alert(canvas.height)
      canvas.style.width = size + 'px'
      canvas.style.height = size + 'px'
      // todo: resize!
      const options = {
        // vertexString: `...`,
        fragmentString: this.frags[1],
        alpha: false,
        antialias: !true,
        mode: 'flat',
        extensions: ['EXT_shader_texture_lod'],
        // backgroundColor: 'blue'
      }
      this.canvas = new Canvas(canvas, options)
      // canvas.style.backgroundColor = 'red'

      this.canvas.setUniform('u_center', this.frag.center.x, this.frag.center.y)
    },
  },
  beforeCreate() {
    this.$vlf.createInstance({
      storeName: 'jamon',
    })
  },
  mounted() {
    this.$vlf.getItem('preset').then((v) => {
      Object.assign(this.$data, v)
      // console.log(v)
    })

    this.startTime()

    if (!this.effects) return
    this.createCanvas()

    // const element = document.querySelector(".photo");
    // VanillaTilt.init(element, tiltOptions);
    // element.addEventListener("tiltChange", callback);
  },
  watch: {
    'frag.texture': function (n) {
      // alert(n)
      this.canvas.setUniform('u_tex0', n)
    },
    'frag.center.x': function (newVal, oldVal) {
      this.canvas.setUniform('u_center', newVal, this.frag.center.y)
    },
    'frag.center.y': function (newVal, oldVal) {
      this.canvas.setUniform('u_center', this.frag.center.x, newVal)
    },
    transform(val, oldval) {
      if (val == false) {
        const element = document.querySelector('.photo')
        // Destroy instance
        element?.vanillaTilt.destroy()
      } else {
        const element = document.querySelector('.photo')
        VanillaTilt.init(element, tiltOptions)
        // element.addEventListener("tiltChange", callback);
      }
    },
    effects(val, oldval) {
      if (val == false) {
        this.canvas.destroy()
        this.canvas = null
      } else {
        this.$nextTick(this.createCanvas)
      }
    },
  },
  beforeDestroy() {
    window.cancelAnimationFrame(this.timerId)
  },
})
</script>

<template>
  <div id="app" style="
      /* position: fixed;
    top: 0;
    left: 0; */
      width: 100%;
      height: 100vh; /* Fallback for browsers that do not support Custom Properties */
      height: calc(var(--vh, 1vh) * 100);
      min-height: -webkit-fill-available;
    " :style="{ 'background-color': background, overflow: 'hidden' }">
    <!-- todo: fix bug on textures for mobile (ios 2019 at least!) -->

    <canvas v-if="effects" :data-textures="frag.texture"></canvas>
    <!-- <canvas class="glsl-canvas" :data-fragment="frags[1]" data-textures="tool.jpg"></canvas> -->
    <!-- <canvas data-textures="tool.jpg" class="glslCanvas"
      :data-fragment="frags[1]"></canvas> -->
      
    <pre v-if="showDebug">{{ utime }}</pre>

    <dat-gui v-if="effects" style="position: absolute; top: unset; bottom: 0; left: 0; z-index: 20"
      closeText="close text" openText="open text" closePosition="top">
      <!-- <dat-string v-model="frag.texture" label="img" /> -->
      <dat-select v-model="frag.texture" :items="frag.textures" label="image" />
      <dat-number v-model="frag.center.x" :min="-1" :max="1" :step="0.01" label="x" />
      <dat-number v-model="frag.center.y" :min="-1" :max="1" :step="0.01" label="y" />
      <!-- </dat-folder> -->
    </dat-gui>

    <dat-gui v-if="content.display" style="position: absolute; top: unset; bottom: 0; z-index: 20" closeText="close fx"
      openText="open fx" closePosition="top">
      <!-- todo: find a way to reduce duplication! -->
      <!-- <dat-folder label="Box shadow" closed> -->
      <dat-boolean v-model="content.debug" label="debug?" />
      <dat-string v-model="content.text" label="content" />
      <!-- <dat-string v-model="content.extra" label="extra styles" /> -->
      <dat-number v-model="content.size" :min="0" :max="10" :step="0.1" label="size" />
      <dat-number v-model="content.weight" :min="100" :max="900" :step="100" label="weight" />
      <dat-number v-model="content.left" :min="-20" :max="100" :step="1" label="x" />
      <dat-number v-model="content.top" :min="-20" :max="100" :step="1" label="y" />
      <dat-color v-model="content.color" :min="-20" :max="100" :step="1" label="color" />
      <dat-number v-model="content.w" :min="0" :max="100" :step="1" label="width" />
      <dat-number v-model="content.h" :min="0" :max="100" :step="1" label="height" />
      <!-- </dat-folder> -->
    </dat-gui>

    <!-- <pre>{{textStyles}}</pre> -->
    <section data-tilt data-tilt-full-page-listening class="photo" style="
        transform-style: preserve-3d;
        transform: perspective(1000px);
        aspect-ratio: 5/6;
        display: grid;
        grid-area: 1/1;
        width: 40vw;
        max-width: 25rem;
        margin: auto;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        // border: /** debug */ 0.1rem solid;
        // border-color: /** debug */ red;
      ">
      <!-- todo find a simple way to inject extra styles from dat-gui -->
      <span :style="textStyles" style="width: 0%; height: 0%; z-index: 10; position: absolute">
        {{ content.text }}
      </span>

      <img style="width: 100%; display: grid; grid-area: 1/1" :src="photo" alt="" :style="boxShadowStyle"
        v-show="showPhoto" />

      <Composition :debug="showDebug" :blend="composition.blend" :bright="composition.bright"
        :contrast="composition.contrast" :saturate="composition.saturate">
        <Layer :blend="b0.blend" :zoom="b0.zoom + '%'" :pos="b0.posX + '% ' + b0.posY + '%'"
          :bg="'url(' + noiseLayer + ')'" />
        <Layer :blend="b1.blend" :zoom="b1.zoomW + '% ' + b1.zoomH + '%'" :pos="b1.posX + '% ' + b1.posY + '%'"
          bg="repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))" />
        <Layer :blend="b2.blend" :zoom="b2.zoom + '%'" :pos="b2.posX + utime + '% ' + b2.posY + '%'"
          bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
        <Layer :blend="b3.blend" :zoom="b3.zoom + '%'" :pos="b3.posX + '% ' + b3.posY + '%'"
          bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
      </Composition>

      <Overlay :blend="overlay.blend" :bright="overlay.bright" :contrast="overlay.contrast"
        :saturate="overlay.saturate">
        <Layer :blend="b20.blend" :pos="b20.posX + '% ' + b20.posY + '%'" :zoom="b20.zoom + '%'"
          :bg="'url(' + noiseLayer + ')'" />
        <Layer :blend="b21.blend" :zoom="b21.zoomW + '% ' + b21.zoomH + '%'" :pos="b21.posX + '% ' + b21.posY + '%'"
          bg="repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))" />
        <Layer blend="hard-light" :blend="b22.blend" :zoom="b22.zoom + '%'"
          :pos="-(b22.posX + utime) + '% ' + b22.posY + '%'"
          bg="repeating-linear-gradient(/* lever -> */ 45deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)" />
        <Layer blend="exclusion" :blend="b23.blend" :zoom="b23.zoom + '%'" :pos="b23.posX + '% ' + b23.posY + '%'"
          bg="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)" />
      </Overlay>

      <!-- <section class="handler" style="color:aliceblue; background-color: rosybrown; width: 100%; height: 20rem; margin-top: 3rem;"> 3d handler </section> -->
    </section>

    <dat-gui closed style="position: absolute; left: 24%; z-index: 20" closeText="Close controls"
      openText="Main controls" closePosition="bottom">
      <!-- todo: find a way to reduce duplication! -->

      <dat-button @click="save" label="save preset" />
      <dat-boolean v-model="showPhoto" label="photo?" />
      <dat-string v-model="photo" label="photo" />
      <dat-string v-model="noiseLayer" label="noise layer" />
      <dat-boolean v-model="showDebug" label="debug?" />
      <dat-boolean v-model="animate" label="animate?" />
      <dat-boolean v-model="effects" label="effects?" />
      <dat-boolean v-model="transform" label="3d?" />
      <dat-boolean v-model="content.display" label="text?" />
      <dat-color v-model="background" label="background" />
      <dat-number v-model="animationVelocity" :min="0" :max="0.9" :step="0.001" label="velocity" />

      <dat-folder label="Box shadow" closed>
        <dat-boolean v-model="showShadow" label="shadow?" />
        <dat-number v-model="boxShadow.offsetX" :min="-100" :max="100" :step="1" label="Offset X" />
        <dat-number v-model="boxShadow.offsetY" :min="-100" :max="100" :step="1" label="Offset Y" />
        <dat-number v-model="boxShadow.blurRadius" :min="0" :max="100" :step="1" label="Blur radius" />
        <dat-number v-model="boxShadow.spreadRadius" :min="0" :max="30" :step="1" label="Spread radius" />
        <dat-color v-model="boxShadow.color" label="Color" />
      </dat-folder>

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
    </dat-gui>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
