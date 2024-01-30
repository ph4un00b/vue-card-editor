import { blends } from './blends'

const mainSettings = {
  debug: true,
  animate: true,
  mainControls: true,
  textControls: true,
};

export const defaultPreset = {
    version: '20221104',
    composition: {
      // color-dodge
      blend: blends[6].value,
      bright: 0.5,
      contrast: 2.0,
      saturate: 3.5,
    },
    overlay: {
      // exclusion
      blend: blends[11].value,
      bright: 0.8,
      contrast: 1.6,
      saturate: 1.4,
    },
  
    b0: {
      zoom: 50,
      // exclusion
      blend: blends[11].value,
      posX: 50,
      posY: 50,
      angle: 0,
    },
    b1: {
      zoomW: 200,
      zoomH: 700,
      // hue
      blend: blends[12].value,
      posX: 50,
      posY: 50,
      angle: 0,
    },
    b2: {
      zoom: 300,
      // hard-light
      blend: blends[8].value,
      posX: 50,
      posY: 50,
      angle: 0,
    },
    b3: {
      zoom: 200,
      // exclusion
      blend: blends[11].value,
      posX: 50,
      posY: 50,
      angle: 0,
    },
    b20: {
      // pos="50% 50%" zoom="50%"
      zoom: 50,
      // exclusion
      blend: blends[11].value,
      posX: 50,
      posY: 50,
      angle: 0,
    },
    b21: {
      // pos="0% 50%" zoom="200% 400%"
      zoomW: 200,
      zoomH: 400,
      // hue
      blend: blends[12].value,
  
      posX: 0,
      posY: 50,
      angle: 0,
    },
    b22: {
      // pos="-50% -50%" zoom="200%"
      zoom: 200,
      // hard-light
      blend: blends[8].value,
      posX: 50,
      posY: 0,
      angle: 0,
    },
    b23: {
      // pos="50% 50%" zoom="200%"
      zoom: 200,
      // exclusion
      blend: blends[11].value,
      posX: 50,
      posY: 50,
      angle: 0,
    },
    animate: mainSettings.animate,
    animationVelocity: 0.015,
    showPhoto: true,
    photo: 'https://image.lexica.art/full_webp/40cdcbb1-4718-4201-99b8-e743dbe8d318',
    noiseLayer: '/noise.webp',
    // noiseLayer: "/tool.jpg"
    showDebug: mainSettings.debug,
    background: '#171717',
    showShadow: false,
    boxShadow: {
      offsetX: 27,
      offsetY: 27,
      blurRadius: 75,
      spreadRadius: 2,
      color: '#399e48',
    },
    // text controls
    content: {
      display: mainSettings.textControls,
      text: 'kitten!',
      left: 33,
      top: 66,
      color: '#fff',
      size: 1,
      weight: 100,
      w: 0,
      h: 0,
      extra: '',
      debug: true,
    },
    transform: !true,
    effects: false,
    showBgOpts: false,
    texture: {
      border: {
        style: 'double',
        size: 0,
        color: '#000'
      }
    },
    bg: {
      url: '',
      x: 50,
      y: 50
    },
    frag: {
      velocity: 0.25,
      textures: [
        { name: 'none', value: '' },
        { name: 'copyof', value: 'copyof.jpg' },
        { name: 'spiral', value: 'spiral.jpg' },
        { name: 'tool', value: 'tool.jpg' },
      ],
      texture: '',
      center: {
        x: 0.5,
        y: -1.0,
      },
    },
  }
  