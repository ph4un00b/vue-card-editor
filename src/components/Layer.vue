<template>
  <div :style="defineCSSvars" class="layer">
    + {{blend}} 
    + {{Yaxis}} 
    <!-- + {{bg}} -->
    + {{angle}}
  </div>
</template>

<script>
export default {
  props: {
    Yaxis: {
      type: String,
      required: !true,
      default: '0%'
    },
    bg: {
      type: String,
      required: !true,
      default: 'url(src/assets/noise-layer.webp)'
    },
    blend: {
      type: String,
      required: !true,
      default:'none'
    },
  },
  data() {
    return {
      greeting: 'hola! 🍄',
    }
  },
  methods: {},
  computed: {
    defineCSSvars() {
      return {
        '--Yaxis': this.Yaxis,
        '--bg': this.bg,
        '--blend': this.blend,
      }
    }
  },
}
</script>

<style scoped>
.layer {
  background-image: var(--bg);
  /* background-image: ; */
  mix-blend-mode: var(--blend);
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  transform: translateY(var(--Yaxis));
  width: 60vw;
  aspect-ratio: 3/4;
  border: 0.1rem solid;
  border-color: red;
  color: royalblue;
}
/* 
label {
  margin: 0 0.5em;
  font-weight: bold;
}

p {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
} */
</style>
