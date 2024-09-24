import Particle from '../Objects/Particle'
import Experience from '../../Experience'
import PlayAudio from '../../Utils/PlayAudio'
export default class GalaxyScene
{
    constructor () {
        // all objects in scene
        this.audioStatus = true
        this.experience =  new Experience()
        this.resources = this.experience.resources
        this.audio = this.resources.items['nirvanaShatakam']
        this.playAudio = new PlayAudio(this.audio)
        this.particle = new Particle()
        this.particle.time.reset()
        //this.playAudio.audio.play()
        this.update()

        
    }

    destroy () {
        //this.playAudio.audio.stop()
    }

    update() 
    {   
        this.particle.update()
    }

}