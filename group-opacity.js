AFRAME.registerComponent('group-opacity', {
  schema: {
    type: 'number',
    default: 1.0
  },
  update: function() {
    const opacity = this.data;
    const children = [].slice.call(this.el.children);
    const baseOpacities = children.map((child, index) => {
      const value = child.getAttribute('base-opacity');
      if (value != null) {
        return Number(value);
      } else {
        return 1;
      }
    });
    children
      .forEach((child, index) => {
        child.setAttribute('opacity', opacity * baseOpacities[index]);
      });
  }
});
