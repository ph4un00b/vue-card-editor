<template>
    <section>
        <slot>template</slot>
    </section>
</template>

<script>
export default {
    render(createElement) {
      console.log('rendering', this)
    //       this.$slots.default?.forEach(item => {
    //   /**
    //    * {
    //    *   "Yaxis": "-20%",
    //    *   "bg": "repeating-linear-gradient(...)",
    //    *   "blend": "hard-light",
    //    *   "zoom": "200%"
    //    * }
    //    */
    //    console.log(item.componentOptions.propsData)
    //   })
      return createElement(
        'h1', 
        'jamon'
      )
    },
  props: {
    ninjas: {
      type: Array,
      required: !true,
    },
  },
  beforeMount() {
    // // console.log(this.$slots.default[0])
    // this.$slots.default?.forEach(item => {
    // /**
    //  * {
    //  *   "Yaxis": "-20%",
    //  *   "bg": "repeating-linear-gradient(...)",
    //  *   "blend": "hard-light",
    //  *   "zoom": "200%"
    //  * }
    //  */
    //  console.log(item.componentOptions.propsData)
    // })
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
