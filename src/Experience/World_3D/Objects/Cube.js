import * as THREE from 'three'
import Experience from '../../Experience.js'


export default class Cube 
{
    constructor() {

        this.experience = new Experience()
        this.texture = this.experience.fbo.texture
        this.renderer = this.experience.renderer.instance
        this.scene = this.experience.scene
        this.time = this.experience.time

        // Setup
        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.update()
        
    }

    setGeometry()
    {
        this.geometry = new THREE.BoxGeometry(1,1,1,1)

        // Create a Clipping Plane
        // Enable clipping globally
    }

    setMaterial()
    {
        this.material = new THREE.MeshBasicMaterial({ color:"#00ff00"})
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.scene.add(this.mesh)
        
    }

    update()
    {   
         this.mesh.rotation.x =this.time.elapsed * 0.001
         this.mesh.rotation.y =this.time.elapsed * 0.001
         this.mesh.rotation.z =this.time.elapsed * 0.001
    }

    destroy()
    {

    }

}