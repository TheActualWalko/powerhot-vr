templates.social = (position, scale)=>`
  <a-entity
    id="social-panel"
    position="${position.join(' ')}"
    scale="${scale.join(' ')}"
    wiggles="rate: 30; scale: 0.06"
    look-at="#focal-point"
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
    <a-plane
      color="${values.panelEchoBackground}"
      position="0 0.5 -0.1"
      scale="2.5 3.6 1.1"
      material="shader: flat">
    </a-plane>
    ${templates.imageButton(
      [0, -1.6, 0], 
      [2.4, 0.5, 1],
      '#camera-image', 
      'camera-click')}
  </a-entity>
`;
