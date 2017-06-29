AFRAME.registerComponent('closes-upsell', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      $("#upsell").remove();
    });
  }
});
