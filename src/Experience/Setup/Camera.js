import * as THREE from 'three'
import Experience from '../Experience'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
export default class Camera
{
    constructor () {
        this.experience = new Experience();
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene
        this.sizes = this.experience.sizes
        this.position = new THREE.Vector3(3,3,3);
        
        this.setInstance()
        this.setControl()
    }

    setInstance() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.perspectiveCamera.position.set(this.position.x, this.position.y, this.position.z); // Position the camera away from the origin
        this.scene.add(this.perspectiveCamera);
    }

    setControl () 
    {
        this.controls = new OrbitControls(this.perspectiveCamera, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.perspectiveCamera.aspect = this.sizes.width / this.sizes.height
        this.perspectiveCamera.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }

}