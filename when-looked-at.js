/* global AFRAME, THREE */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

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
    this.el.setAttribute(
      'animation__when-looked-at',
      `
        startEvents: __look-changed;
        property: ${this.data.property}; 
        dur: ${this.data.dur}; 
        to: 0;
      `
    );
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
    const isInView = this.frustum.containsPoint(new THREE.Vector3(
      pos.x,
      pos.y,
      pos.z
    ));

    if (isInView && this.wasInView !== true) {
      if (this.data.usesDomNode) {
        document.querySelectorAll('#all-html>*').forEach( node => node.classList.add('hidden') );
        document.querySelector(this.data.usesDomNode).classList.remove('hidden');
      }
      this.el.setAttribute('animation__when-looked-at', 'to', this.data.in);
      this.el.emit('__look-changed');
      this.wasInView = true;
    } else if (!isInView && this.wasInView !== false){
      if (this.data.usesDomNode) {
        document.querySelectorAll('#all-html>*').forEach( node => node.classList.add('hidden') );
      }
      this.el.setAttribute('animation__when-looked-at', 'to', this.data.out);
      this.el.emit('__look-changed');
      this.wasInView = false;
    }
  },
});
