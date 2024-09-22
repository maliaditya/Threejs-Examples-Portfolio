import Particle from '../Objects/Particle'
export default class GalaxyScene
{
    constructor () {
        // all objects in scene
        this.particle = new Particle()
        this.update()
    }

    update() 
    {
        this.particle.update()
    }

}