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
    <a-text
      position="0 2 0"
      rotation="15 0 0"
      value="Say 'SAVE' to save this or 'CANCEL' to stop."
      color="#fff"
      align="center"
      scale="0.5 0.5 0.5"
      font-size="24"
      >
    </a-text>

    ${templates.textButton(
      [-0.8, -0.9, 0], 
      [1.5, 0.5, 0],
      'SAVE',
      'saves-photo',
      true
    )}

    ${templates.textButton(
      [0.8, -0.9, 0], 
      [1.5, 0.5, 0],
      'CANCEL',
      'closes-photo',
      true
    )}
  </a-entity>
`;
