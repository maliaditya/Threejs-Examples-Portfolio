import Experience from "../../Experience";
import FlowField from "../Objects/FlowField";


export default class FlowFieldScene
{
    constructor()
    {
        this.experience = new Experience()
        this.flowField = new FlowField()
        
        this.experience.camera.perspectiveCamera.position.set(4.5, 4, 11)
        this.experience.camera.update()

        this.update();
    }

    update()
    {
        this.flowField.update()
    }
}


