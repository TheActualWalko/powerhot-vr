templates.panel = (position, scale, components)=>{
  return `
    <a-plane
      ${components.join(' ')}
      class="clickable"
      position="${position.join(' ')}"
      scale="${scale.join(' ')}"
      material="color: ${values.panelBackground};">
    </a-plane>
  `;
}
