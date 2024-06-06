import * as THREE from 'three';
import AreaLogistica from './AreaLogistica.js';
import Palet from './Palet.js';



export class Obj{
    constructor(WebGl) {
        var scene = WebGl.scene;
        var move = +550
        var move2 = -4100
        const textureplane = new AreaLogistica(1126*50, 1076*50, 'texture/mapa.png');
        this.box1 = new Palet(1410, 1400, 1410, 'texture/Alternador.jpg','texture/sides.png');
        this.box2 = new Palet(1210, 1400, 1410, 'texture/Alternador.jpg','texture/sides.png');
        textureplane.renderOrder = 0; // Renderiza primeiro
        this.box1.renderOrder = 1;  // Renderiza depois
        this.box1.translateX(-6500+-3650 + move)
        this.box1.translateZ(move)

        this.box2.translateX(move2 + 1490);
        this.box2.translateZ(move2 +5);
        scene.add(textureplane);
        scene.add(this.box1);
        scene.add(this.box2);
        


    }
}

export default Obj;
