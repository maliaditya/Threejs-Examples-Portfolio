import Experience from '../../Experience.js';
import Water from '../Objects/Water.js'
export default class WaterScene
{
    constructor()
    {
        this.experience =  new Experience()
        this.water = new Water()

        this.camera = this.experience.camera
        this.update();
        this.destroy();
        this.setCamera();       
    }

    setCamera()
    {
        this.camera.perspectiveCamera.position.set(0,1,3)
        this.camera.update()

    }

    update()
    {

    }
    destroy()
    {

    }

}