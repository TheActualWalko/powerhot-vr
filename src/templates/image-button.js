let lastImageComponentIndex = 0;
templates.imageButton = (position, scale, image, onClick, inverted)=>{
  let components;
  let clickable = true;
  if (onClick === null) {
    components = ['hover-reaction'];
    clickable = false;
  } else if (typeof onClick === 'string') {
    components = [onClick, `hover-reaction`];
  } else {
    const componentName = `image-button-${lastImageComponentIndex ++}-${image.toLowerCase()}`;
    components = [componentName, `hover-reaction`];
    AFRAME.registerComponent(
      componentName, 
      {
        init: function(){
          this.el.addEventListener('click', (evt) => {
            onClick(evt);
          });
        }
      }
    );
  } 
  return `
    ${templates.panel(position, scale, components, clickable, inverted)}
    <a-image
      position="${position[0]} ${position[1]} ${position[2]+0.01}"
      scale="0.3 0.29 0.3"
      src="${image}">
    </a-image>
  `;
};
