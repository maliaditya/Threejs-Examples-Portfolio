import * as THREE from 'three'
import Sphere from "../Objects/Sphere"
import Experience from '../../Experience'

export default class WoblySphereScene
{
    constructor()
    {
        this.sphere = new Sphere()
        this.experience = new Experience()   
        this.scene = this.experience.scene
        this.setLights()
        this.update()
        this.destroy()


    }

    setLights()
    {
        this.directionalLight = new THREE.DirectionalLight(0xffffff, 4)
        this.scene.add(this.directionalLight)
    }

    update()
    {

    }

    destroy()
    {

    }
    
}