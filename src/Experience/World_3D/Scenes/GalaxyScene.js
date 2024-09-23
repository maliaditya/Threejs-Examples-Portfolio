import Particle from '../Objects/Particle'
export default class GalaxyScene
{
    constructor () {
        // all objects in scene
        this.particle = new Particle()
        this.update()
        this.particle.time.reset()
    }

    update() 
    {   
        this.particle.update()
    }

}