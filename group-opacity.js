AFRAME.registerComponent('group-opacity', {
  schema: {
    type: 'number',
    default: 1.0
  },
  update: function () {
    var opacity = this.data;
    var children = [].slice.call(this.el.children);
    children
      .forEach(function (child) {
        child.setAttribute('opacity', opacity);
      });
  }
});
