AFRAME.registerComponent('wiggles', {
  schema: {
    rate: {
      type: 'number',
      default: 10
    },
    scale: {
      type: 'number',
      default: 0.1
    },
    offset: {
      type: 'number',
      default: 0
    }
  },
  init: function () {
    this.index = 0;
    this.originalPosition = this.el.getAttribute('position');
  },
  tick: function() {
    this.index ++;
    this.el.setAttribute('position', 'y', this.originalPosition.y + (this.data.scale * Math.sin((this.index + this.data.offset)/this.data.rate)));
  }
});
