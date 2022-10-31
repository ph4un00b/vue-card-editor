<template>
<!-- component template para debug! -->
  <div :style="defineCSSvars" class="layer">
    <!-- <div style="position: absolute; color: white; top: 0;">
      + {{blend}} + {{Yaxis}}
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    Yaxis: {
      type: String,
      required: !true,
      default: '0%',
    },
    bg: {
      type: String,
      required: !true,
      default: '',
    },
    blend: {
      type: String,
      required: !true,
      default: 'none',
    },
    zoom: {
      type: String,
      required: !true,
      default: 'auto auto',
    },
    pos: {
      type: String,
      required: !true,
      default: '0% 0%',
    },
    filter: {
      type: String,
      required: !true,
      default: '',
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
      console.log(this.pos)
      return {
        '--Yaxis': this.Yaxis,
        '--bg': this.bg,
        '--blend': this.blend,
        '--size': this.zoom,
        '--pos': this.pos,
        // '--posX': this.posX,
        // '--posY': this.posY,
        '--filter': this.filter,
      }
    },
  },
}
</script>

<style scoped>
.layer {
  background-image: var(--bg);
  background-size: var(--size);
  background-position: var(--pos);
  /* background-position-x: var(--posX); */
  /* background-position-y: var(--posY); */
  mix-blend-mode: var(--blend);
  /* mix-blend-mode: color-dodge; */
  /* background-image: ; */
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  transform: translateY(var(--Yaxis));
  width: 60vw;
  max-width: 300px;
  aspect-ratio: 5/6;
  /* border: 0.1rem solid; */
  /* border-color: red; */
  filter: var(--filter);
}
</style>