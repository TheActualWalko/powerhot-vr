templates.modal = (position, scale, {promptText, promptImage, confirmText, cancelText}, {onConfirm, onCancel}, inverted)=>{
  const [x, y, z] = position;
  const [dx, dy, dz] = scale;
  const spacing = dy / 8
  const [dxb, dyb, dzb] = [dx/2 - spacing/2, dy/2, dz];
  const yb = y - dy/2 - 0.5/2 - spacing/2;
  const buttonOffset = - dxb / 2 +(x / 4 + dxb) + spacing/2;
  const xb1 = x - buttonOffset;
  const xb2 = x + buttonOffset;
  return `
    ${templates.panel(position, scale, [], false, inverted)}
    ${promptImage 
      ? `<a-image
          scale="${scale.join(' ')}"
          position="${position[0]} ${position[1]} ${position[2]+0.01}"
          src="${promptImage}">
        </a-image>`
      : `<a-text
        position="${position[0]} ${position[1]} ${position[2]+0.01}"
        value="${promptText}"
        font="${values.font}"
        font-weight="600"
        align="center"
        color="${inverted ? values.panelBackground : values.panelForeground}"
        font-size="8"
        wrap-pixels="1100">
      </a-text>`}
    ${templates.textButton(
      [xb1, yb, z],
      [dxb , 0.5, 1],
      confirmText,
      onConfirm,
      true)}
    ${templates.textButton(
      [xb2, yb, z],
      [dxb , 0.5, 1],
      cancelText,
      onCancel,
      false)}
  `;
}
