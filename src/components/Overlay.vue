<script>
import { debugStyles, cardStyles } from './shared/styles'
import { Portal, PortalTarget } from 'portal-vue'
import { Fragment } from 'vue-frag'

export default {
    components: {
        Portal,
        PortalTarget,
        Fragment,
    },
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
        const slots = context ? context.slots() : this.$slots
        const props = context ? context.props : this.$props
        let blendModes = ''
        let buffers = []
        let bgSizes = []
        let bgPositions = []

        if (slots?.default) {
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
                    buffers.push(bg ? bg : 'none')
                    bgSizes.push(zoom ? zoom : 'auto auto')
                    bgPositions.push(pos ? pos : '0% 0%')
                }
            )
        }

        // console.log(lastLayer?.map(v => console.log(v.render())))
        const attatchOverlayBuffers = () => {
            const staticStyles = `
                ${debugStyles}
                right: -40%;
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
                h('portal', { props: { to: 'destination' } }, [
                    h(tag, styles(0, 'top: 0'), 'buffer20'),
                    h(tag, styles(1, 'top: 20%'), 'buffer21'),
                    h(tag, styles(2, 'top: 40%'), 'buffer22'),
                    h(tag, styles(3, 'top: 60%'), 'buffer23'),
                ]),
            ]
        }

        // console.log(buffers)
        const rmLastComma = (x) => x.substring(0, x.lastIndexOf(','))
        // buffers = rmLastComma(buffers)
        blendModes = rmLastComma(blendModes)
        // bgSizes = rmLastComma(bgSizes)
        // bgPositions = rmLastComma(bgPositions)
        // console.log(slots)
        const overlayHTML = h('div', {
            style: cardStyles(props, { buffers, bgSizes, blendModes, bgPositions }),
            slots,
        })

        const portalNode = h('portal', { props: { to: 'overlay' } }, [overlayHTML])
        const htmlNodes = h('fragment', [portalNode, ...attatchOverlayBuffers()])
        return htmlNodes
    },
    data() {
        return {}
    },
    methods: {},
    computed: {},
}
</script>
