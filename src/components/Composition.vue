<script>
import { debugStyles, cardStyles } from './shared/styles'

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
    debug: {
      type: Boolean,
      required: !true,
      default: true,
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
        ${debugStyles}
        left: -40%;
      `

      const tag = 'section'
      const styles = (INDEX, extra = '') => ({
        style: `
          ${staticStyles}
          background-position: ${bgPositions[INDEX]};
          background-size: ${bgSizes[INDEX]};
          background-image: ${buffers[INDEX]};
          ${extra};
          `,
      })

      return [
        h(tag, styles(0, 'top: 0'), 'buffer0'),
        h(tag, styles(1, 'top: 20%'), 'buffer1'),
        h(tag, styles(2, 'top: 40%'), 'buffer2'),
        h(tag, styles(3, 'top: 60%'), 'buffer3'),
      ]
    }

    const createOverlayBuffers = () => {
      const staticStylesCovers = `
        ${debugStyles}
        right: -40%;
      `
      const tag = 'section'
      return [
        h('portal-target', { props: { name: 'destination' } }, [
          h(tag, { style: `${staticStylesCovers} top: 0;` }, 'buffer20'),
          h(tag, { style: `${staticStylesCovers} top: 20%;` }, 'buffer21'),
          h(tag, { style: `${staticStylesCovers} top: 40%;` }, 'buffer22'),
          h(tag, { style: `${staticStylesCovers} top: 60%;` }, 'buffer23'),
        ]),
      ]
    }

    // console.log(buffers)
    const rmLastComma = (x) => x.substring(0, x.lastIndexOf(','))
    blendModes = rmLastComma(blendModes)
    const props = context.props
    const isLastLayer = slots?.last
    // we used children but i prefer to have the
    // children component <Overlay> as a sibling
    const childrenOverlay = isLastLayer ? [slots?.last] : []

    // console.log({props, ...{ buffers, bgSizes, blendModes, bgPositions }})
    const compositionHTML = h(
      'div',
      {
        class: 'composition',
        style: cardStyles(props, { buffers, bgSizes, blendModes, bgPositions }),
      },
      [h('portal-target', { props: { name: 'overlay' } }, [])]

      // children
    )

    const debugHTML = [compositionHTML, ...attachMainBuffers(), ...createOverlayBuffers()]

    if (props.debug) {
      return debugHTML
    }

    return compositionHTML
  },
  data() {
    return {}
  },
  methods: {},
  computed: {},
}
</script>
