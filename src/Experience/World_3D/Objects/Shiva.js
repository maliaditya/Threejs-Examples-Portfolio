import Experience from '../../Experience'

export default class Shiva
{
    constructor() {
        this.experience = new Experience()
        this.resources = this.experience.resources

        this.resource = this.resources.items.shiva
        this.setModel()
    }

    setModel()
        {
            console.log(this.resource)
        }

    update()
    {

    }

    destroy()
    {
        
    }
}