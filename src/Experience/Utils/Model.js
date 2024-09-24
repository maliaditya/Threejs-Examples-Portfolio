import * as THREE from 'three'
import Experience from '../../Experience'


export default class Model
{
    constructor(model) {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time  = this.experience.time

        // Setups 
        this.resource = this.resources.items.buddy
        this.setModel()
    }

    setModel() {
        this.model = this.resource.scene
        
        this.scene.add(this.model)
        
    }

    update() 
    {

    }

    destroy()
    {
        
    }

}