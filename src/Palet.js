import * as THREE from 'three';

class Palet extends THREE.Object3D {
    constructor(width, height, depth, topTexturePath, sideTexturePath) {
        super();  // Chama o construtor da classe base THREE.Object3D
        this.addTexturedBox(width, height, depth, topTexturePath, sideTexturePath);
    }

    addTexturedBox(width, height, depth, topTexturePath, sideTexturePath) {
        const textureLoader = new THREE.TextureLoader();
        const topTexture = textureLoader.load(topTexturePath);
        const sideTexture = textureLoader.load(sideTexturePath);

        const materials = [
            new THREE.MeshBasicMaterial({ map: sideTexture ,transparent: false, depthTest: true}), // Direita
            new THREE.MeshBasicMaterial({ map: sideTexture ,transparent: false, depthTest: true}), // Esquerda
            new THREE.MeshBasicMaterial({ map: topTexture ,transparent: false, depthTest: true}),  // Topo
            new THREE.MeshBasicMaterial({ map: sideTexture,transparent: false, depthTest: true }), // Base
            new THREE.MeshBasicMaterial({ map: sideTexture,transparent: false, depthTest: true }), // Frente
            new THREE.MeshBasicMaterial({ map: sideTexture,transparent: false, depthTest: true })  // Traseira
        ];

        const geometry = new THREE.BoxGeometry(width, height, depth);
        this.box = new THREE.Mesh(geometry, materials);
        this.box.translateY(height/2 + 50)
        this.box.rotateY(0.5678)
        this.add(this.box); // Adiciona o mesh criado ao objeto
    }

    setPositionX(x) {
      this.box.position.x = x;
    }

    setPositionY(y) {
      this.box.position.y = y;
    }

    setPositionZ(z) {
      this.box.position.z = z;
    }
    
}

export default Palet;