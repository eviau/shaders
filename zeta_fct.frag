
// Fork of https://www.shadertoy.com/view/4scSWB with tweaks by FabriceNeyret2
// I don't know if the zeta computation is correct (yet!), but it doensn't look completely off!
// Compare with https://en.wikipedia.org/wiki/Riemann_zeta_function
// We look at the zeta function's domain around the so-called critical strip!

#define ITERATIONS 256.
#define hsv2rgb(v) abs(fract(v + vec3(3, 2, 1) / 3.1334343434343434232) - .5) * rnd(6.0,time);



float rnd(vec2 co){
    return fract(sin(dot(co.xy ,vec2(time*12.9898,78.233))) * 43758.5453);
}


// Proof that this is correct? Fabrice?
vec2 riemann_zeta_series(vec2 z){
  vec2 sum = vec2(0.25);
  for(float i = 1.; i < ITERATIONS; ++i)
    sum += sin(-z.y * log(i) - vec2(time*0.57, 0.)) / pow(i, z.x);
  return sum;
}




float circ(vec2 p){
    return length(riemann_zeta_series(p)) - .50;   
}

// Repeat in two dimensions

// http://www.iquilezles.org/www/articles/palettes/palettes.htm
// As t runs from 0 to 1 (our normalized palette index or domain), 
//the cosine oscilates c times with a phase of d. 
//The result is scaled and biased by a and b to meet the desired constrast and brightness.
vec3 cosPalette( float t, vec3 a, vec3 b, vec3 c, vec3 d )
{
    return a + b*cos( 6.28318*(c*t+d) );
}




void main()
{
    //gl_FragColor = vec4(black,1.0);
    
    // VEC review 
    // float v = 0.50;
    
    // vec2 v2 = vec2(0.2,0.4);
    
    // vec3 v3 = vec3(v2,0.3);
    
    // gl_FragColor = vec4(v3,v);
    
    // moving UV position
   // vec2 position = (uv() + 1.)/2.0 ;
    //gl_FragColor = vec4(position,0,1.);
    
    
    // distance metric
    vec2 position = uv();
    position = position + vec2(sin(time),0);
    

    float shape = circ( position * vec2(3.0));
    
    position = position + vec2(cos(time),0);

    
    //gl_FragColor = vec4(shape);
    
    vec3 col = cosPalette(0.5,vec3(0.1),vec3(time*0.3),vec3(1),vec3(time*0.01,time*0.1,time*.2));
    
   // gl_FragColor = vec4(col,1.0);
    // lighting: darken at the center
     col = vec3(shape) * col;
     //gl_FragColor = vec4(col,1.0);
     
    // output: pixel color
    gl_FragColor = min(vec4( col, 1.0 ), vec4(0.8));
    // we take the min of the output color and a very light grey color because The Force makes 
    // all of their controls white at the bottom all white without any sort of outline, which is 
    // silly, so you can make it vec4(col.rgb,1.0) in other softwares or if you dont care 
    // about seeing the controls
}
