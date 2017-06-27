AFRAME.registerComponent('camera-click', {
  init: function () {
    const speech = new Speech();
    speech.init((result) => {
      console.log('DONE', result);
    });

    this.el.addEventListener('click', (evt) => {
      speech.listen();
      console.log('dima goes here');
    });
  }
});
