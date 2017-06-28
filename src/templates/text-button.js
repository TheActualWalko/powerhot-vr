let lastTextComponentIndex = 0;
templates.textButton = (position, scale, text, onClick)=>{
  let componentName;
  if (typeof onClick === 'string') {
    componentName = onClick;
  } else {
    componentName = `text-button-${lastTextComponentIndex ++}-${text.toLowerCase()}`;
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
    ${templates.panel(position, scale, [componentName])}
    <a-text
      position="${position[0]} ${position[1]} ${position[2]+0.01}"
      value="${text}"
      align="center"
      color="${values.panelForeground}"
      font-size="8"
      wrap-pixels="1100">
    </a-text>
  `;
}
