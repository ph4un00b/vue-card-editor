export const debugStyles = `
    width: 35%;
    height: auto;
    aspect-ratio: 1;
    position: absolute;
    // max-width: calc(768px / 4);
    // margin: auto;
    // border: /** debug */ 0.1rem solid;
    // border-color: /** debug */ red;
`

export function cardStyles(props, { buffers, bgSizes, blendModes, bgPositions }) {
  return `
    display: grid;
    grid-area: 1/1;
    width: 100%;
    height: 100%;
    mix-blend-mode: ${props.blend};
    background-image: ${buffers.join(',')};
    background-size: ${bgSizes.join(',')};
    background-blend-mode: ${blendModes};
    background-position: ${bgPositions.join(',')};
    filter: brightness(${props.bright}) contrast(${props.contrast}) saturate(${props.saturate});
    aspect-ratio: ${props.aspect};
`
}
