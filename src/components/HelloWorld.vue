<script>
import { ref, defineComponent, h } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  props: {
    posX: {
      type: String,
      required: !true,
      default: '0%',
    },
    blend: {
      type: String,
      required: !true,
      default: 'none',
    },
    filter: {
      type: String,
      required: true,
    },
  },
  setup({ posX, blend, filter }, { slots }) {
    let blends = ''
    let bgImage = ''
    let zooms = ''
    let positions = ''
    slots.default().forEach((item) => {
      /**
       * {
       *   "Yaxis": "-20%",
       *   "bg": "repeating-linear-gradient(...)",
       *   "pos"
       *   "blend": "hard-light",
       *   "zoom": "200%"
       * }
       */
      /** XXXX: still dont know if this is the best API to fecth props data */
      blends += item.componentOptions.propsData.blend + ', '
      bgImage += item.componentOptions.propsData.bg + ','
      zooms += item.componentOptions.propsData.zoom + ','
      positions += item.componentOptions.propsData.pos ? item.componentOptions.propsData.pos + ',' : '0% 50%,'
    })

    const removeLastComma = (x) => x.substring(0, x.lastIndexOf(','))
    bgImage = removeLastComma(bgImage)
    blends = removeLastComma(blends)
    zooms = removeLastComma(zooms)
    positions = removeLastComma(positions)
    return () =>
      h('div', {
        style: `
      width: 80vw;
      max-width: 764px;
      mix-blend-mode: ${blend};
      background-image: ${bgImage.trim()};
      background-size: ${zooms};
      background-blend-mode: ${blends};
      background-position: 0% 50%, 50% 50%, 50% 50%;
      background-position: ${positions};
      filter: ${filter};
      aspect-ratio: 5/6;
      margin: auto;
      position: absolute;
      top: 0; left: 0%; bottom: 0; right: 0;
      `,
      })
    // border: /** debug */ 0.1rem solid;
    // border-color: /** debug */ red;
    // transform: /** debug */ translateX(${posX});
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