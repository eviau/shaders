// some code from http://charstiles.com/livecode/
// the zeta function from : my math classes and https://www.shadertoy.com/view/Ms2fWR

#define ITERATIONS 256.

vec2 riemann_zeta_series(vec2 z){
  vec2 sum = vec2(0.25);
  for(float i = 1.; i < ITERATIONS; ++i)
    sum += sin(-z.y * log(i) - vec2(time*0.57, 0.)) / pow(i, z.x);
  return sum;
}


float circ(vec2 p){
    return length(riemann_zeta_series(p)) - .50;   
}

vec3 cosPalette( float t, vec3 a, vec3 b, vec3 c, vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}


void main()
{

    vec2 position = uv();
    position = position + vec2(sin(time),0);
    
    float shape = circ( position * vec2(3.0));
    
    position = position + vec2(cos(time),0);

    vec3 col = cosPalette(0.5,vec3(0.1),vec3(time*0.3),vec3(1),vec3(time*0.01,time*0.1,time*.2));
   
    col = vec3(shape) * col;

    gl_FragColor = min(vec4( col, 1.0 ), vec4(0.8));

}
