<script>
export default {
  functional: true,
  props: {
    aspect: {
      type: String,
      required: !true,
      default: '5/6',
    },
    bright: {
      type: String,
      required: true,
      default: '',
    },
    saturate: {
      type: String,
      required: true,
      default: '',
    },
    contrast: {
      type: String,
      required: true,
      default: '',
    },
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
    // filter: {
    //   type: String,
    //   required: true,
    // },
  },
  render(h, context) {
    console.log(this)
    const slots = context.slots()
    let blendModes = ''
    let buffers = []
    let bgSizes = ''
    let bgPositions = ''
    slots.default.forEach(
      ({
        componentOptions: {
          // from <Layer />
          propsData: { blend, bg, pos, zoom },
        },
      }) => {
        /** XXXX: still dont know if this is the
         * best API (componentOptions) to
         * fecth props data */
        blendModes += blend + ', '
        buffers.push(bg)
        bgSizes += zoom + ','
        bgPositions += pos ? pos + ',' : '0% 50%,'
      }
    )

    // console.log(buffers)
    const rmLastComma = (x) => x.substring(0, x.lastIndexOf(','))
    // buffers = rmLastComma(buffers)
    blendModes = rmLastComma(blendModes)
    bgSizes = rmLastComma(bgSizes)
    bgPositions = rmLastComma(bgPositions)
    const props = context.props
    const isLastLayer = slots?.last
    const children = isLastLayer ? [slots?.last] : []
    // console.log(lastLayer?.map(v => console.log(v.render())))
    const mainBuffers = () => {
      const staticStyles = `
      width: 20vh;
      height: 20vh;
      max-width: calc(768px / 4);
      // margin: auto;
      position: absolute;
      // border: /** debug */ 0.1rem solid;
      // border-color: /** debug */ red;
      left: 0;
      `
      const tag = 'section'
      return !isLastLayer
        ? []
        : [
            h(tag, { style: `${staticStyles} background-image: ${buffers[0]}; top: 0;` }, 'buffer0'),
            h(tag, { style: `${staticStyles} background-image: ${buffers[1]}; top: 20vh;` }, 'buffer1'),
            h(tag, { style: `${staticStyles} background-image: ${buffers[2]}; top: 40vh;` }, 'buffer2'),
            h(tag, { style: `${staticStyles} background-image: ${buffers[3]}; top: 60vh;` }, 'buffer3'),
          ]
    }

    const coverBuffers = () => {
      const staticStyles = `
      width: 20vh;
      height: 20vh;
      max-width: calc(768px / 4);
      // margin: auto;
      position: absolute;
      border: /** debug */ 0.1rem solid;
      border-color: /** debug */ red;
      right: 0;
      `
      const tag = 'section'
      return !isLastLayer
        ? []
        : [
            h(tag, { style: `${staticStyles} top: 0;` }, 'buffer20'),
            h(tag, { style: `${staticStyles} top: 20vh;` }, 'buffer21'),
            h(tag, { style: `${staticStyles} top: 40vh;` }, 'buffer22'),
            h(tag, { style: `${staticStyles} top: 60vh;` }, 'buffer23'),
          ]
    }

    const html = [
      h(
        'div',
        {
          style: `
      width: 80vw;
      max-width: 768px;
      mix-blend-mode: ${props.blend};
      background-image: ${buffers.join(",")};
      background-size: ${bgSizes};
      background-blend-mode: ${blendModes};
      background-position: ${bgPositions};
      filter: brightness(${props.bright}) contrast(${props.contrast}) saturate(${props.saturate});
      aspect-ratio: ${props.aspect};
      margin: auto;
      position: absolute;
      top: 0; left: 0%; bottom: 0; right: 0;
      `,
        },
        children
      ),
      ...mainBuffers(),
      ...coverBuffers(),
    ]
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