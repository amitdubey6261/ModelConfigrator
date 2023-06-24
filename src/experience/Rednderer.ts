import * as THREE from 'three' ; 
import Experience from './Experience';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import { ARButton } from 'three/examples/jsm/webxr/ARButton.js' ; 

export default class Renderer{
    experience : Experience ; 
    scene : THREE.Scene ;
    sizes :  Sizes ; 
    canvas : HTMLCanvasElement ; 
    camera : Camera ; 
    renderer : THREE.WebGLRenderer ;

    constructor(){
        this.experience  = new Experience() ; 
        this.scene = this.experience.scene  ;
        this.sizes = this.experience.sizes  ;  
        this.canvas = this.experience.canvas ; 
        this.camera = this.experience.camera ; 

        this.setRenderer() ; 
        this.setArButton() ;  
    }

    setRenderer(){
        this.renderer = new THREE.WebGLRenderer({
            canvas : this.canvas ,
            antialias : true , 
            alpha : true , 
        }) ; 

        this.renderer.xr.enabled = true ; 
        this.renderer.shadowMap.enabled = true ;
        this.renderer.shadowMap.type = THREE.PCFShadowMap ;
        this.renderer.outputEncoding = THREE.sRGBEncoding ;
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping ;
        this.renderer.toneMappingExposure = 1.75 ;
        this.renderer.setSize(this.sizes.width , this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }
    
    setArButton(){
        const ArButton = ARButton.createButton(this.renderer) ; 
        document.body.appendChild(ArButton) ; 
    }

    resize(){
        this.renderer.setSize(this.sizes.width , this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    update(){
        this.renderer.render(this.scene , this.camera.perspectiveCamera);
    }
}