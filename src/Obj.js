import * as THREE from 'three';
import AreaLogistica from './AreaLogistica.js';



export class Obj{
    constructor(WebGl) {
        var scene = WebGl.scene;
        this.mapa = new AreaLogistica()
        scene.add(this.mapa);
    }
}

export default Obj;
