
import * as THREE from 'three'
import Experience from '../../Experience.js'
import vertexShader from '../Shaders/ParticleFF/vertex.glsl'
import fragmentShader from '../Shaders/ParticleFF/fragment.glsl'
import { GPUComputationRenderer } from 'three/addons/misc/GPUComputationRenderer.js'
import particleShader from '../Shaders/GPGPU/particles.glsl'


class GPGPUCompute{

    constructor()
    {
        
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.renderer = this.experience.renderer.instance;
        this.resources =  this.experience.resources.items
        this.time =  this.experience.time

        this.boat = this.resources['boat']
        this.baseGeometry = {}
        this.gpgpu = {}


        this.setBaseGeometry()
        this.createGPGPU()
        this.generateTextureUV()

    }

    setBaseGeometry()
    {
         this.baseGeometry.instance = this.boat.scene.children[0].geometry
         this.baseGeometry.count = this.baseGeometry.instance.attributes.position.count
    }

    createGPGPU()
    {

        this.gpgpu.size = Math.ceil(Math.sqrt(this.baseGeometry.count))
        this.gpgpu.computation = new GPUComputationRenderer(    this.gpgpu.size,  
                                                                this.gpgpu.size, 
                                                                this.renderer )
        this.createTexture()
        
        this.sendTextureToShader()

        // step 5: init
        this.gpgpu.computation.init()
    
        // step 6: using that texture on a plane to debug
        //this.debug()
    
    }

    createTexture()
    {
        // create a texture 
        this.baseTexture = this.gpgpu.computation.createTexture()
        
        // Copy geometry position [x,y,z] to texture [r,g,b,a]
        for(let i=0;i<this.baseGeometry.count;i++)
        {
            let i3 = i * 3
            let i4 = i * 4
            this.baseTexture.image.data[i4+0] = this.baseGeometry.instance.attributes.position.array[i3+0]
            this.baseTexture.image.data[i4+1] = this.baseGeometry.instance.attributes.position.array[i3+1]
            this.baseTexture.image.data[i4+2] = this.baseGeometry.instance.attributes.position.array[i3+2]
            this.baseTexture.image.data[i4+3] = Math.random()
        }
        
    }
    
    sendTextureToShader()
    {
        // lets send this baseParticlesTexture to shader particleShader this is uniform and will be accessible to shader automatically.
        this.gpgpu.particlesVariable = this.gpgpu.computation.addVariable(  'uParticles', 
                                                                            particleShader, 
                                                                            this.baseTexture )
            
        this.gpgpu.computation.setVariableDependencies( this.gpgpu.particlesVariable, 
                                                        [ this.gpgpu.particlesVariable ])
        this.gpgpu.particlesVariable.material.uniforms.uTime = new THREE.Uniform(0)
        this.gpgpu.particlesVariable.material.uniforms.uDeltaTime = new THREE.Uniform(0)
        this.gpgpu.particlesVariable.material.uniforms.uBaseTexture = new THREE.Uniform(this.baseTexture)
    }
            
    debug()
    {
        this.gpgpu.debug = new THREE.Mesh(  new THREE.PlaneGeometry(3,3),
                                            new THREE.MeshBasicMaterial({
                                                map:this.gpgpu.computation
                                                        .getCurrentRenderTarget(this.gpgpu.particlesVariable)
                                                        .texture
                                            })
                                        )
        this.gpgpu.debug.position.x = 3
        this.scene.add(this.gpgpu.debug)
    }

    generateTextureUV()
    {
        this.textureUVArray = new Float32Array(this.baseGeometry.count * 2)
        this.sizeArray = new Float32Array(this.baseGeometry.count)
        for(let y = 0 ; y < this.gpgpu.size ;  y++)
        {
            for ( let x = 0 ; x < this.gpgpu.size; x++)
            {
                let i = y * this.gpgpu.size + x
                let i2 = i * 2

                const uvX = (x + 0.5) / this.gpgpu.size
                const uvY = (y + 0.5) / this.gpgpu.size

                this.textureUVArray[i2+0] = uvX
                this.textureUVArray[i2+1] = uvY

                this.sizeArray[i] = Math.random()
            }
        }
    }

    update()
    {
        this.gpgpu.particlesVariable.material.uniforms.uTime.value = this.time.elapsedTime 
        this.gpgpu.particlesVariable.material.uniforms.uDeltaTime.value = this.time.deltaTime 
        this.gpgpu.computation.compute();
    }
}


export default class FlowField
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes

        this.particles = {}
        this.gpgpu = new GPGPUCompute()
        this.textureUVArray = this.gpgpu.textureUVArray
        this.sizeArray = this.gpgpu.sizeArray

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.update()
    }

    setGeometry()
    {
        this.particles.geometry = new THREE.BufferGeometry()
        this.particles.geometry.setDrawRange(0,this.gpgpu.baseGeometry.count)
        this.particles.geometry.setAttribute('aTextureUvArray', new THREE.BufferAttribute(this.textureUVArray,2))
        this.particles.geometry.setAttribute('aColor', this.gpgpu.baseGeometry.instance.attributes.color)
        this.particles.geometry.setAttribute('aSize', new THREE.BufferAttribute(this.sizeArray,1))
    }

    setMaterial()
    {
        this.particles.material = new THREE.ShaderMaterial({
            vertexShader:vertexShader,
            fragmentShader:fragmentShader,
            uniforms:
            {
                uSize: new THREE.Uniform(0.07),
                uResolution: new THREE.Uniform(new THREE.Vector2(this.sizes.width * this.sizes.pixelRatio, this.sizes.height * this.sizes.pixelRatio)),
                uParticlesTexture: new THREE.Uniform(),
            }
        })
    }

    setMesh()
    {
        this.particles.points = new THREE.Points(this.particles.geometry, this.particles.material)
        this.scene.add(this.particles.points)
    }

    update()
    {
        this.gpgpu.update()

        this.particles.material.uniforms.uParticlesTexture.value = this.gpgpu.gpgpu.computation.getCurrentRenderTarget(this.gpgpu.gpgpu.particlesVariable).texture
        
    }

}