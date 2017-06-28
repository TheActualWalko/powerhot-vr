AFRAME.registerComponent('saves-photo', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      $("#take-photo").remove();
      $("#save-photo").remove();
      saveJpegBlob();
    });
  }
});
