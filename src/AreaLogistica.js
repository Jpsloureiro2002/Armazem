import * as THREE from 'three';

class AreaLogistica extends THREE.Object3D {
    constructor(width, height, texturePath) {
        super();  // Chama o construtor da classe base THREE.Object3D
        this.addTexturedPlane(width, height, texturePath);
    }

    addTexturedPlane(width, height, texturePath) {
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(texturePath, (tex) => {
            tex.needsUpdate = true; // Garante que a textura seja atualizada
            this.scale.set(1.0, tex.image.height / tex.image.width, 1.0); // Ajusta a escala do plano à razão de aspecto da textura
        });

        const geometry = new THREE.PlaneGeometry(width, height);
        const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide ,transparent: false, depthTest: true});
        const plane = new THREE.Mesh(geometry, material);
        plane.rotateX(3.14/2);
        this.add(plane); // Adiciona o mesh criado ao objeto, herdado de THREE.Object3D
    }
}

export default AreaLogistica;