import Sea from '../Objects/Sea.js'
import Experience from '../../Experience.js';
export default class RagingSea
{
    constructor()
    {
        this.experience = new Experience()
        this.Sea = new Sea()

        this.experience.camera.perspectiveCamera.position.set(0,1,1)
        this.experience.camera.update()

        this.update()
        this.setCamera()
    }

    setCamera()
    {
       
    }

    destroy()
    {
        
    }

    resize()
    {
    
    }

    update()
    {
        this.Sea.update()
    }
}
