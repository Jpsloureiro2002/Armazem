import { GUI }    from 'three/addons/libs/lil-gui.module.min.js';

export class GuI{
    constructor(WebGl, obj) {
        var scene = WebGl.scene;
        this.controlOptions = {
            'freeMovement': false
        };
        this.controlCam = {
            'cameraType' : 'Perspective'
        }
        this.controloBox = {
            'x' : 0,
            'y' : 0,
            'z' : 0,
        }

        // call the render function
        this.step = 0;

        this.controls = new function() {
            this.freeMovement = false; // Controle inicial de movimento livre.
        };

        

        // Adicionar a interface GUI
        this.gui = new GUI();

        this.gui.add({ 'Limpar ecrã': function(){
            const objectsToRemove = [...WebGl.scene.children];

            obj.openBox.removeFromScene(WebGl.scene);

            for (const object of objectsToRemove) {
                if (!object.isLight && !object.isCamera) {
                    WebGl.scene.remove(object);
                }
                
                WebGl.renderer.render(WebGl.scene, WebGl.camera);
            } 
        }
        }, 'Limpar ecrã');

        this.cameraControl = this.gui.addFolder('Camera');

        this.gui.add(this.controloBox, "x", -50000,50000).name("X").onChange(function(value){
            obj.box1.setPositionX(value);
        });
        this.gui.add(this.controloBox, "y", -50000,50000).name("Y").onChange(function(value){
            obj.box1.setPositionY(value);
        });
        this.gui.add(this.controloBox, "z", -50000,50000).name("Z").onChange(function(value){
            obj.box1.setPositionZ(value);
        });


        //Camera Control
        this.GUIcameraControlVar = this.cameraControl.add(this.controlCam, 'cameraType', ['Perspective', 'Orthographic','Track Robot']).name('Camera View').onChange(function(value) {
            if (value === 'Orthographic') {
                WebGl.camera = WebGl.cameraOrtho;
                WebGl.controlsPointerLock.setCamera(WebGl.cameraOrtho);
            } else if (value === 'Track Robot'){
                WebGl.camera = WebGl.cameraTrack;
            }else {
                WebGl.camera = WebGl.cameraPerspective;
                WebGl.controlsPointerLock.setCamera(WebGl.cameraPerspective);
            }
            updateCamera();
        });
        
        this.controlFreeMovement = this.cameraControl.add(this.controls, 'freeMovement').name('Free Movement').onChange(function(value) {
            if (value) {
                WebGl.controlsPointerLock.lock();
            } else {
                WebGl.controlsPointerLock.unlock();
            }
        });

        this.cameraControl.open();

        function updateCamera() {
            WebGl.camera.updateProjectionMatrix();
            WebGl.renderer.render(WebGl.scene, WebGl.camera);
        }
        
        
    }

    
}

export default GuI;