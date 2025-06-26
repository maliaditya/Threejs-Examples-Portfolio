uniform vec2 uResolution;
uniform sampler2D uParticlesTexture;
uniform float uSize;

attribute vec3 aColor;
attribute vec2 aTextureUvArray;
attribute float aSize;

varying vec3 vColor;

void main()
{
    vec4 particle = texture(uParticlesTexture,aTextureUvArray);

    vec4 modelPosition = modelMatrix * vec4(particle.xyz , 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition =  projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    gl_PointSize = aSize * uSize * uResolution.y;
    gl_PointSize *= (1.0/ - viewPosition.z);

    vColor = aColor;
}