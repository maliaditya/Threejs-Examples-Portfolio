import * as THREE from 'three'
import Experience from '../Experience'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
export default class Camera
{
    constructor () {
        this.experience = new Experience();
        this.canvas = this.experience.canvas
        this.scene = this.experience.scene
        this.renderer =  this.experience.renderer
        this.orthoScene = this.experience.orthoScene
        this.sizes = this.experience.sizes
        this.position = new THREE.Vector3(0,0,3);


        
        this.setInstance()
        this.setControl()
    }

    setInstance() {
        this.perspectiveCamera = new THREE.PerspectiveCamera(45, this.sizes.width / this.sizes.height, 0.1, 100);
        this.perspectiveCamera.position.set(this.position.x, this.position.y, this.position.z); // Position the camera away from the origin
        this.scene.add(this.perspectiveCamera);
    
        this.orthographicCamera = new THREE.OrthographicCamera( - this.sizes.width / 2, 
                                                                this.sizes.width / 2, 
                                                                this.sizes.height / 2, 
                                                                - this.sizes.height / 2,
                                                                1,
                                                                10
                                                            )
        this.orthographicCamera.position.z = 3
        this.orthoScene.add(this.orthographicCamera)

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

        // Update orthographic camera size
         this.orthographicCamera.left = -this.sizes.width / 2;
         this.orthographicCamera.right = this.sizes.width / 2;
         this.orthographicCamera.top = this.sizes.height / 2;
         this.orthographicCamera.bottom = -this.sizes.height / 2;
         this.orthographicCamera.updateProjectionMatrix();
    }

    update()
    {
        this.controls.update()
    }

}