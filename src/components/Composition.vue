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
      type: Number,
      required: true,
      default: 1,
    },
    saturate: {
      type: Number,
      required: true,
      default: 0,
    },
    contrast: {
      type: Number,
      required: true,
      default: 1,
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
    const slots = context.slots()
    let blendModes = ''
    let buffers = []
    let bgSizes = []
    let bgPositions = []

    if (slots?.default) {

      slots?.default.forEach(
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
          buffers.push(bg ? bg : 'none')
          bgSizes.push(zoom ? zoom : 'auto auto')
          bgPositions.push(pos ? pos : '0% 0%')
        }
      )

    }

    // console.log(lastLayer?.map(v => console.log(v.render())))
    const attachMainBuffers = () => {
      const staticStyles = `
        width: 20vh;
        height: 20vh;
        max-width: calc(768px / 4);
        position: absolute;
        // margin: auto;
        // border: /** debug */ 0.1rem solid;
        // border-color: /** debug */ red;
        left: 0;
        `

      const tag = 'section'
      const styles = (INDEX, extra = "") => ({
        style: `
          ${staticStyles}
          background-position: ${bgPositions[INDEX]};
          background-size: ${bgSizes[INDEX]};
          background-image: ${buffers[INDEX]};
          ${extra};
          `
      })

      return [
        h(tag, styles(0, "top: 0"), 'buffer0'),
        h(tag, styles(1, "top: 20vh"), 'buffer1'),
        h(tag, styles(2, "top: 40vh"), 'buffer2'),
        h(tag, styles(3, "top: 60vh"), 'buffer3'),
      ]

    }

    const createOverlayBuffers = () => {

      const staticStylesCovers = `
      width: 20vh;
      height: 20vh;
      max-width: calc(768px / 4);
      position: absolute;
      // margin: auto;
      // border: /** debug */ 0.1rem solid;
      // border-color: /** debug */ red;
      right: 0;
      `
      const tag = 'section'
      return [
        h('portal-target', { props: { name: 'destination' } }, [
          h(tag, { style: `${staticStylesCovers} top: 0;` }, 'buffer20'),
          h(tag, { style: `${staticStylesCovers} top: 20vh;` }, 'buffer21'),
          h(tag, { style: `${staticStylesCovers} top: 40vh;` }, 'buffer22'),
          h(tag, { style: `${staticStylesCovers} top: 60vh;` }, 'buffer23'),
        ]),
      ]
    }

    // console.log(buffers)
    const rmLastComma = (x) => x.substring(0, x.lastIndexOf(','))
    // buffers = rmLastComma(buffers)
    blendModes = rmLastComma(blendModes)
    // bgSizes = rmLastComma(bgSizes)
    // bgPositions = rmLastComma(bgPositions)
    const props = context.props
    const isLastLayer = slots?.last
    const children = isLastLayer ? [slots?.last] : []

    const html = [
      h(
        'div',
        {
          style: `
            width: 80vw;
            max-width: 768px;
            mix-blend-mode: ${props.blend};
            background-image: ${buffers.join(',')};
            background-size: ${bgSizes.join(",")};
            background-blend-mode: ${blendModes};
            background-position: ${bgPositions.join(",")};
            filter: brightness(${props.bright}) contrast(${props.contrast}) saturate(${props.saturate});
            aspect-ratio: ${props.aspect};
            margin: auto;
            position: absolute;
            top: 0; left: 0%; bottom: 0; right: 0;
      `,
        },
        [
          h('portal-target', { props: { name: 'overlay' } }, [])
        ],

        // children
      ),
      ...attachMainBuffers(),
      ...createOverlayBuffers(),
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
