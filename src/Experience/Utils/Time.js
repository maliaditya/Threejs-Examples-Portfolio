import * as THREE from 'three';
import EventEmitter from './EventEmitter';

export default class Time extends EventEmitter
{
    constructor()
    {
        super()

        this.start = Date.now() 
        this.current = this.start
        this.delta =  16
        this.elapsed = 0
        this.clock = new THREE.Clock()
        this.elapsedTime = 0
        this.previousTime = 0
        this.deltaTime = 16

        requestAnimationFrame(()=>{
            this.tick()
        })
    }

    tick()
    {
        const currentTime =  Date.now()
        this.delta = currentTime - this.current
        this.current = currentTime
        this.elapsed = this.current - this.start
        this.elapsedTime = this.clock.getElapsedTime()
        this.deltaTime = this.elapsedTime - this.previousTime
        this.previousTime = this.elapsedTime
        
        this.trigger('tick')
        window.requestAnimationFrame(()=>{this.tick()})
    }

    reset()
    {
        this.start = Date.now();
        this.current = this.start;
        this.delta = 16;
        this.elapsed = 0;
        this.elapsedTime = this.clock.getElapsedTime()
         this.deltaTime = this.elapsedTime - this.previousTime
        this.previousTime = this.elapsedTime
    }

}