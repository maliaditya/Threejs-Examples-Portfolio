import * as THREE from 'three'

export default class PlayAudio
{
    constructor(audioBuffer) 
    {
        this.active = false
       
        const audioListener = new THREE.AudioListener();
        this.audio = new THREE.Audio(audioListener)
        this.audio.setBuffer(audioBuffer)
        this.audio.setLoop(true)
        this.audio.setVolume(1)
    }
}