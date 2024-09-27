import * as THREE from 'three'
import Experience from '../../Experience'
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import holographicVertexShader from '../Shaders/HolographicCanine/vertex.glsl'
import holographicFragmentShader from '../Shaders/HolographicCanine/fragment.glsl'

export default class Buddy
{
    constructor() 
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time  = this.experience.time

        // Setups 
        this.resource = this.resources.items.raptoid
        this.setModel()
        this.setMaterial()
        this.setAnimation()
    }

    setModel() 
    {
        this.model = this.resources.items.raptoid.scene
        this.model.position.set(0,-0.1,0)
    }

    setMaterial() 
    { 
        //   this.material = new CustomShaderMaterial({
        // baseMaterial : THREE.MeshBasicMaterial,
        // vertexShader: holographicVertexShader,
        // fragmentShader: holographicFragmentShader,
        // uniforms:{
        //     uTime: {value:0}
        // }
        // })
  
        // this.model.traverse((child)=>{
        //     this.mesh = child
        //     if(child.isMesh)
        //         child.material = this.material
        // })
    

        this.scene.add(this.model)
    }

    setAnimation()
    {   

        this.animation = {};
        this.animation.mixer = new THREE.AnimationMixer(this.model);
        this.animation.actions = {};  // Using an object to store animations by name or index

        // Loop through all available animations and create actions for each
        this.resource.animations.forEach((clip, index) => {
            const action = this.animation.mixer.clipAction(clip);
            const clipName = clip.name || `animation_${index}`;  // Use clip name if available, otherwise use index
            this.animation.actions[clipName] = action;
        });

        this.animation.actions.current = this.animation.mixer.clipAction(this.resource.animations[70])
        this.animation.actions.current.play()
    }


    update() 
    {
        this.animation.mixer.update(this.time.delta * 0.001)
        this.model.rotation.y += 0.01

        this.material.uniforms.uTime.value += this.time.elapsed
    }

    destroy()
    {
       
    }

}