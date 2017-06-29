AFRAME.registerComponent('plays', {
  schema: {
    type: 'string'
  },
  init: function () {
    this.el.addEventListener('click', (evt) => {
      deactivateMoveButton();
      const video = document.querySelector("#video");
      const lastSrc = video.getAttribute('src');
      let time = 0;
      video.pause();
      video.currentTime = 0;
      if (lastSrc === this.data) {
        $('.move-option').each(function(){
          $(this).remove();
        });
        setTimeout(()=>{
          scene.prepend(templates.iheartLogo([0, 1.55, -1]));
          video.setAttribute('src', this.data);
          video.play();
        }, 3000);
      } else {
        const zoomInterval = setInterval(()=>{
          time ++;
          if (time < 20) {
            $("#camera").attr('fov', Number($("#camera").attr('fov')) + 2);
          } else if (time < 30) {
            clearInterval(zoomInterval);
            video.addEventListener('playing', function(){
              $("#camera").attr('fov', 90);
            });
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
          }
        }, 16.6)
      }
    });
  }
});
