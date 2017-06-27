AFRAME.registerComponent('moves-to', {
  schema: {
    type: 'string'
  },
  init: function () {
    this.el.addEventListener('click', (evt) => {
      const video = document.getElementById('video');
      video.setAttribute('src', this.data);
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
});
