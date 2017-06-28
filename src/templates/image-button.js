let lastImageComponentIndex = 0;
templates.imageButton = (position, scale, image, onClick)=>{
  let componentName;
  if (typeof onClick === 'string') {
    componentName = onClick;
  } else {
    componentName = `text-button-${lastImageComponentIndex ++}-${image}`;
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
    ${templates.panel(position, scale, [componentName], true)}
    <a-image
      position="${position[0]} ${position[1]} ${position[2]+0.01}"
      scale="0.3 0.29 0.3"
      src="${image}">
    </a-image>
  `;
};
