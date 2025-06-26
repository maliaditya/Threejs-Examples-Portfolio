#include ../includes/simplexNoise4d.glsl

uniform float uTime;
uniform float uDeltaTime;
uniform sampler2D uBaseTexture;

void main()
{

    float time = uTime * 0.2;

    vec2 uv = gl_FragCoord.xy / resolution.xy;
    vec4 particle = texture(uParticles, uv);
    vec4 base = texture(uBaseTexture,uv);
    
    if(particle.a>=1.0)
    {
        particle.a = fract(particle.a);
        particle.xyz = base.xyz;
    }
    else
    {

        // Strength
        float strength = simplexNoise4d(vec4(base.xyz * 0.2, time + 1.0));
        
        strength = smoothstep(0.0, 1.0, strength);
        
        // Flow field
        vec3 flowField = vec3(
            simplexNoise4d(vec4(particle.xyz + 0.0, time)),
            simplexNoise4d(vec4(particle.xyz + 1.0, time)),
            simplexNoise4d(vec4(particle.xyz + 1.0, time))
        );

        flowField = normalize(flowField);
        particle.xyz += flowField * uDeltaTime * strength * 2.9;

        // Decay
        particle.a +=uDeltaTime * 0.7;
        

    }
    gl_FragColor = particle;

}

