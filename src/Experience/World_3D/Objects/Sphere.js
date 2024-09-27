import * as THREE from "three"
import Experience from "../../Experience";
import CustomShaderMaterial from 'three-custom-shader-material/vanilla'
import wobbleSphereVertexShader from '../Shaders/WobbleSphere/vertex.glsl';
import wobbleSphereFragmentShader from '../Shaders/WobbleSphere/fragment.glsl'

export default class Sphere{

    
    constructor(){

        this.experience = new Experience();
        this.scene = this.experience.scene

        this.setGeometry()
        this.setMaterial()
        this.setMesh()
        this.update()
        this.destroy()
    }

    setGeometry() {

        this.geometry =  new THREE.IcosahedronGeometry(2.5, 50)

    }

    setMaterial() {

        this.material = new CustomShaderMaterial({
            baseMaterial: THREE.MeshPhysicalMaterial,
            vertexShader: wobbleSphereVertexShader,
            fragmentShader: wobbleSphereFragmentShader,
            metalness:0,
            roughness:0.5,
            color: '#ffffff',
            transmission: 0,
            ior: 1.5,
            thickness: 1.5,
            transparent: true,
            wireframe: false
        })

    }

    setMesh() {
        this.mesh = new THREE.Mesh(this.geometry,this.material)
        this.scene.add(this.mesh)
    }

    update() {

    }

    destroy() {

    }


}