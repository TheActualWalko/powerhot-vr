AFRAME.registerComponent('plays', {
  schema: {
    type: 'string'
  },
  init: function () {
    this.el.addEventListener('click', (evt) => {
      const video = document.querySelector(this.data);
      if (video.paused) {
        video.play();
      } else {
        video.currentTime = 0;
        video.pause();
      }
    });
  }
});
