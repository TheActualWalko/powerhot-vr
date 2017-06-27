AFRAME.registerComponent('camera-click', {
  init: function () {
    window.activeSpeech = new Speech();
    window.activeSpeech.init((result) => {
      console.log('DONE', result);
      if (result === 'cancel') {
        document.getElementById('take-photo').setAttribute('group-opacity', 0);
        document.getElementById('photo-preview').setAttribute('opacity', 0);
      } else if (result === 'snap') {
        document.getElementById('photo-preview').setAttribute('opacity', 1);
      }
    });

    this.el.addEventListener('click', (evt) => {
      window.activeSpeech.listen();
      document.getElementById('take-photo').setAttribute('group-opacity', 1);
      document.getElementById('photo-preview').setAttribute('opacity', 0);
    });
  }
});
