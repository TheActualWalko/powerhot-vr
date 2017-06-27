AFRAME.registerComponent('camera-click', {
  init: function () {
    this.el.addEventListener('click', (evt) => {
      console.log('dima goes here');
    });
  }
});
