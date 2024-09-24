import Water from '../Objects/Water'
import Experience from '../../Experience';
export default class RagingSea
{
    constructor()
    {
        this.experience = new Experience()
        this.camera =  this.experience.camera
        this.water = new Water()

        this.update()
        this.setCamera()
    }

    setCamera()
    {
         this.camera.perspectiveCamera.position.set(0,1,1)
         this.camera.update()
    }

    destroy()
    {
        
    }

    update()
    {
        this.water.update()
    }
}
