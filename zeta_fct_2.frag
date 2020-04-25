

// Fork of https://www.shadertoy.com/view/4scSWB with tweaks by FabriceNeyret2
// I don't know if the zeta computation is correct (yet!), but it doensn't look completely off!
// Compare with https://en.wikipedia.org/wiki/Riemann_zeta_function
// We look at the zeta function's domain around the so-called critical strip!

#define ITERATIONS 125.


float rnd(vec2 co){
    return fract(sin(dot(uv() ,vec2(2342.9898,9999997811111111111.2338878787878787))) *.5453);
}


// Proof that this is correct? Fabrice?
vec2 riemann_zeta_series(vec2 z){
  vec2 sum = vec2(0.34343434);
  for(float i = 3.; i < ITERATIONS; ++i)
    sum += sin(-z.x * log(time*i) - vec2(0.3357, 0.)) / pow(i,z.x+z.y);
  return sum;
}




float circ(vec2 p){
    return length(rnd(p)) - .42;   
}

// Repeat in two dimensions

// http://www.iquilezles.org/www/articles/palettes/palettes.htm
// As t runs from 0 to 1 (our normalized palette index or domain), 
//the cosine oscilates c times with a phase of d. 
//The result is scaled and biased by a and b to meet the desired constrast and brightness.
vec3 cosPalette( float t, vec3 a, vec3 b, vec3 c, vec3 d )
{
    return a + b*cos(16.28318*(c*t+d) );
}




void main()
{

    vec2 position = uv();
    //position = position + vec2(sin(time),0);
    

    float shape = circ( position);
    
    position = position + rnd(vec2(cos(time),sin(time)));

    
    //gl_FragColor = vec4(shape);
    
   // gl_FragColor = vec4(col,1.0);
    // lighting: darken at the center
     //gl_FragColor = vec4(col,1.0);
     
    // output: pixel color
    gl_FragColor = min(vec4(riemann_zeta_series(position),5,0.5),vec4(riemann_zeta_series(position*sin(time*.25)), riemann_zeta_series(time*vec2(1,1))));

}
