import * as THREE from 'three';

class AreaLogistica extends THREE.Object3D {

    constructor() {
        super();
        // Criação de um plano
        this.plane = AreaLogistica.createMesh(new THREE.PlaneGeometry(5630, 5380));
        this.add(this.plane);
    }

    static createMesh(geom) {
        // Carregar textura
        const texture = new THREE.TextureLoader().load('src/mapa.png');

        // Criar materiais
        const meshMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide
        });
        const wireFrameMat = new THREE.MeshBasicMaterial({
            map: texture,
            wireframe: false
        });

        // Criar mesh com múltiplos materiais
        const mesh = new THREE.Mesh(geom, [meshMaterial, wireFrameMat]);
        return mesh;
    }
}

export default AreaLogistica;
