uniform float uTime;
varying vec3 vPosition;

void main() {

    float stripes = mod((vPosition.z -uTime* 0.0002)* 50.0 ,1.8);
    stripes = pow(stripes,3.0);
    //Final Color
    csm_FragColor = vec4(stripes,stripes,stripes,1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}