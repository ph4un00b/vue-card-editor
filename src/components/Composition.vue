<script>
export default {
  functional: true,
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
  render(h, context) {
    const slots = context.slots()
    let blendModes = ''
    let buffers = ''
    let bgSizes = ''
    let bgPositions = ''
    slots.default.forEach(
      ({
        componentOptions: {
          propsData: { blend, bg, pos, zoom },
        },
      }) => {
        /**
         * {
         *   "Yaxis": "-20%",
         *   "bg": "repeating-linear-gradient(...)",
         *   "pos" "..."
         *   "blend": "hard-light",
         *   "zoom": "200%"
         * }
         */
        /** XXXX: still dont know if this is the best API to fecth props data */
        blendModes += blend + ', '
        buffers += bg + ','
        bgSizes += zoom + ','
        bgPositions += pos ? pos + ',' : '0% 50%,'
      }
    )

    const rmLastComma = (x) => x.substring(0, x.lastIndexOf(','))
    buffers = rmLastComma(buffers)
    blendModes = rmLastComma(blendModes)
    bgSizes = rmLastComma(bgSizes)
    bgPositions = rmLastComma(bgPositions)
    const props = context.props
    const lastLayer = slots?.last
    const children = lastLayer ? [lastLayer] : []
    const html = h(
      'div',
      {
        style: `
      width: 80vw;
      max-width: 764px;
      mix-blend-mode: ${props.blend};
      background-image: ${buffers.trim()};
      background-size: ${bgSizes};
      background-blend-mode: ${blendModes};
      background-position: 0% 50%, 50% 50%, 50% 50%;
      background-position: ${bgPositions};
      filter: ${props.filter};
      aspect-ratio: 5/6;
      margin: auto;
      position: absolute;
      top: 0; left: 0%; bottom: 0; right: 0;
      `,
      },
      children
    )
    // border: /** debug */ 0.1rem solid;
    // border-color: /** debug */ red;
    //transform: /** debug */ translateX(${props.posX});
    return html
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>