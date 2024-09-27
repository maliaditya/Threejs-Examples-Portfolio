import * as THREE from 'three'

// Setup
import Renderer from './Setup/Renderer'
import Camera from './Setup/Camera'
import Sizes from './Utils/Sizes'
import Debug from './Utils/Debug'
import SceneManager from './World_3D/SceneManager'
import Resources from './World_3D/Resources/Resources'
import Time from './Utils/Time'
import sources from './World_3D/Resources/sources'
let instance = null

export default class Experience
{
	constructor (canvas)
	{
		// singelton
		if(instance)
			return instance
		
		instance = this

		this.debug = new Debug()
		this.canvas = canvas
		this.sizes =  new Sizes()
		this.time = new Time()
		this.scene  = new THREE.Scene()
		this.camera = new Camera()
		this.renderer = new Renderer()
		this.resources = new Resources(sources)
		this.sceneManager = new SceneManager()

		this.resourcesLoaded = false;

		this.sizes.on('resize', ()=>{
				this.resize();
				
			})
			
		this.time.on('tick', () =>
				{
					this.update()
				})

		this.resources.on('ready',()=>{
			this.sceneManager = new SceneManager()
			this.resourcesLoaded = true
		})
	}

	resize()
	{
	this.camera.resize();
	this.renderer.resize();		
	}

	update()
	{
		this.camera.update();
		this.renderer.update();

		// if(this.resourcesLoaded)
		// {
		// }
		this.sceneManager.update();
	}


}

