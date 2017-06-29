let lastTextComponentIndex = 0;
templates.textButton = (position, scale, text, onClick, inverted)=>{
  let components;
  let clickable = true;
  if (onClick === null) {
    components = ['hover-reaction'];
    clickable = false;
  } else if (typeof onClick === 'string') {
    components = [onClick, 'hover-reaction'];
  } else {
    const componentName = `text-button-${lastTextComponentIndex ++}-${text.toLowerCase()}`;
    components = [componentName, 'hover-reaction'];
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
    <a-text
      position="${position[0]} ${position[1]} ${position[2]+0.01}"
      value="${text}"
      font="${values.font}"
      font-weight="600"
      align="center"
      color="${inverted ? values.panelBackground : values.panelForeground}"
      font-size="8"
      wrap-pixels="1100">
    </a-text>
  `;
}
