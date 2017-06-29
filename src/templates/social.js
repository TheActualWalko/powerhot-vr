templates.social = (position)=>`
  <a-entity
    id="social-panel"
    position="${position.join(' ')}"
    wiggles="rate: 30; scale: 0.03"
    look-at="#camera"
    group-opacity="0"
    when-looked-at="
      focusX: 0.3; 
      focusY: 0.8; 
      usesDomNode: #social;
    ">
    <a-plane 
      class="uses-html"
      position="0 0.5 0"
      scale="2.4 3.5 1"
      position="0 0 0"
      material="
        shader: html; 
        target: #all-html; 
        width: 480;
        height: 700;
      ">
    </a-plane>
    ${templates.imageButton(
      [0, -1.55, 0], 
      [2.4, 0.5, 1],
      '#camera-image', 
      'camera-click')}
  </a-entity>
`;
