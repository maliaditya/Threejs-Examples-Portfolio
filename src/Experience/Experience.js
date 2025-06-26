import * as THREE from 'three'

// Setup
import Resources from './World_3D/Resources/Resources'
import sources from './World_3D/Resources/sources'
import SceneManager from './World_3D/SceneManager'

import Renderer from './Setup/Renderer'
import Camera from './Setup/Camera'

import Debug from './Utils/Debug'
import Sizes from './Utils/Sizes'
import Time from './Utils/Time'
import FBO from './Utils/graphics/FBO'

let instance = null

export default class Experience
{
	constructor (canvas)
	{
		// singelton
		if(instance)
			return instance
																	
		instance = this

		this.canvas = canvas
		this.time = new Time()
		this.debug = new Debug()
		this.sizes =  new Sizes()
		this.scene  = new THREE.Scene()
		this.orthoScene  = new THREE.Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.fbo = new FBO()
		this.resources = new Resources(sources)
		
		if(sources.length>0)
		{

			this.resources.on('ready',()=>{
				this.sceneManager = new SceneManager()
				this.sizes.on('resize', ()=>{ this.resize() } )
				this.time.on('tick', () => { this.update() } )
			})
		}
			
	}

	resize()
	{
	this.camera.resize();
	this.renderer.resize();
	this.sceneManager.resize();	
	 this.fbo.updateSpritePosition();	
	}

	update()
	{
		this.camera.update();
		this.renderer.update();
		this.sceneManager.update();
		
		//this.renderer.instance.autoClear = false;  // Prevent automatic clearing
   		//this.fbo.renderToFBO();          // Render the FBO texture last
    	//this.renderer.instance.autoClear = true;   // Restore clearing behavior for the next frame
		
	}


}

