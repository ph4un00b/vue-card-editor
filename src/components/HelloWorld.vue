<script>
import { ref, defineComponent, h } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    posX: {
      type: String,
      required: !true,
      default: '0%'
    },
    blend: {
      type: String,
      required: !true,
      default:'none'
    },
    filter: {
      type: String,
      required: true
    }
  },
  setup({posX, blend, filter}, {slots,}) {
    let blends = ''
    let bgImage = ''
    let zooms = ''
    console.log(slots.default ? slots.default() : [])
    slots.default().forEach(item => {
      /**
       * {
       *   "Yaxis": "-20%",
       *   "bg": "repeating-linear-gradient(...)",
       *   "blend": "hard-light",
       *   "zoom": "200%"
       * }
       */
      //  console.log(item.componentOptions.propsData)
       blends += item.componentOptions.propsData.blend + ", "
      //  console.log(item.componentOptions.propsData.bg)
       bgImage += item.componentOptions.propsData.bg + ","
       zooms += item.componentOptions.propsData.zoom + ","
      })

  const removeLastComma = (x) => x.substring(0, x.lastIndexOf(","))
  bgImage = removeLastComma(bgImage)
  blends = removeLastComma(blends)
  zooms = removeLastComma(zooms)
  console.log(zooms)
  const l1 = "repeating-linear-gradient(0deg, rgb(255, 119, 115) calc(5%*1), rgba(255, 237, 95, 1) calc(5%*2), rgba(168, 255, 95, 1) calc(5%*3), rgba(131, 255, 247, 1) calc(5%*4), rgba(120, 148, 255, 1) calc(5%*5), rgb(216, 117, 255) calc(5%*6), rgb(255, 119, 115) calc(5%*7))"
  const l2 = "repeating-linear-gradient(/* lever -> */ 135deg /* <-*/, #0e152e 0%, hsl(180, 10%, 60%) 3.8%, hsl(180, 29%, 66%) 4.5%, hsl(180, 10%, 60%) 5.2%, #0e152e 10%, #0e152e 12%)"
  const lradial ="radial-gradient(farthest-corner circle at 50% 50%, rgba(0, 0, 0, .1) 12%, rgba(0, 0, 0, .15) 20%, rgba(0, 0, 0, .25) 120%)"
  const lurl ="url(src/assets/noise-layer.webp)"
  const test = `${lurl},${l1},${l2},${lradial}`.trim()
    return () => h("div", {
      style: `
      width: 60vw;
      max-width: 300px;
      mix-blend-mode: ${blend};
      background-image: ${bgImage.trim()};
      background-size: ${zooms};
      background-blend-mode: ${blends};
      background-position: 0% 50%, 50% 50%, 50% 50%;
      filter: ${filter};
      aspect-ratio: 5/6;
      margin: auto;
      position: absolute;
      top: 0; left: 0%; bottom: 0; right: 0;
      border: /** debug */ 0.1rem solid;
      border-color: /** debug */ red;
      transform: /** debug */ translateX(${posX});
      `
      })
  },
})
</script>


<template>
<!-- this is avoided since we return from setup() -->
  <div>
    <h1>{{ msg }}</h1>
    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
      |
      <a href="https://vuejs.org/" target="_blank">Vue 2 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
