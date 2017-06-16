/* global AFRAME, THREE */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

AFRAME.registerComponent('when-looked-at', {
  schema: {
    focus: { 
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
    const f = this.data.focus;

    const smallerProjectionMatrix = new THREE.Matrix4().multiplyMatrices(
      cameraThreeJS.projectionMatrix,
      new THREE.Matrix4().set(
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, f, 0,
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
      this.el.setAttribute('animation__when-looked-at', 'to', this.data.in);
      this.el.emit('__look-changed');
      this.wasInView = true;
    } else if (!isInView && this.wasInView !== false){
      this.el.setAttribute('animation__when-looked-at', 'to', this.data.out);
      this.el.emit('__look-changed');
      this.wasInView = false;
    }
  },
});
