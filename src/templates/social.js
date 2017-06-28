templates.social = ()=>`
  <a-entity
    position="4.5 2.9 -4"
    rotation="0 -30 0"
    group-opacity="0"
    when-looked-at="
      property: group-opacity;
      in: 1;
      out: 0;
      focusX: 0.3; 
      focusY: 0.8; 
      usesDomNode: #social;
    ">
    <a-plane 
      class="uses-html"
      position="0 0.5 0"
      scale="3 4.5 1.5"
      position="0 0 0"
      material="
        shader: html; 
        target: #all-html; 
        width: 400;
        height: 600;
      ">
    </a-plane>
    ${templates.textButton(
      [0, -2.2, 0], 
      [3, 0.65, 1],
      '#camera-image', 
      'camera-click')}
  </a-entity>
`;
