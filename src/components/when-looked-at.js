/* global AFRAME, THREE */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

let lookedAtHTMLtimeout;
let whenLookedAts = 0;
const transitionStepLimit = 15;

AFRAME.registerComponent('when-looked-at', {
  schema: {
    focusY: { 
      default: 0.5, 
      type: 'number' 
    },
    focusX: { 
      default: 0.5, 
      type: 'number' 
    },
    usesDomNode: {
      type: 'string'
    }
  },

  multiple: false,

  init: function() {
    this.whenLookedAtIndex = 4 * (whenLookedAts ++);
    const camera = document.querySelector('#camera');
    const frustum = new THREE.Frustum();
    this.el.setAttribute('group-opacity', 0);
    this.initialPos = Number(this.el.getAttribute('position').z);
    this.initialScale = Number(this.el.getAttribute('scale').x);
    this.camera = camera;
    this.frustum = frustum;
    this.wasInView = null;
    this.tickIndex = 0;
  },

  remove: function() {
    this.camera.removeChild(this.arrow);
  },

  tick: function() {
    this.tickIndex ++;
    if (this.tickIndex % 15 === this.whenLookedAtIndex) {
      const cameraThreeJS = this.camera.components.camera.camera;

      // This is required by Chrome for Android in VR mode.
      cameraThreeJS.updateMatrix();
      cameraThreeJS.updateMatrixWorld();
      cameraThreeJS.matrixWorldInverse.getInverse(cameraThreeJS.matrixWorld);
      const fX = 1/this.data.focusX;
      const fY = 1/this.data.focusY;

      const smallerProjectionMatrix = new THREE.Matrix4().multiplyMatrices(
        cameraThreeJS.projectionMatrix,
        new THREE.Matrix4().set(
          fX,0, 0, 0,
          0, fY,0, 0,
          0, 0, 1, 0,
          0, 0, 0, 1,
        )
      );

      this.frustum.setFromMatrix(
        new THREE.Matrix4()
          .multiplyMatrices(
            smallerProjectionMatrix,
            cameraThreeJS.matrixWorldInverse
          )
      );

      const pos = this.el.getAttribute('position');
      let isInView = this.frustum.containsPoint(new THREE.Vector3(
        pos.x,
        pos.y,
        pos.z
      ));

      if (window.activeSpeech && window.activeSpeech.state === 'listening') {
        isInView = false;
      }

      if (isInView && this.wasInView !== true) {
        if (this.data.usesDomNode) {
          setTimeout(()=>{
            document.querySelectorAll('#all-html>*').forEach( node => node.classList.add('hidden') );
            document.querySelector(this.data.usesDomNode).classList.remove('hidden');
            if (this.hasRendered) {
              return;
            }
            this.hasRendered = true;
            $(this.el)
              .find('.uses-html')
              .each(function(){
                this.setAttribute('material', 'fps', 5);
              });
            setTimeout(()=>{
              $(this.el)
                .find('.uses-html')
                .each(function(){
                  this.setAttribute('material', 'fps', 0);
                });
            }, 1000)
          }, 0);
        }
        this.el.setAttribute('group-opacity', 1);
        this.wasInView = true;
        this.transitionInStep = 0;
        this.transitionOutStep = transitionStepLimit;
      } else if (!isInView && this.wasInView !== false){
        this.transitionInStep = 0;
        this.transitionOutStep = transitionStepLimit;
        if (this.data.usesDomNode) {
          document.querySelectorAll('#all-html>*').forEach( node => node.classList.add('hidden') );
          $(this.el)
            .find('.uses-html')
            .each(function(){
              this.setAttribute('material', 'fps', 0);
            });
        }
        this.wasInView = false;
      }
    }
    if (this.wasInView && this.transitionInStep <= transitionStepLimit) {
      this.el.setAttribute('scale', 'y', this.initialScale * Math.min((5+this.transitionInStep)/(5+(transitionStepLimit/2)), 1));
      [...this.el.children].forEach((x,i)=>{
        x.setAttribute('rotation', 'y', (1-(this.transitionInStep/transitionStepLimit)) * ((i+1) * 8));
      });
      this.transitionInStep ++;
    } else if (!this.wasInView && this.transitionOutStep > 0) {
      this.el.setAttribute('scale', 'y', this.initialScale * Math.min((this.transitionOutStep)/((transitionStepLimit/2)), 1));
      this.transitionOutStep --;
    } else if (!this.wasInView && this.transitionOutStep === 0) {
      this.el.setAttribute('group-opacity', 0);
    }
  },
});
