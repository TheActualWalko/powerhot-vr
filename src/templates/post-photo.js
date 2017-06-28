templates.postPhoto = ()=>`
  <a-entity
    position="0 1.6 -3"
    rotation="0 0 0"
    id="take-photo"
    group-opacity="0"
    >
    <a-image 
      id="photo-preview"
      opacity="0"
      position="0 0.5 0"
      scale="4 2 1.5">
    </a-image>
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


    <a-plane 
      position="0 -0.9 0"
      scale="1.5 0.45 1.5"
      material="color: black;"
      class="clickable"
      closes-photo>
    </a-plane>
    <a-text 
      position="0 -0.9 0.01"
      value="CANCEL"
      color="#fff"
      align="center"
      font-size="8"
      scale="0.5 0.5 0.5"
      >
    </a-text>
  </a-entity>
`;
