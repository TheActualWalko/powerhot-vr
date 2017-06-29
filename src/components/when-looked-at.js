/* global AFRAME, THREE */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

let lookedAtHTMLtimeout;
const transitionStepLimit = 5;

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
    dur: {
      type: 'number'
    },
    property: {
      type: 'string'
    },
    in: { 
      type: 'number' 
    },
    out: { 
      type: 'number' 
    },
    usesDomNode: {
      type: 'string'
    }
  },

  multiple: false,

  init: function() {
    const camera = document.querySelector('#camera');
    const frustum = new THREE.Frustum();
    this.el.setAttribute(this.data.property, this.data.out);
    this.initialPos = Number(this.el.getAttribute('position').z);
    this.initialScale = Number(this.el.getAttribute('scale').y);
    this.camera = camera;
    this.frustum = frustum;
    this.wasInView = null;
  },

  remove: function() {
    this.camera.removeChild(this.arrow);
  },

  tick: function() {
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
          $(this.el)
            .find('.uses-html')
            .each(function(){
              this.setAttribute('material', 'fps', 5);
            });
        }, 0);
      }
      this.el.setAttribute(this.data.property, this.data.in);
      this.el.emit('__look-changed');
      this.wasInView = true;
      this.transitionStep = 0;
    } else if (!isInView && this.wasInView !== false){
      this.transitionStep = transitionStepLimit;
      if (this.data.usesDomNode) {
        document.querySelectorAll('#all-html>*').forEach( node => node.classList.add('hidden') );
        $(this.el)
          .find('.uses-html')
          .each(function(){
            this.setAttribute('material', 'fps', 0);
          });
      }
      this.el.setAttribute(this.data.property, this.data.out);
      this.el.emit('__look-changed');
      this.wasInView = false;
    }
    if (this.transitionStep <= transitionStepLimit) {
      //this.el.setAttribute('position', 'z', this.initialPos - (0.5 * (this.transitionStep/transitionStepLimit)));
      this.el.setAttribute('scale', 'y', this.initialScale * ((5+this.transitionStep)/(5+transitionStepLimit)));
      this.transitionStep ++;
    }
  },
});
