import Shiva from '../Objects/Shiva'

export default class CosmicShiva
{
    constructor() 
    {
        this.shiva = new Shiva()
        this.update()
    }

    update(){
        this.shiva.update()
    }

     destroy()
    {

    }
}