import Buddy from '../Objects/Buddy'
import Experience from '../../Experience';
export default class HolographicCanineScene
{
    constructor() {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.buddy = new Buddy()

        this.update()
        this.setCamera()
    }

    setCamera() {
        this.camera.perspectiveCamera.position.set(0,0,2)
        this.camera.update()
    }


    update()
    {
        this.buddy.update()
    }

    destroy()
    {

    }

}