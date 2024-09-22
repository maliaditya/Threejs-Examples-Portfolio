import Cube from '../Objects/Cube'
import Experience from '../../Experience'
export default class TestCubeScene 
{
    constructor ()
    {     
        this.time = new Experience().time
        this.cube = new Cube()
        this.update()

    }

    update()
    {
        console.log("TestCubeScene",this.time.elapsed)
        this.cube.update()
    }
}