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