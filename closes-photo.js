AFRAME.registerComponent('closes-photo', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      document.getElementById('take-photo').setAttribute('group-opacity', 0);
      document.getElementById('photo-preview').setAttribute('opacity', 0);
      window.activeSpeech && window.activeSpeech.stop(); 
    });
  }
});
