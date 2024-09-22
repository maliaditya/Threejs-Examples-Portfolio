import GUI from 'lil-gui'

export default class Debug
{
    constructor () {
        //this.active = window.location.hash === '#debug';
        this.active = true;
        if (this.active)
        {
            this.ui = new GUI({ title: 'Threejs - Examples' })
            this.ui .domElement.classList.add('custom-gui');

        }

        this.updateGuiState()

    }

    updateGuiState ()  {
    if (window.innerWidth < 600) {
        this.ui .close(); // Collapse the GUI on small screens
    } else {
        this.ui .open(); // Expand the GUI on larger screens
    }
    };
}