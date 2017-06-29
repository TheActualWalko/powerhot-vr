templates.panel = (position, scale, components, clickable, inverted)=>{
  return `
    <a-plane
      color="${inverted ? values.panelForeground : values.panelBackground}"
      ${clickable ? 'class="clickable"' : ''}
      position="${position.join(' ')}"
      scale="${scale.join(' ')}"
      material="shader: flat"
      ${components.join(' ')}>
    </a-plane>
    <a-plane
      color="${inverted ? values.panelEchoForeground : values.panelEchoBackground}"
      position="${position[0]} ${position[1]} ${position[2] - 0.1}"
      scale="${scale.map(x=>x+0.1).join(' ')}"
      material="shader: flat">
    </a-plane>
  `;
}
