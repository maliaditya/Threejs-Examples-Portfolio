import Particle from '../Objects/Particle'
import Experience from '../../Experience'
import PlayAudio from '../../Utils/PlayAudio'
export default class GalaxyScene
{
    constructor () {
        
        // all objects in scene
        this.experience =  new Experience()
        this.camera = this.experience.camera
        this.resources = this.experience.resources
        
        this.audioStatus = true
        this.audio = this.resources.items['nirvanaShatakam']
        this.playAudio = new PlayAudio(this.audio)
        
        this.particle = new Particle()
        this.particle.time.reset()
        
        //this.playAudio.audio.play()
        this.setCamera()
        this.update()
        
    }

    setCamera()
    {
        this.camera.perspectiveCamera.position.set(0,5,9)
        this.camera.update()
    }

    destroy () {
        //this.playAudio.audio.stop()
    }

    update() 
    {   
        this.particle.update()
    }

}