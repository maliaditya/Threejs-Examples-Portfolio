import Experience from "../../Experience"
import * as THREE from 'three'
import galaxyVertexShader from '../Shaders/Galaxy/vertex.glsl'
import galaxyFragmentShader from '../Shaders/Galaxy/fragment.glsl'

export default class Particle
{
    constructor () {

    this.experience = new Experience()
    this.scene =  this.experience.scene
    this.time =  this.experience.time
    this.renderer = this.experience.renderer


    this.parameters = {}
    this.parameters.count = 500000
    this.parameters.size = 0.005
    this.parameters.radius = 30
    this.parameters.branches = 3
    this.parameters.spin = 1
    this.parameters.randomness = 0.5
    this.parameters.randomnessPower = 3
    this.parameters.insideColor = '#ff6030'
    this.parameters.outsideColor = '#1b3984'

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.update()
    
    }

    setGeometry()
    {
        // Create
        this.geometry = new THREE.BufferGeometry()
        
        this.positions =  new Float32Array(this.parameters.count * 3) // 1 vertice = 3 = xyz
        this.colors = new Float32Array(this.parameters.count * 3) // rgb
        this.scales = new Float32Array(this.parameters.count * 1)
        this.randomness = new Float32Array(this.parameters.count*3 )

        const insideColor = new THREE.Color(this.parameters.insideColor)
        const outsideColor = new THREE.Color(this.parameters.outsideColor)


        for(let i = 0; i < this.parameters.count; i++)
        {
            const i3 = i * 3
            const radius = Math.random() * this.parameters.radius
            const branchesAngle = (i % this.parameters.branches) / this.parameters.branches * Math.PI *2
            
            this.positions[i3 ] = Math.cos(branchesAngle) * radius 
            this.positions[i3 + 1] = 0 
            this.positions[i3 + 2] = Math.sin(branchesAngle) * radius 
            
            const randomX = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            const randomY = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            const randomZ = Math.pow(Math.random(), this.parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : - 1) * this.parameters.randomness * radius
            
            
            this.randomness[i3 ] = randomX
            this.randomness[i3 +1] = randomY
            this.randomness[i3 +2] = randomZ
            
            // colors
            const mixedColor = insideColor.clone()
            mixedColor.lerp(outsideColor,radius/this.parameters.radius) 

            this.colors[i3] =mixedColor.r
            this.colors[i3+1] =mixedColor.g
            this.colors[i3+2] =mixedColor.b
            
            // scales
            this.scales[i]= Math.random()
        }




        // set attribute
        this.geometry.setAttribute('position', new THREE.BufferAttribute(this.positions,3))
        this.geometry.setAttribute('color', new THREE.BufferAttribute(this.colors,3))
        this.geometry.setAttribute('aRandomness', new THREE.BufferAttribute(this.randomness,3))
        this.geometry.setAttribute('aScale', new THREE.BufferAttribute(this.scales,1))
    
    }

    setMaterial()
    {
       this.material = new THREE.ShaderMaterial({
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        vertexShader:galaxyVertexShader,
        fragmentShader: galaxyFragmentShader,
        uniforms:{
            uSize:new THREE.Uniform(40 * this.renderer.instance.getPixelRatio()),
            uTime: new THREE.Uniform(0.2)
        }

        })
    }


    setMesh()
    {
        this.points =  new THREE.Points(this.geometry, this.material)
        this.scene.add(this.points)
        this.scene.background = new THREE.Color(0x000000);
    }

    update()
    {   
        this.material.uniforms.uTime.value = this.time.elapsed

    }   


}