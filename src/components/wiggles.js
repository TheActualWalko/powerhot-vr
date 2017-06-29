AFRAME.registerComponent('wiggles', {
  init: function () {
    this.index = 0;
    this.originalPosition = this.el.getAttribute('position');
  },
  tick: function() {
    this.index ++;
    this.el.setAttribute('position', 'y', this.originalPosition.y + (0.1 * Math.sin(this.index/10)));
  }
});
