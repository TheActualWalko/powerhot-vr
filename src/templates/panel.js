templates.panel = (position, scale, components, clickable, inverted)=>{
  return `
    <a-plane
      ${components.join(' ')}
      ${clickable ? 'class="clickable"' : ''}
      position="${position.join(' ')}"
      scale="${scale.join(' ')}"
      material="color: ${inverted ? values.panelForeground : values.panelBackground};">
    </a-plane>
  `;
}
