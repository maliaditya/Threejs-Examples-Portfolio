import * as THREE from 'three'
import Experience from '../../Experience.js'

export default class Water
{
    /**
     *  Blue Quad
     *  1. Geometry
     *  2. Material
     *  3. Mesh
     *  4. Scene
     */ 

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        
        this.setGeometry();
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
        this.material = new THREE.MeshBasicMaterial({color:0xff00ff, side: THREE.DoubleSide})
    }

    setMesh()
    {
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.rotation.x = -Math.PI * 0.5
        this.scene.background = new THREE.Color(0x000000);
        this.scene.add(this.mesh)
    }
            
    update()
    {

    }


}