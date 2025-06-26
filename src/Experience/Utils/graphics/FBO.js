import * as THREE from 'three';
import Experience from '../../Experience';

export default class FBO {
    constructor() {
        this.exp = new Experience();
        this.renderer = this.exp.renderer.instance;
        this.scene = this.exp.orthoScene;
        this.camera = this.exp.camera.orthographicCamera;
        this.size = 256 * window.devicePixelRatio;

        this.texture = new THREE.FramebufferTexture(this.size, this.size);
        this.texture.encoding = THREE.SRGBEncoding;
        this.material = new THREE.SpriteMaterial({ map: this.texture ,toneMapped: false,});
        this.sprite = new THREE.Sprite(this.material);
        this.sprite.scale.set(this.size, this.size, 1);
        this.scene.add(this.sprite);
        this.updateSpritePosition();
    }

    updateSpritePosition() {
        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;
        const offset = this.size / 2;

        this.sprite.position.set(-halfWidth + offset, halfHeight - offset, 1);
    }

    renderToFBO() {
        const offsetX = (window.innerWidth * window.devicePixelRatio / 2) - (this.size / 2);
        const offsetY = (window.innerHeight * window.devicePixelRatio / 2) - (this.size / 2);
        
        this.renderer.copyFramebufferToTexture(this.texture, new THREE.Vector2(offsetX, offsetY));
        
        // Clear depth buffer and render the orthographic scene
        this.renderer.clearDepth();
        this.renderer.render(this.scene, this.camera);
    }
}
