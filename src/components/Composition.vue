
<script>
export default {
    functional: true,
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
    render(h, context) {
      const slots = context.slots()
      const lastLayer = context.slots().last[0]
    let blends = ''
    let bgImage = ''
    let zooms = ''
    let positions = ''
    // console.log(slots.last)
    console.log(slots.default)
    slots.default.forEach(item => {
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
      //  console.log(item.componentOptions.propsData)
       blends += item.componentOptions.propsData.blend + ", "
      //  console.log(item.componentOptions.propsData.bg)
       bgImage += item.componentOptions.propsData.bg + ","
       zooms += item.componentOptions.propsData.zoom + ","
       positions += item.componentOptions.propsData.pos 
        ? item.componentOptions.propsData.pos + "," 
        : '0% 50%,'
      })
  
  const removeLastComma = (x) => x.substring(0, x.lastIndexOf(","))
  bgImage = removeLastComma(bgImage)
  blends = removeLastComma(blends)
  zooms = removeLastComma(zooms)
  positions = removeLastComma(positions)
  // console.log(positions)
  // console.log(context)
  const props = context.props;
  // console.log(props)
    const html = h("div", {
      style: `
      width: 80vw;
      max-width: 764px;
      mix-blend-mode: ${props.blend};
      background-image: ${bgImage.trim()};
      background-size: ${zooms};
      background-blend-mode: ${blends};
      background-position: 0% 50%, 50% 50%, 50% 50%;
      background-position: ${positions};
      filter: ${props.filter};
      aspect-ratio: 5/6;
      margin: auto;
      position: absolute;
      top: 0; left: 0%; bottom: 0; right: 0;
      `
      }, [lastLayer])
      // border: /** debug */ 0.1rem solid;
      // border-color: /** debug */ red;
      //transform: /** debug */ translateX(${props.posX});
      // console.log(html)
      return html
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