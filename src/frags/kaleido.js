const frag = /*glsl*/`
// Author: phau
// Title: refactors
// lesson: if-else -> mix!

#ifdef GL_ES
precision mediump float;
#endif

uniform vec3 u_camera;
uniform vec3 u_light;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec4 v_position;
varying vec3 v_normal;

#if defined(MODEL_VERTEX_TEXCOORD)
varying vec2 v_texcoord; 
#endif

/* Color palette */
#define BLACK vec3(0.,0.,0.)
#define WHITE vec3(1.,1.,1.)
#define RED vec3(1.,0.,0.)
#define GREEN vec3(0.,1.,0.)
#define BLUE vec3(0.,0.,1.)
#define YELLOW vec3(1.,1.,0.)
#define CYAN vec3(0.,1.,1.)
#define MAGENTA vec3(1.,0.,1.)
#define ORANGE vec3(1.,.5,0.)
#define PURPLE vec3(1.,0.,.5)
#define LIME vec3(.5,1.,0.)
#define ACQUA vec3(0.,1.,.5)
#define VIOLET vec3(.5,0.,1.)
#define AZUR vec3(0.,.5,1.)

vec2 xy(in float x,in float y)
{
    return vec2(x,y);
}

mat2 rotate2d(float _angle){
    return mat2(cos(_angle),-sin(_angle),
    sin(_angle),cos(_angle));
}

float box(in vec2 _st,in vec2 _size){
    _size=vec2(.5)-_size*.5;
    vec2 uv=smoothstep(_size,
        _size+vec2(.001),
    _st);
    uv*=smoothstep(_size,
        _size+vec2(.001),
        vec2(1.)-_st);
        return uv.x*uv.y;
    }
    
    float cross(in vec2 _st,float _size){
        // _st = rotate2d(0.012) * _st;
        _st-=vec2(.5);
        // rotate the space
        // _st = rotate2d( sin(u_time)*PI ) * _st;
        _st=rotate2d(.748)*_st;
        // move it back to the original place
        _st+=vec2(.5);
        
        return box(_st,vec2(_size,_size/4.))+
        box(_st,vec2(_size/4.,_size));
    }
    
    float circle(in vec2 _st,in float _radius){
        vec2 l=_st-vec2(.5);
        return 1.-smoothstep(_radius-(_radius*.01),
        _radius+(_radius*.01),
        dot(l,l)*4.);
    }
    
    vec4 when_eq(vec4 x, vec4 y) {
        return 1.0 - abs(sign(x - y));
    }

    vec4 when_neq(vec4 x, vec4 y) {
      return abs(sign(x - y));
    }

float S = abs(sin(u_time));
float S0 = (sin(u_time));
// ceil to start from 1
float N = fract(mod(u_time, 10.));
float N1 = ceil(mod(u_time, 10.));
float N10 = 10.  + ceil(mod(u_time, 20.));
float K = 43758.5453123;
vec2 VRAN = vec2(12.9898,78.233);

vec2 remap(vec2 st, float N, vec2 center) {
    st =  N * st;
    st = st - (N / 2.0);
    return vec2(st.x + center.x, st.y + center.y);
}

float circleA(vec2 st, float delta) {
    return length(st) + delta;
}

#define TWO_PI 6.28318530718
#define PI 6.28318530718*0.5
#define HPI PI*0.5

vec4 when_gt(vec4 x, vec4 y) {
  return max(sign(x - y), 0.0);
}

vec4 when_lt(vec4 x, vec4 y) {
  return max(sign(y - x), 0.0);
}

vec4 when_ge(vec4 x, vec4 y) {
  return 1.0 - when_lt(x, y);
}

vec4 when_le(vec4 x, vec4 y) {
  return 1.0 - when_gt(x, y);
}


vec4 or(vec4 a, vec4 b) {
  return min(a + b, 1.0);
}

uniform sampler2D u_tex0;
uniform vec2 u_center;
uniform float u_velocity;

void main(void){
    vec4 color=vec4(0.,0.,0.,1.);
    // vec2 pixel=1./u_resolution;
    // vec2 st=gl_FragCoord.xy*pixel;
    vec2 st = gl_FragCoord.xy/u_resolution;
  
    // remap
    float times = 3.032;
    st =  remap(st, times, u_center);
    
    // float radius = length(st) + -0.472;
    float radius = circleA(st, 0.000);
    // otro effcto con floor
    float angle = (atan(st.y, st.x));
    
    float segmentos = 17.;
    
    angle /= PI * 2.; // normalizing by removing PI * 2 
    angle *= segmentos;
    
    // colission for kaleido effect
    float test = mod(angle, 2.0);
    float isOdd = when_gt(vec4(test), vec4(1.0)).x;
    float isEven = when_lt(vec4(test), vec4(1.0)).x;
    
    // incorrect but yields other effects
    // angle = (fract(angle)) * isOdd;
    // angle =  (1. -fract(angle)) * isEven;
    
    float forward = fract(angle);
    float backward = 1. - fract(angle);
    
    // 1.a not bad
	// angle = (forward * isOdd) + (backward * isEven);
    
    // 1.b if/else mode
    if (test <= 1.0) {
        angle = forward;
    } else {
        angle = backward;
    }
    
    // 1.c mix modee
    // angle = mix(forward, backward, isEven);
    
    angle += u_time * u_velocity; // rotate
    
    // reajuste
    angle /= segmentos;
    angle *= PI * 2.;
        
    // recombine
    vec2 p = vec2(
        radius * cos(angle),
        radius * sin(angle)
    );
    
    vec2 ip = ceil(p);
    vec2 fp = fract(p);
    p = fract(fp);
     // color.rgb = PURPLE + AZUR;

    // color.r = abs(sin(cos(u_time + 3. * st.y) * 3. * st.x));
    // color.g = abs(cos(sin(u_time + 3. * st.x) * 3. * st.y));
    // color.b = fract(u_time);
  color += texture2D(u_tex0, p);

  gl_FragColor = color;
}
`

export default frag;