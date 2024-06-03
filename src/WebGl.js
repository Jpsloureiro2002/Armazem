import * as THREE from 'three';
import { PointerLockControls } from 'three/addons/controls/PointerLockControls.js';
import { OrbitControls  } from 'three/addons/controls/OrbitControls.js';

    export class WebGl{
    constructor(){
        var Scale = 150;
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        this.scene = new THREE.Scene();
        // create a camera, which defines where we're looking at.
        this.cameraPerspective = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100000);
        this.camera = this.cameraPerspective;

        // Orthographic Camera
        this.aspectRatio = window.innerWidth / window.innerHeight;
        this.frustumSize = 50;
        this.cameraOrtho = new THREE.OrthographicCamera(this.frustumSize * this.aspectRatio / -2, this.frustumSize * this.aspectRatio / 2, this.frustumSize / 2, this.frustumSize / -2, 1, 1000);
        this.cameraOrtho.position.set(0*Scale, 200, 400);
        this.cameraOrtho.lookAt(new THREE.Vector3(0,0,0));

        var scale = 9.5; // Define o quanto você quer aumentar o frustum

        // Ajusta os parâmetros da câmera ortográfica
        this.cameraOrtho.left *= scale;
        this.cameraOrtho.right *= scale;
        this.cameraOrtho.top *= scale;
        this.cameraOrtho.bottom *= scale;

        // Importante: após modificar os parâmetros, é necessário atualizar a matriz de projeção da câmera
        this.cameraOrtho.updateProjectionMatrix();

        // create a render and set the size
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.useLegacyLights = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

        // position and point the camera to the center of the scene
        this.camera.position.x = 0 * Scale;
        this.camera.position.y = 200 * Scale/10;
        this.camera.position.z = 100 * Scale;
        this.camera.lookAt(this.scene.position);
        

        //camera track controls
        this.cameraTrack = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
        this.cameraTrack.position.set(0*scale, 100, 200);  // Default position
        this.scene.add(this.cameraTrack);

        // add subtle ambient lighting
        //this.ambientLight = new THREE.AmbientLight(0x0c0c0c);
        this.ambientLight = new THREE.AmbientLight(0xffffff);
        this.scene.add(this.ambientLight);

        

        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(this.renderer.domElement);

        // PointerLockControls
        this.controlsPointerLock = new PointerLockControls(this.camera, document.body);
        this.scene.add(this.controlsPointerLock.getObject());

        // OrbitControls
        this.controlsOrbit = new OrbitControls(this.camera, this.renderer.domElement);

        // Define o controle ativo inicialmente
        this.activeControl = this.controlsPointerLock; // Você pode começar com OrbitControls também
        this.scene.add(this.controlsPointerLock.getObject());


        //
    }

    setCameraTrackLookAt(vector) {
        this.cameraTrack.lookAt(vector);
    }

    toggleControls() {
        if (this.activeControl === this.controlsPointerLock) {
            this.controlsPointerLock.unlock();  // Desativa PointerLockControls
            this.activeControl = this.controlsOrbit;
        } else {
            this.controlsOrbit.dispose();        // Desativa OrbitControls
            this.activeControl = this.controlsPointerLock;
            this.controlsPointerLock.lock();
        }
    }

    changecoords_x_Ortho(x) {
        this.cameraOrtho.position.x = x;
    }
    changecoords_y_Ortho(y) {
        this.cameraOrtho.position.y = y;
    }
    changecoords_z_Ortho(z) {
        this.cameraOrtho.position.z = z;
    }

    
}

export default WebGl;