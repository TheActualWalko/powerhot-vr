templates.panel = (position, scale, components, clickable, inverted)=>{
  return `
    <a-plane
      color="${inverted ? values.panelForeground : values.panelBackground}"
      ${clickable ? 'class="clickable"' : ''}
      position="${position.join(' ')}"
      scale="${scale.join(' ')}"
      ${components.join(' ')}>
    </a-plane>
  `;
}
