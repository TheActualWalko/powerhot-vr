AFRAME.registerComponent('logo-animate', {
  init: function () {
    this.hasBegun = false;
    $("#video").on('play playing', ()=>{
      this.hasBegun = true;
      this.initTime = new Date().getTime();
      this.fadeInStartTime = 5000;
      this.fadeInEndTime = 7000;
      this.fadeOutTime = 10000;
      this.duration = 12000;
    });
  },
  tick: function() {
    if (!this.hasBegun) {
      return;
    }
    let now = new Date().getTime() - this.initTime;
    if (now > this.duration) {
      $(this.el).remove();
      return;
    }
    if (now < this.fadeInStartTime) {
      this.el.setAttribute('material', 'opacity', 0);
    }
    if (now > this.fadeInStartTime && now < this.fadeInEndTime) {
      this.el.setAttribute('material', 'opacity', (now - this.fadeInStartTime) / (this.fadeInEndTime - this.fadeInStartTime));
    }
    this.el.setAttribute('position', 'z', ((now/this.duration) * 2) - 4)
    if (now > this.fadeOutTime) {
      this.el.setAttribute('material', 'opacity', 1-((now-this.fadeOutTime) / (this.duration-this.fadeOutTime)));
    }
  }
});
