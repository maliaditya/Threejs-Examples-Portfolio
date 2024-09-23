import * as THREE from 'three'
import Experience from '../../Experience'
import waterVertexShader from '../Shaders/Water/vertex.glsl'
import waterFragmentShader from '../Shaders/Water/fragment.glsl'

export default class Water
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.time = this.experience.time
        
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.update()
    }


    setGeometry()
    {
        this.geometry = new THREE.PlaneGeometry(1,1,300,300)
    }

    setMaterial()
    {
        this.material = new THREE.ShaderMaterial(
            {
                vertexShader:waterVertexShader,
                fragmentShader:waterFragmentShader,
                uniforms:{
                    
                    uTime:{value:0},

                    uBigWavesElevation:{value:0.11},
                    uBigWavesFrequency:{value:new THREE.Vector2(1.568,4.197)},
                    uBigWavesSpeed:{value:0.75},
                    
                    uDepthColor:{value:new THREE.Color(0x186691)},
                    uSurfaceColor:{value:new THREE.Color(0x9bd8ff)},
                    uColorOffset:{value:0.149},
                    uColorMultiplier:{value:3.346},

                    uSmallWavesElevation: { value: 0.072 },
                    uSmallWavesFrequency: { value: 4.935 },
                    uSmallWavesSpeed: { value: 0.936 },
                    uSmallIterations: { value: 3 },
                }
            }
        )
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5
        this.mesh.rotation.z = 59
        this.scene.background = new THREE.Color(0x000000);
        this.scene.add(this.mesh)
        
    }
   

    update()
    {
        this.material.uniforms.uTime.value = this.time.elapsedTime
        console.log("this.elapsedTime ",this.time.elapsedTime)

    }

}