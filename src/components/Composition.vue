<template>
  <section>
   <slot>composition</slot>
  </section>
</template>

<script>
export default {
  props: {
    ninjas: {
      type: Array,
      required: !true,
    },
  },
  beforeMount() {
    // console.log(this.$slots.default[0])
    this.$slots.default.forEach(item => {
     console.log(item.componentOptions.propsData)
    })
  },
  data() {
    return {}
  },
  methods: {

  },
  computed: {

  },
}
</script>

<style scoped>
section {
    height: 100vh; 
    /* mix-blend-mode: color-dodge; */
    filter: brightness(calc((0.0*0.3) + 0.5)) contrast(2) saturate(1.5)
}
</style>
