AFRAME.registerComponent('closes-photo', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      $("#take-photo").remove();
      $("#save-photo").remove();
      window.activeSpeech && window.activeSpeech.stop(); 
    });
  }
});
