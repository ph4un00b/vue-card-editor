<template>
  <div :style="defineCSSvars" class="layer">
    noise + {{Yaxis}}
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
      }
    }
  },
}
</script>

<style scoped>
.layer {
  background-image: url(src/assets/noise-layer.webp);
  margin: auto;
  position: absolute;
  top: 0; left: 0; bottom: 0; right: 0;
  transform: translateY(var(--Yaxis));
  width: 40vw;
  aspect-ratio: 9/16;
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
