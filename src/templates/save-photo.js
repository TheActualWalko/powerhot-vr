templates.savePhoto = (position)=>`
  <a-entity
    position="${position.join(' ')}"
    rotation="0 0 0"
    id="save-photo"
    >
    <a-image 
      id="photo-preview"
      position="0 0.5 0"
      scale="4 2 1.5">
    </a-image>
    
    ${templates.textButton(
      [-0.8, -0.9, 0], 
      [1.5, 0.5, 0],
      'SAVE',
      'saves-photo',
      false
    )}

    ${templates.textButton(
      [0.8, -0.9, 0], 
      [1.5, 0.5, 0],
      'CANCEL',
      'closes-photo',
      false
    )}
  </a-entity>
`;
