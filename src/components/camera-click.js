AFRAME.registerComponent('camera-click', {
  init: function () {
    let takePhotoUI;
    let savePhotoUI;
    window.activeSpeech = new Speech();
    window.activeSpeech.init((result) => {
      console.log('DONE', result);
      if (result === 'cancel') {
        $(takePhotoUI).remove();
      } else if (result === 'snap') {
        $(takePhotoUI).remove();
        $("#cursor")[0].setAttribute('opacity', 0);
        getJpegAndRender()
          .then(()=>{
            savePhotoUI = $(templates.savePhoto([0, 1.6, -3])).insertAfter($("#social-panel"));
            document.getElementById('photo-preview').setAttribute('src', '#photo');
          });
      }
    });

    this.el.addEventListener('click', (evt) => {
      takePhotoUI = $(templates.takePhoto([0, 1.6, -3])).insertAfter($("#social-panel"));
      window.activeSpeech.listen();
    });
  }
});
