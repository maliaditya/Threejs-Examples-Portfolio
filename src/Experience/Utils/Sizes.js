import EventEmitter from "./EventEmitter"

export default class Sizes extends EventEmitter
{

    constructor () {
        
        super()
        
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.pixelRatio = Math.min(devicePixelRatio,2)
        
        addEventListener('resize',()=>{
            this.width = window.innerWidth
            this.height = window.innerHeight
            this.pixelRatio = Math.min(devicePixelRatio,2)
            this.trigger('resize')
        })
    }
}