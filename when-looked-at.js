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
    attr:  { 
      default: 'visible', 
      type: 'string' 
    },
    val:   { 
      default: 'true', 
      type: 'string' 
    }
  },

  multiple: false,

  init: function() {
    const camera = document.querySelector('#camera');
    const frustum = new THREE.Frustum();
    this.offCamVal = this.el.getAttribute(this.data.attr);
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
      this.el.setAttribute(this.data.attr, this.data.val);
      this.wasInView = true;
    } else if (!isInView && this.wasInView !== false){
      this.el.setAttribute(this.data.attr, this.offCamVal);
      this.wasInView = false;
    }
  },
});
