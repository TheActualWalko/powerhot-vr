templates.panel = (position, scale, components, clickable, inverted)=>{
  return `
    <a-box
      color="${inverted ? values.panelForeground : values.panelBackground}"
      ${clickable ? 'class="clickable"' : ''}
      position="${position[0]} ${position[1]} ${position[2] - 0.1}"
      scale="${scale[0]} ${scale[1]} ${0.2}"
      ${components.join(' ')}>
    </a-box>
  `;
}
