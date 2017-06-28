templates.takePhoto = (position)=>`
  <a-entity
    position="${position.join(' ')}"
    rotation="0 0 0"
    id="take-photo"
    >
    <a-text
      position="0 2 0"
      rotation="15 0 0"
      value="Say 'SNAP' to take a photo or 'CANCEL' to stop."
      color="#fff"
      align="center"
      scale="0.5 0.5 0.5"
      font-size="24"
      >
    </a-text>

    ${templates.textButton(
      [0, -0.9, 0], 
      [1.5, 0.5, 0],
      'CANCEL',
      'closes-photo',
      true
    )}
  </a-entity>
`;
