import EventEmitter from "../Utils/EventEmitter";
import Experience from "../Experience";
import * as THREE from 'three'

// scenes
import TestCubeScene from "./Scenes/TestCubeScene";
import GalaxyScene from "./Scenes/GalaxyScene";

export default class SceneManager extends EventEmitter
{
    // Code
    constructor () {

        super();

        this.experience = new Experience();
        this.sceneManager = this.experience.sceneManager
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.currentScene = null

        // sceneManager will store objects 
        this.sceneManager = {}
        
        this.setScenes('testCubeScene',TestCubeScene);    
        this.setScenes('galaxyScene',GalaxyScene);

        this.setTriggerSceneInstance()
        this.trigger('galaxyScene')
    }

    setScenes(sceneName,SceneClass)
    {
         this.sceneManager[sceneName] = {
            obj: null
        };

        // Set up an event listener for the scene
        this.on(sceneName, () => {
            if (!this.sceneManager[sceneName].obj) {
                this.destroy(); // Assuming this destroys the current scene
                this.sceneManager[sceneName].obj = new SceneClass();
                 this.currentScene = sceneName
            }
        });
        console.log("setScenes this.currentScene",this.currentScene)

    }


    setTriggerSceneInstance() {
        // Create an empty object to store the callback references for the GUI
        this.obj = {};
        if (this.debug.active) {
            // Loop through each category in the base callbacks
            for (let category in this.callbacks.base) {
                if (this.callbacks.base.hasOwnProperty(category)) {
                    
                    this.obj[category] = () => {
                        window.location.hash = `#${category}`;
                        this.trigger(category)
                    };
                     this.debug.ui.add(this.obj, category).name(`Trigger ${category}`);
                    
                    if(this.active = window.location.hash === `#${category}`)
                    {
                         this.trigger(category)
                    }

                }
            }
        } else {
            console.warn("Debug is not active. Skipping adding callbacks to the UI.");
            
        }
    }

    update()
    {
       

        for(let scene in this.sceneManager)
            {   
            if(this.sceneManager[scene].obj )
            {
               this.sceneManager[scene].obj.update()
            }
        }
       
            
    }

   destroy() {   
    console.log("Destroying current scene...");

    // Remove references to the current scene from the scene manager
    if (this.currentScene) {
        this.sceneManager[this.currentScene].obj = null;
        this.currentScene = null;
    }

    // Create an array to hold objects to be removed
    const objectsToRemove = [];

    // Traverse through all objects in the scene
    this.scene.traverse((child) => {
        // Check for common object types like Mesh, Points, Line, etc.
        if (child instanceof THREE.Mesh || child instanceof THREE.Points || child instanceof THREE.Line) {
            // Dispose of geometry if present
            if (child.geometry) {
                child.geometry.dispose();
            }

            // Dispose of material if present and ensure proper disposal of textures
            if (child.material) {
                if (Array.isArray(child.material)) {
                    // If material is an array, dispose of each material
                    child.material.forEach((material) => {
                        this.disposeMaterial(material);
                    });
                } else {
                    // Dispose of a single material
                    this.disposeMaterial(child.material);
                }
            }

            // Add child to the list of objects to remove
            objectsToRemove.push(child);
        }
    });

    // Remove the collected objects from the scene
    objectsToRemove.forEach((object) => {
        this.scene.remove(object);
    });

    console.log("Objects removed from scene:", objectsToRemove);
}

disposeMaterial(material) {
    // Check if the material has any texture maps and dispose them
    for (const key in material) {
        const value = material[key];
        if (value && typeof value.dispose === 'function') {
            value.dispose();
        }
    }

    // Dispose of the material itself
    material.dispose();
}

}