AFRAME.registerComponent('plays', {
  schema: {
    type: 'string'
  },
  init: function () {
    this.el.addEventListener('click', (evt) => {
      deactivateMoveButton();
      const video = document.querySelector("#video");
      // if (video.paused) {
        video.setAttribute('src', this.data);
        video.play();
        $('.move-option').each(function(){
          $(this).remove();
        });
        MOVE_LOCATIONS.forEach(x=>{
          if (x.src === this.data) {
            x.active = true;
          } else {
            x.active = false;
          }
        });
    });
  }
});
