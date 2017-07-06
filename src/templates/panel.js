templates.panel = (position, scale, components, clickable, inverted)=>{
  let bg;
  if (!inverted){
    bg = values.panelBackground;
  } else if (inverted === true) {
    bg = values.panelForeground;
  } else {
    bg = inverted;
  }
  return `
    <a-box
      color="${bg}"
      ${clickable ? 'class="clickable"' : ''}
      position="${position[0]} ${position[1]} ${position[2] - 0.1}"
      scale="${scale[0]} ${scale[1]} ${0.2}"
      ${components.join(' ')}>
    </a-box>
  `;
}
