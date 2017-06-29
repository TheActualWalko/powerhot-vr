templates.artist = (position)=>`
  <a-entity
    position="${position.join(' ')}"
    wiggles="rate: 30; scale: 0.03"
    look-at="#camera"
    group-opacity="0"
    when-looked-at="
      focusX: 0.3; 
      focusY: 0.8; 
      usesDomNode: #artist;
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
  </a-entity>
`;
