AFRAME.registerComponent('hover-reaction', {
  init: function () {
    const originalPosition = this.el.getAttribute('position');
    const originalScale = this.el.getAttribute('scale');
    const originalColor = this.el.getAttribute('color');
    const outlineSrc = `
      <a-plane
        scale="${originalScale.x+0.1} ${originalScale.y+0.1} ${originalScale.z+0.1}"
        position="${originalPosition.x}, ${originalPosition.y}, ${originalPosition.z+0.002}"
        color="#43a7fb"
      >
      </a-plane>
    `;
    let outlineElement;
    this.el.addEventListener('mouseenter', ()=>{
      outlineElement = $(outlineSrc).insertBefore(this.el);
      //this.el.setAttribute('color', "#56f");
      this.el.setAttribute('position', {
        x: originalPosition.x,
        y: originalPosition.y,
        z: originalPosition.z + 0.005
      });
    });
    this.el.addEventListener('mouseleave', ()=>{
      outlineElement.remove();
      //this.el.setAttribute('color', originalColor);
      this.el.setAttribute('position', {
        x: originalPosition.x,
        y: originalPosition.y,
        z: originalPosition.z
      });
    });
  }
});
