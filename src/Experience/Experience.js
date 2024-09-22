import * as THREE from 'three'

// Setup
import Renderer from './Setup/Renderer'
import Camera from './Setup/Camera'
import Sizes from './Utils/Sizes'
import Debug from './Utils/Debug'
import SceneManager from './World_3D/SceneManager'
import Time from './Utils/Time'
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
		this.sceneManager = new SceneManager()
	
		this.sceneManager.on('TestCubeScene',()=>{
             
        })


		this.sizes.on('resize', ()=>{
			this.resize();
		})
		
		this.time.on('tick', () =>
        {
            this.update()
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
		this.sceneManager.update();
	}


}

