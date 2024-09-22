import * as THREE from 'three'
import Experience from "../Experience";

export default class Renderer
{
    constructor () {
        this.experience = new Experience();
        this.canvas = this.experience.canvas;
        this.renderer = this.experience.renderer
        this.scene = this.experience.scene
        this.camera  = this.experience.camera
        this.sizes = this.experience.sizes
        
        this.setInstance()
    }

    setInstance() {

        // Code
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas
        })
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio,2))
    }

    resize() {
        // Code
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(Math.min(window.devicePixelRatio,2))
    }

    update()
    {
        this.instance.render( this.scene, this.camera.perspectiveCamera)
    }

}
